import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { IAccount } from '../interfaces/account';
import { effect, inject } from '@angular/core';
import { registerStore } from './register.store';
import { Router } from '@angular/router';

const initialLoginValue = false;
const initialLoginCards: IAccount[] = [];

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState({
    isLogin: initialLoginValue,
    loginCards: initialLoginCards
  }),
  withMethods((state) => {
    const _registerStore = inject(registerStore);
    return {
      loginMethod: (email: string) => {
        const account = _registerStore.accountsList().find(acc => acc.email === email);
        if (!account) return;

        sessionStorage.setItem('user_id_token', 'true');
        sessionStorage.setItem('user_id', JSON.stringify(account));

        patchState(state, { isLogin: true });
      },

      logoutMethod: () => {
        sessionStorage.removeItem('user_id_token');
        sessionStorage.removeItem('user_id');
        patchState(state, { isLogin: false });
        console.log('User logged out');
      },
      addToLoginCards: (email: string, password: string): boolean => {
        const accounts = _registerStore.accountsList();
        if (!accounts.length) return false;

        const matchedAccount = accounts.find(
          acc => (acc.email === email || acc.name === email) && acc.password === password
        );

        if (!matchedAccount) return false;

        patchState(state, {
          loginCards: [...state.loginCards(), matchedAccount]
        });
        return true;
      },
      addToLoginCardsFromLocalStorage(account: IAccount) {
        patchState(state, {
          loginCards: [...state.loginCards(), account]
        });
      },
      isAccountInLoginCards(email: string): boolean {
        const inRegisters = _registerStore.accountsList().some(acc => acc.email === email);
        const inLoginCards = state.loginCards().some(acc => acc.email === email);
        return inRegisters && !inLoginCards;
      }
    };
  }),
  withHooks({
    onInit(state) {
      const tokenExist = sessionStorage.getItem("user_id_token");
      const accountExist = JSON.parse(sessionStorage.getItem("user_id") ?? "null");

      if (tokenExist && accountExist?.email) {
        state.loginMethod(accountExist.email);
      }

      const logicCardsAccounts = localStorage.getItem('loginCardsAccounts');
      if (logicCardsAccounts) {
        (JSON.parse(logicCardsAccounts) as IAccount[]).forEach((acc: IAccount) => {
          state.addToLoginCardsFromLocalStorage(acc);
        });
      }

      effect(() => {
        const cards = state.loginCards();
        localStorage.setItem('loginCardsAccounts', JSON.stringify(cards));
      });
    }
  })

);
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals'
import { IAccount } from '../interfaces/account';
import { effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

const initialProfileValue: IAccount[] = [];
const initialImgsDefault: string[] = ['/imgs/profile-img-1.jpg', '/imgs/profile-img-2.jpg', '/imgs/profile-img-3.jpg', '/imgs/profile-img-4.jpg']
export const registerStore = signalStore(
    { providedIn: 'root' },
    withState({
        accountsList: initialProfileValue,
        imgsDefault: initialImgsDefault
    }),
    withMethods((state) => {
        const _router = inject(Router);
        return ({
            addToAccountsList: (newAcc: IAccount) => {
                let finalSub = newAcc.sub;
                // From Register
                if (!finalSub) {
                    const randomPicture = state.imgsDefault()[Math.floor(Math.random() * state.imgsDefault().length)];
                    finalSub = crypto.randomUUID().replace(/-/g, '').slice(0, 21);
                    newAcc = { ...newAcc, sub: finalSub, isPassGoogle: false, picture: randomPicture };
                    patchState(state, {
                        accountsList: [...state.accountsList(), newAcc]
                    });
                }
                // From Google
                else {
                    const isIDExist = state.accountsList().some(acc => acc.sub == finalSub);
                    const isEmailExist = state.accountsList().some(acc => acc.email == newAcc.email);
                    if (!isIDExist && !isEmailExist) {
                        newAcc = { ...newAcc, isPassGoogle: true };
                        patchState(state, {
                            accountsList: [...state.accountsList(), newAcc]
                        });
                        _router.navigateByUrl('');
                    } else {
                        _router.navigateByUrl('');
                    }
                }
            },
            ifEmailExist: (email: string): boolean => {
                const accounts = signal<IAccount[]>(state.accountsList());
                return accounts().some(account => account.email === email);
            },
            setAccountPasswordForGoogle: (): string => {
                // Incase SignUp from Google:
                const length = 12;
                const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}';
                let password = '';
                const array = new Uint32Array(length);
                crypto.getRandomValues(array);
                for (let i = 0; i < length; i++) {
                    password += charset[array[i] % charset.length];
                }
                return password;
            },
            checkIfAccountExistOrNo(email: string, password: string, confPassword: string): boolean {
                if (password === confPassword) {
                    const isEmailExist = state.accountsList().some(acc => acc.email == email);
                    if (isEmailExist) {
                        patchState(state, {
                            accountsList: state.accountsList().map(acc =>
                                acc.email === email ? { ...acc, password: password, isPassGoogle: false } : acc
                            )
                        });
                        return true
                    }
                } else {
                    return false
                }
                return false
            },
            setAccountsListWhenRefresh(acc: IAccount) {
                patchState(state, {
                    accountsList: [...state.accountsList(), acc]
                });
            }
            // const pass = generateSecurePassword();
            // patchState(state, {
            //     accountsList: state.accountsList().map(acc =>
            //         acc.email === email ? { ...acc, password: pass, isPassGoogle: true } : acc
            //     )
            // });
            // }
        })
    }),
    withHooks({
        onInit(state) {
            const movieAppAccounts = localStorage.getItem('accountsListForMoviesApp');
            if (movieAppAccounts !== null || movieAppAccounts) {
                (JSON.parse(movieAppAccounts) as IAccount[]).forEach((acc: IAccount) => {
                    state.setAccountsListWhenRefresh(acc)
                });
            }

            effect(() => {
                const moviesAccList = state.accountsList();
                localStorage.setItem('accountsListForMoviesApp', JSON.stringify(moviesAccList));
            })
        }
    })
)
import { AfterViewInit, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { EasyLoginComponent } from "../../components/easy-login/easy-login.component";
import { LoginStore } from '../../store/login.store';
import { IAccount } from '../../interfaces/account';
import { Dialog } from 'primeng/dialog';
import { Message } from 'primeng/message';
import { registerStore } from '../../store/register.store';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, Toast, Message, DividerModule, InputTextModule, PasswordModule, ButtonModule, CheckboxModule, ReactiveFormsModule, FormsModule, RouterModule, EasyLoginComponent, Dialog],
  providers: [MessageService]
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn', { static: true }) private googleBtn!: ElementRef;
  @ViewChild('emailInput') private emailInput!: ElementRef;
  @ViewChild('passInput') private passInput!: ElementRef;
  private _googleAuthService = inject(GoogleAuthService);
  private _messageService = inject(MessageService);
  private _loginStore = inject(LoginStore);
  private _registerStore = inject(registerStore);
  private _router = inject(Router);
  cardsAccounts = signal<IAccount[]>([]);
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  visible: boolean = false;

  constructor() {
    effect(() => {
      if (this.cardsAccounts().length < 4)
        this.cardsAccounts.set(this._loginStore.loginCards());
    })
  }

  ngAfterViewInit(): void {
    this._googleAuthService.InitiateGoogleAccount(this.googleBtn);
  }

  accSignOut() {
    this._googleAuthService.GoogleSignOut();
  }

  addToLoginCard(val: NgForm) {
    const email = val.form.controls['email'].value;
    const pass = val.form.controls['password'].value;

    if (!email) {
      this.showNotify("Adding Account Denied", "You must write your email!");
      this.emailInput.nativeElement.focus();
      return;
    } else if (!pass) {
      this.showNotify("Adding Account Denied", "You must write your password!");
      this.passInput.nativeElement.focus();
      return;
    } else {
      const isAccountInLoginCards = this._loginStore.isAccountInLoginCards(email);
      if (isAccountInLoginCards) {
        this._loginStore.addToLoginCards(email, pass);
        val.resetForm();
      } else {
        this.showNotify("Error", "This account already exists in the cards list or not registered!")
      }
    }
  }

  showNotify(summaryPar: string, detailPar: string) {
    this._messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }

  showDialog() {
    this.visible = true;
  }

  submitPassChange(val: NgForm) {
    if (val.valid && this.passwordValue === this.confirmPasswordValue) {
      const isAccountChanged: boolean = this._registerStore.checkIfAccountExistOrNo(val.form.controls['emailOver'].value, val.form.controls['passwordOver'].value, val.form.controls['confPassOver'].value);
      if (isAccountChanged) {
        this.showNotify("Successful Changing", "Your password is changed successfully!")
        val.reset();
        this.visible = false
      } else {
        this.showNotify("Error", "Your account is not exist, register first!")
      }
    } else {
      this.showNotify("Error", "Your inputs are not correct!")
    }
  }
  // -----------------------------------------------------------
  directLoginFromCard(card: IAccount) {
    this._loginStore.loginMethod(card.email);
    this._router.navigateByUrl('');
  }
  // -----------------------------------------------------------
  submit(val: NgForm) {
    if (val.valid) {
      const email = val.controls['email'].value;
      const password = val.controls['password'].value;
      const account = this._registerStore.accountsList().find(
        acc => acc.email === email && acc.password === password
      );
      if (account) {
        this._loginStore.loginMethod(account.email);
        this._router.navigateByUrl('');
      } else {
        this.showNotify("Login Failed", "Email or password is incorrect or not registered!");
      }
    } else {
      this.showNotify("Error", "Please fill in all required fields correctly!");
    }
  }
}
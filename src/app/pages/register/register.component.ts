import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from '../../directive/password-match-directive';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { registerStore } from '../../store/register.store';
import { IAccount } from '../../interfaces/account';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DividerModule, Message, Toast, ButtonModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef;
  private _googleAuthService = inject(GoogleAuthService);
  private messageService = inject(MessageService);
  private _registerStore = inject(registerStore);
  private _router = inject(Router);
  canDeActivate = signal<boolean>(false);
  visible: boolean = false;
  registerForm!: FormGroup;

  onUserConfirmed: () => void = () => { };
  onUserCancelled: () => void = () => { };

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
      userName: new FormControl("", [Validators.required, Validators.pattern("^[A-Za-z0-9]+$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*@%$#]).{8,}")]),
      confirmPassword: new FormControl("", [Validators.required]),
      fullAddress: new FormArray([this.createFormGroup()])
    }, {
      validators: passwordMatchValidator,
    })
  }

  ngDoCheck() {
    if (this.registerForm.touched && !this.registerForm.valid) {
      this.canDeActivate.set(true)
    }
  }

  addAddress() {
    const control = <FormArray>this.registerForm.controls['fullAddress'];
    control.push(this.createFormGroup());
  };

  get addresses() {
    return this.registerForm.get('fullAddress') as FormArray;
  }

  deleteAddress(i: number) {
    if (i > 0) {
      this.addresses.removeAt(i)
    }
  }

  createFormGroup(): FormGroup {
    const addressRow: FormGroup = new FormGroup({
      address: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    })

    return addressRow;
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const formValue = this.registerForm.value;
    const addressObj = formValue.fullAddress[0] || {
      address: '',
      street: '',
      country: '',
      city: ''
    };
    const newAccount: IAccount = {
      sub: '',
      email: formValue.email,
      name: formValue.userName,
      password: formValue.password,
      passConfirm: formValue.confirmPassword,
      picture: '',
      isPassGoogle: false,
      given_name: formValue.name,
      family_name: '',
      lang: 'en',
      address: addressObj
    };
    const isEmailExist = this._registerStore.ifEmailExist(newAccount.email)
    if (!isEmailExist) {
      this._registerStore.addToAccountsList(newAccount)
      this._router.navigateByUrl('/login');
    } else {
      this.showNotify("Error", "This email is already exist!")
    }
  }

  clearForm() {
    this.registerForm.reset();
  }

  showConfirm(resolve: (result: boolean) => boolean) {
    if (!this.visible) {
      this.messageService.add({
        key: 'confirm',
        sticky: true,
        severity: 'secondary',
        styleClass: 'backdrop-blur-lg rounded-2xl',
      });
      this.visible = true;

      this.onUserConfirmed = () => {
        this.onClose();
        resolve(true);
      };

      this.onUserCancelled = () => {
        this.onClose();
        resolve(false);
      };
    }
  }

  onClose() {
    this.visible = false;
    this.messageService.clear('confirm');
  }

  showNotify(summaryPar: string, detailPar: string) {
    this.messageService.add({ severity: 'secondary', summary: summaryPar, detail: detailPar });
  }


  ngAfterViewInit(): void {
    this._googleAuthService.InitiateGoogleAccount(this.googleBtn);
  }
}

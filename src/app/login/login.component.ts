import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {
  NotificationService,
  NotificationType,
} from '../notification/notification.service';
import { Account, AccountType } from '../interfaces/session.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.checkSession();
  }

  isInvalidControl(controlName: string) {
    const formControl = this.loginForm.controls[controlName];
    return formControl.touched && formControl.invalid;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formValues = this.loginForm.value;
    this.authService
      .authenticate(formValues.email, formValues.password)
      .pipe(first())
      .subscribe(
        authenticated => {
          this.notificationService.pushNotification(
            'authenticated!',
            NotificationType.INFO
          );
          this.checkSession();
        },
        error => {
          console.log(error);
          this.notificationService.pushNotification(
            'invalid credentials!',
            NotificationType.WARNING
          );
        }
      );
  }

  checkSession() {
    this.authService
      .getAccount()
      .pipe(first())
      .subscribe((account: Account) => {
        if (account && account.type === AccountType.CUSTOMER) {
          this.router.navigate(['/booking']);
        }
        if (account && account.type === AccountType.ADMIN) {
          this.router.navigate(['/admin']);
        }
      });
  }
}

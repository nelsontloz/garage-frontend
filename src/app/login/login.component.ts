import { Component, OnInit } from '@angular/core';
import { first, flatMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {
  NotificationService,
  NotificationType,
} from '../notification/notification.service';
import { Account, AccountType } from '../interfaces/session.interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  });
  isLoading = false;
  isRevokingSession = false;
  revoking = false;
  sessionId: string;
  faCheck = faCheck;
  faTimes = faTimes;

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
    this.isLoading = true;
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
        (errorResponse: HttpErrorResponse) => {
          this.isLoading = false;
          if (errorResponse.status === 409) {
            this.isRevokingSession = true;
            this.sessionId = errorResponse.error.sessionId;
            return;
          }
          this.loginForm.controls.password.setValue('');
          this.loginForm.controls.password.markAsUntouched();
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

  revokeSession() {
    this.revoking = true;
    this.authService
      .revoke(this.sessionId)
      .pipe(first())
      .subscribe(
        () => {
          this.onSubmit();
          this.loginForm.controls.password.setValue('');
          this.loginForm.controls.password.markAsUntouched();
        },
        error => {
          this.revoking = false;
          this.loginForm.controls.password.setValue('');
          this.loginForm.controls.password.markAsUntouched();
        }
      );
  }

  noRevoke() {
    this.revoking = false;
    this.isRevokingSession = false;
    this.loginForm.controls.password.setValue('');
    this.loginForm.controls.password.markAsUntouched();
  }
}

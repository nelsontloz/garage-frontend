import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  NotificationService,
  NotificationType,
} from '../notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  isLoading = false;
  accountForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.minLength(6), Validators.required]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.accountForm.addControl(
      'passwordConfirm',
      new FormControl(
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.required,
          this.validatePassword(),
        ])
      )
    );
    this.accountForm.controls.password.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.accountForm.controls.passwordConfirm.updateValueAndValidity();
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  isInvalidControl(controlName: string) {
    const formControl = this.accountForm.controls[controlName];
    return formControl.touched && formControl.invalid;
  }

  validatePassword() {
    const passwordControl = this.accountForm.controls.password;
    return (confirmPasswordControl: AbstractControl) => {
      if (passwordControl.value !== confirmPasswordControl.value) {
        return { confirmPassword: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    const formValues = this.accountForm.value;
    delete formValues.passwordConfirm;
    this.isLoading = true;
    this.authService.signUp(formValues).subscribe(
      (response: any) => {
        this.notificationService.pushNotification(
          response.message,
          NotificationType.SUCCESS
        );
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error => {
        this.notificationService.pushNotification(
          'An error has ocurred, please try again later.',
          NotificationType.DANGER
        );
        this.isLoading = false;
      }
    );
  }
}

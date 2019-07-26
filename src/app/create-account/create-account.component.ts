import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  NotificationService,
  NotificationType,
} from '../notification/notification.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit() {
    const formValues = this.accountForm.value;
    delete formValues.passwordConfirm;
    this.authService.signUp(formValues).subscribe(
      (response: any) => {
        this.notificationService.pushNotification(
          response.message,
          NotificationType.SUCCESS
        );
        this.router.navigate(['/login']);
      },
      error => {
        this.notificationService.pushNotification(
          'An error has ocurred, please try again later.',
          NotificationType.DANGER
        );
      }
    );
  }
}

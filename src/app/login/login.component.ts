import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService, NotificationType } from '../notification/notification.service';
import { Account, AccountType } from '../interfaces/session.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      this.authService.getAccount().pipe(first()).subscribe((account: Account) => {
        if (account.type === AccountType.CUSTOMER) {
          this.router.navigate(['/booking']);
        }
      });
      this.authService.authenticate(formValues.email, formValues.password).pipe(first()).subscribe((authenticated) => {
        this.notificationService.pushNotification('authenticated!', NotificationType.INFO);
      }, (error => {
        this.notificationService.pushNotification('invalid credentials!', NotificationType.WARNING);
      }));
    }
  }

}

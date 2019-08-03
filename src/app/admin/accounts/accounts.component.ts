import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { first } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  NotificationService,
  NotificationType,
} from 'src/app/notification/notification.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts = [];
  faTrash = faTrash;
  constructor(
    private accountsService: AccountsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.accountsService
      .getCustomers()
      .pipe(first())
      .subscribe((accounts: any[]) => {
        this.accounts = accounts;
      });
  }

  deleteCustomer(accountId: string) {
    this.accountsService
      .deleteCustomer(accountId)
      .pipe(first())
      .subscribe(
        response => {
          this.accounts = this.accounts.filter(account => {
            return account._id === accountId ? false : account;
          });
          this.notificationService.pushNotification(
            'Account deleted Success!',
            NotificationType.SUCCESS
          );
        },
        error => {
          this.notificationService.pushNotification(
            'Something went wrong, please try again later',
            NotificationType.DANGER
          );
        }
      );
  }
}

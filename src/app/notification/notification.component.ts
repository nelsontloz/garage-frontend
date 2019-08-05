import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { Subscription, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  showNotification = false;
  notificationType = '';
  message = '';
  subscription: Subscription;
  hideSubscription: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.$notification.subscribe(
      (data: any) => {
        this.message = data.message;
        this.notificationType = data.notificationType;
        this.showNotification = true;

        this.hideSubscription = interval(data.time ? data.time : 10000)
          .pipe(first())
          .subscribe(() => {
            this.showNotification = false;
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  hideNotification() {
    this.showNotification = false;
    this.hideSubscription.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum NotificationType {
  PRIMARY = 'is-primary',
  LINK = 'is-link',
  INFO = 'is-info',
  SUCCESS = 'is-success',
  WARNING = 'is-warning',
  DANGER = 'is-danger',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  $notification: Subject<any> = new Subject();

  constructor() {}

  pushNotification(
    message: string,
    notificationType: NotificationType,
    time?: number
  ) {
    this.$notification.next({ message, notificationType, time });
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Account, AccountType } from './interfaces/session.interface';
import { NotificationService, NotificationType } from './notification/notification.service';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkAuth().pipe(
      map((account: Account) => {
        console.log(account);
        if (account && account.type === AccountType.ADMIN) {
          return true;
        }
        this.notificationService.pushNotification('You are not authorized to view this page!', NotificationType.WARNING);
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}

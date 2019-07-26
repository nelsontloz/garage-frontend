import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { faWarehouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { filter, first } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Account } from './interfaces/session.interface';
import { NotificationService, NotificationType } from './notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cct-garage-frontend';
  faWarehouse = faWarehouse;
  faUser = faUser;
  navbarMenuActive = false;
  account: Account;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.navbarMenuActive = false;
    });

    this.authService.getAccount().subscribe((account: Account) => {
      this.account = account;
    });
  }

  toggleNavbarMenu(event: MouseEvent) {
    this.navbarMenuActive = !this.navbarMenuActive;
  }

  logout() {
    this.authService.revoke().subscribe(() => {
      this.router.navigate(['/home']);
      this.notificationService.pushNotification('Logged out success!', NotificationType.INFO);
    });
  }
}

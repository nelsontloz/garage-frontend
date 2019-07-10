import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cct-garage-frontend';
  faWarehouse = faWarehouse;
  navbarMenuActive = false;

  constructor(private router: Router) {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.navbarMenuActive = false;
    });
  }

  toggleNavbarMenu(event: MouseEvent) {
    this.navbarMenuActive = !this.navbarMenuActive;
  }
}

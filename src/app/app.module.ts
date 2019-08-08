import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    HomeComponent,
    MyBookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then(mod => mod.BookingModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then(mod => mod.CreateAccountModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

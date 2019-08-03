import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDayComponent } from './schedule-day/schedule-day.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'schedule',
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
  },
  {
    path: 'schedule-day',
    component: ScheduleDayComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

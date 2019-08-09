import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDayComponent } from './schedule-day/schedule-day.component';
import { AccountsComponent } from './accounts/accounts.component';
import { EditSlotComponent } from './edit-slot/edit-slot.component';
import { ExtraPartsComponent } from './extra-parts/extra-parts.component';

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
  {
    path: 'edit-slot',
    component: EditSlotComponent,
  },
  {
    path: 'extra-parts',
    component: ExtraPartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

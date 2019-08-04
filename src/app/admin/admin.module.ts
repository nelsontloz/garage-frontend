import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleDayComponent } from './schedule-day/schedule-day.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountsComponent } from './accounts/accounts.component';
import { EditSlotComponent } from './edit-slot/edit-slot.component';

@NgModule({
  declarations: [
    AdminComponent,
    ScheduleComponent,
    ScheduleDayComponent,
    AccountsComponent,
    EditSlotComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FontAwesomeModule],
})
export class AdminModule {}

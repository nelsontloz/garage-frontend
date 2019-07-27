import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleDayComponent } from './schedule-day/schedule-day.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AdminComponent, ScheduleComponent, ScheduleDayComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FontAwesomeModule],
})
export class AdminModule {}

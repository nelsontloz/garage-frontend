import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleDayComponent } from './schedule-day/schedule-day.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountsComponent } from './accounts/accounts.component';
import { EditSlotComponent } from './edit-slot/edit-slot.component';
import { ExtraPartsComponent } from './extra-parts/extra-parts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleDayComponent,
    AccountsComponent,
    EditSlotComponent,
    ExtraPartsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';
import { BookDayComponent } from './book-day/book-day.component';
import { BookSlotComponent } from './book-slot/book-slot.component';

const routes: Routes = [
  { path: '', component: BookingComponent },
  { path: 'day', component: BookDayComponent },
  { path: 'slot', component: BookSlotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }

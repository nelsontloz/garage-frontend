import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import calendar from 'calendar-js';
import { BookingService } from '../booking.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  months: CalendarType[] = [];
  currentDate = moment();

  selectedMonth = {};
  slotsByDate = null;

  constructor(private bookingService: BookingService) {

    const initialDate = moment();
    for (let i = 0; i < 10; i++) {
      const month = (calendar() as any).detailed(initialDate.year(), initialDate.month());

      this.months.push(month);
      initialDate.add(1, 'months');
    }
    this.setMonth(this.months[0]);
  }

  ngOnInit() {
  }

  setMonth(month: CalendarType) {
    if (this.selectedMonth === month) {
      return;
    }
    this.selectedMonth = month;
    const startDate = moment(month.month + '-' + month.year, 'MMMM-YYYY');
    const endDate = startDate.clone().add(1, 'month');

    this.slotsByDate = null;
    this.bookingService.getSlotsCountByDateRange(startDate, endDate).pipe(
      first()
    ).subscribe((response: any) => {
      this.slotsByDate = {};
      response.forEach((slotCount: any) => {
        const dateMoment = moment(slotCount.date);
        this.slotsByDate[dateMoment.format('DD-MM-YYYY')] = slotCount.slots;
      });
    });
  }

  getDaySlots(date: Date) {
    const dateMoment = moment(date);
    const slots = this.slotsByDate[dateMoment.format('DD-MM-YYYY')];
    return slots ? slots : 0;
  }

  isWeekend(index: number) {
    return index === 5 || index === 6;
  }

  generateQueryParam(date: Date) {
    return moment(date).format('DD-MM-YYYY');
  }
}

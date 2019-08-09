import { Component, OnInit } from '@angular/core';
import calendar from 'calendar-js';
import { BookingService } from '../booking.service';
import { first } from 'rxjs/operators';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  months: CalendarType[] = [];
  currentDate = DateTime.local();

  selectedMonth = {};
  slotsByDate = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    const date = new Date();
    for (let i = 0; i < 10; i++) {
      const month = (calendar() as any).detailed(
        date.getFullYear(),
        date.getMonth()
      );

      this.months.push(month);
      date.setMonth(date.getMonth() + 1);
    }
    this.setMonth(this.months[0]);
  }

  setMonth(month: CalendarType) {
    if (this.selectedMonth === month) {
      return;
    }
    this.selectedMonth = month;
    const startDate = DateTime.fromFormat(
      month.month + '-' + month.year,
      'MMMM-yyyy'
    );
    const endDate = startDate.plus({ month: 1 });

    this.slotsByDate = null;
    this.bookingService
      .getSlotsCountByDateRange(startDate.toJSDate(), endDate.toJSDate())
      .pipe(first())
      .subscribe((response: any) => {
        this.slotsByDate = {};
        response.forEach((slotCount: any) => {
          const dateLux = DateTime.fromISO(slotCount.date);
          this.slotsByDate[dateLux.toFormat('dd-MM-yyyy')] = slotCount.slots;
        });
      });
  }

  getDaySlots(date: Date) {
    const dateLux = DateTime.fromJSDate(date);
    const slots = this.slotsByDate[dateLux.toFormat('dd-MM-yyyy')];
    return slots ? slots : 0;
  }

  isWeekend(index: number) {
    return index === 5 || index === 6;
  }

  generateQueryParam(date: Date) {
    return DateTime.fromJSDate(date).toFormat('dd-MM-yyyy');
  }
}

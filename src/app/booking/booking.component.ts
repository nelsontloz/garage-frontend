import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import calendar from 'calendar-js';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  months: CalendarType[] = [];
  currentDate = moment();

  selectedMonth = {};

  constructor() {

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
    this.selectedMonth = month;
  }

  isWeekend(index: number) {
    return index === 5 || index === 6;
  }

  generateQueryParam(date: Date) {
    return moment(date).format('LL');
  }
}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import calendar from 'calendar-js';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  months;
  calendar;
  weeks;

  constructor() {

    const currentMonth = moment().month();
    this.months = Object.assign([], calendar().months());
    for (let i = 0; i <= currentMonth; i++) {
      const preMonth = this.months.shift() || '';
      this.months.push(preMonth);
    }

    this.calendar = calendar().of(2019, 7);
    this.weeks = this.calendar.calendar.map((week: number[]) => {
      return week.filter((day: number) => {
        return day !== 0;
      });
    });
  }

  ngOnInit() {
  }

  setMonth(month: string) {
    const calendarMonths = calendar().months();
    const selectedMonthIndex = calendarMonths.indexOf(month);
    this.calendar = calendar().of(2019, selectedMonthIndex);
    this.weeks = this.calendar.calendar;
  }
}

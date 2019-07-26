import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.scss'],
})
export class ScheduleDayComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      const date = moment(queryParams.date, 'DD-MM-YYYY');
      this.bookingService
        .getBookedSlotsDetailsDateRange(date, date.clone().add(1, 'day'))
        .subscribe((response: any[]) => {
          console.log(response);
        });
    });
  }
}

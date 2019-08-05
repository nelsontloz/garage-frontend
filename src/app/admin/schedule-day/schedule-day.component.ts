import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.scss'],
})
export class ScheduleDayComponent implements OnInit {
  slots = null;
  date: moment.Moment;
  faPrint = faPrint;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.date = moment(queryParams.date, 'DD-MM-YYYY');
      this.bookingService
        .getBookedSlotsDetailsDateRange(
          this.date,
          this.date.clone().add(1, 'day')
        )
        .pipe(first())
        .subscribe((response: any[]) => {
          this.slots = response
            .map((slot: any) => {
              slot.date = moment(slot.date);
              return slot;
            })
            .sort((a, b) => {
              return a.date - b.date;
            });
        });
    });
  }

  printSchedule() {
    // let scheduleListElem = document.getElementById('schedule-list');

    window.print();
  }

  printElem(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
}

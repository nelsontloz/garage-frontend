import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.scss'],
})
export class ScheduleDayComponent implements OnInit {
  slots = null;
  date: DateTime;
  faPrint = faPrint;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.date = DateTime.fromFormat(queryParams.date, 'dd-MM-yyyy');
      this.bookingService
        .getBookedSlotsDetailsDateRange(
          this.date.toJSDate(),
          this.date.plus({ day: 1 }).toJSDate()
        )
        .pipe(first())
        .subscribe((response: any[]) => {
          this.slots = response
            .map((slot: any) => {
              slot.date = DateTime.fromISO(slot.date);
              return slot;
            })
            .sort((a, b) => {
              return a.date - b.date;
            });
        });
    });
  }

  printSchedule() {
    window.print();
  }

  printElem(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
}

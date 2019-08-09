import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BookingService } from '../../booking.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-book-day',
  templateUrl: './book-day.component.html',
  styleUrls: ['./book-day.component.scss'],
})
export class BookDayComponent implements OnInit {
  dateName = '';
  slots = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      const date = DateTime.fromFormat(queryParams.date, 'dd-MM-yyyy');
      this.dateName = date.toFormat('DDDD');
      this.slots = [];
      this.bookingService
        .getSlotsByDate(date.toJSDate())
        .subscribe((response: any[]) => {
          this.slots = response
            .map(slot => {
              slot.date = DateTime.fromISO(slot.date);
              return slot;
            })
            .sort((a, b) => {
              return a.date - b.date;
            });
        });
    });
  }

  generateQueryParam(date: DateTime) {
    return date.toFormat('dd-MM-yyyy HH:mm');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-book-day',
  templateUrl: './book-day.component.html',
  styleUrls: ['./book-day.component.scss']
})
export class BookDayComponent implements OnInit {

  dateName = '';
  slots = [];

  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      const date = moment(queryParams.date, 'DD-MM-YYYY');
      this.dateName = date.format('LL');
      this.slots = [];
      this.bookingService.getSlotsByDate(date).subscribe((response: any[]) => {
        this.slots = response.map(slot => {
          slot.date = moment(slot.date);
          return slot;
        }).sort((a, b) => {
          return a.date - b.date;
        });
      });
    });
  }

  generateQueryParam(date: moment.Moment) {
    return date.format('DD-MM-YYYY HH:mm');
  }
}

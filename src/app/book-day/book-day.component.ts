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
      const date = moment(queryParams.date, 'LL');
      this.dateName = date.format('LL');
      this.bookingService.getSlotsByDate(date).subscribe((response: any[]) => {
        this.slots = response.map(slot => {
          slot.date = moment(slot.date);
          return slot;
        });
      });

      // let firstSlot = date.clone().add(9, 'hours');
      // for (let i = 0; i < 8; i++) {
      //   this.slots.push(firstSlot);
      //   firstSlot = firstSlot.clone().add(1, 'hour');
      // }
    });
  }

}

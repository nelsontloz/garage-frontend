import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { ActivatedRoute } from '@angular/router';
import { first, flatMap } from 'rxjs/operators';
import { Slot } from 'src/app/interfaces/slot.interface';

@Component({
  selector: 'app-edit-slot',
  templateUrl: './edit-slot.component.html',
  styleUrls: ['./edit-slot.component.scss'],
})
export class EditSlotComponent implements OnInit {
  slot = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        flatMap(queryParams => {
          return this.bookingService.getSlotById(queryParams.slotId);
        }),
        first()
      )
      .subscribe((slot: Slot) => {
        this.slot = slot;
      });
  }

  onChangeStatus(status: string) {
    this.bookingService
      .updateSlotStatus(this.slot._id, status)
      .pipe(first())
      .subscribe(response => {
        console.log(response);
      });
  }
}

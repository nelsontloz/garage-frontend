import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { Account } from '../interfaces/session.interface';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  account: Account;
  slots: any[] = [];

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.authService
      .getAccount()
      .pipe(first())
      .subscribe((account: Account) => {
        this.account = account;
      });

    this.bookingService
      .getSlotsByCustomer()
      .pipe(
        first()
      )
      .subscribe((slots: any) => {
        this.slots = slots;
      });
  }
}

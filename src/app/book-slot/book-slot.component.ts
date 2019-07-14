import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BookingService } from '../booking.service';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.scss']
})
export class BookSlotComponent implements OnInit {

  dateMoment: moment.Moment;

  vehicleForm = this.fb.group({
    vehicleType: ['', Validators.required],
    licence: ['', Validators.required],
    engineType: ['', Validators.required],
  });

  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService, private fb: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.dateMoment = moment(queryParams.date, 'DD-MM-YYYY HH:mm');
      this.bookingService.getSlotByDate(this.dateMoment).pipe(
        first()
      ).subscribe((response) => {
        console.log(response);
      });

      const emailFormControl = new FormControl('', [Validators.required, Validators.email]);
      this.vehicleForm.addControl('email', emailFormControl);
    });
  }

  onSubmit() {
    console.log(this.vehicleForm.value);
  }

}

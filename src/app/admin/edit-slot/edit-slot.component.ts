import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { ActivatedRoute } from '@angular/router';
import { first, flatMap } from 'rxjs/operators';
import { Slot } from 'src/app/interfaces/slot.interface';
import {
  NotificationService,
  NotificationType,
} from 'src/app/notification/notification.service';
import { faPlus, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ExtraPartsService } from '../extra-parts.service';

@Component({
  selector: 'app-edit-slot',
  templateUrl: './edit-slot.component.html',
  styleUrls: ['./edit-slot.component.scss'],
})
export class EditSlotComponent implements OnInit {
  slot = null;
  faPlus = faPlus;
  faSpinner = faSpinner;
  faTimes = faTimes;
  isUpdating = false;
  isAddingParts = true;
  isAddingPart = '';
  extraParts = [];
  extraPartsAux = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private extraPartsService: ExtraPartsService,
    private notificationService: NotificationService
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

    this.extraPartsService
      .getParts()
      .pipe(first())
      .subscribe((response: any[]) => {
        this.extraParts = response;
        this.extraPartsAux = response;
      });
  }

  onChangeStatus(status: string) {
    this.isUpdating = true;
    this.bookingService
      .updateSlotStatus(this.slot._id, status)
      .pipe(first())
      .subscribe(
        response => {
          this.notificationService.pushNotification(
            'Slot updated!',
            NotificationType.SUCCESS,
            3000
          );
        },
        error => {
          this.notificationService.pushNotification(
            'Something went wrong!',
            NotificationType.WARNING,
            3000
          );
        },
        () => {
          this.isUpdating = false;
        }
      );
  }

  onAddParts() {
    this.isAddingParts = true;
    this.extraParts = this.extraPartsAux;
  }

  onAddPart(part: any, index: number) {
    this.isAddingPart = part._id;
  }

  onChangeFindPart(value: string) {
    if (value && value.length > 0) {
      this.extraParts = this.extraPartsAux.filter(part => {
        const partName = part.name.toLowerCase();
        return partName.includes(value);
      });
      return;
    }
    this.extraParts = this.extraPartsAux;
  }
}

import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/booking.service';
import { ActivatedRoute } from '@angular/router';
import { first, flatMap } from 'rxjs/operators';
import { Slot } from 'src/app/interfaces/slot.interface';
import {
  NotificationService,
  NotificationType,
} from 'src/app/notification/notification.service';
import {
  faPlus,
  faSpinner,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ExtraPartsService } from '../extra-parts.service';
import { isArray } from 'util';

@Component({
  selector: 'app-edit-slot',
  templateUrl: './edit-slot.component.html',
  styleUrls: ['./edit-slot.component.scss'],
})
export class EditSlotComponent implements OnInit {
  slot = null;
  uniqueSlotParts = [];
  faPlus = faPlus;
  faSpinner = faSpinner;
  faTimes = faTimes;
  faTrash = faTrash;
  isUpdating = false;
  isAddingParts = false;
  isAddingPart = {};
  isRemovingPart = {};
  extraParts = [];
  extraPartsAux = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private extraPartsService: ExtraPartsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadSlot();
    this.extraPartsService
      .getParts()
      .pipe(first())
      .subscribe((response: any[]) => {
        this.extraParts = response;
        this.extraPartsAux = response;
      });
  }

  private loadSlot() {
    this.activatedRoute.queryParams
      .pipe(
        flatMap(queryParams => {
          return this.bookingService.getSlotById(queryParams.slotId);
        }),
        first()
      )
      .subscribe((slot: Slot) => {
        this.slot = slot;
        this.loadUniqueParts();
      });
  }

  loadUniqueParts() {
    this.uniqueSlotParts = Array.from(
      new Set(this.slot.extraParts.map(a => a._id))
    ).map(id => {
      return this.slot.extraParts.find(a => a._id === id);
    });
  }

  calculateTotalCost() {
    if (!this.slot) {
      return 0;
    }
    if (!isArray(this.slot.extraParts)) {
      return 0;
    }
    let totalCost = 0;
    this.slot.extraParts.forEach(part => {
      totalCost += part.price;
    });
    return totalCost;
  }

  countParts(partId: string) {
    if (!this.slot) {
      return 0;
    }
    if (!isArray(this.slot.extraParts)) {
      return 0;
    }
    let count = 0;
    this.slot.extraParts.forEach(part => {
      if (part._id === partId) {
        count++;
      }
    });
    return count;
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
          this.showErrorNotification();
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

  onAddPart(part: any) {
    this.isAddingPart[part._id] = true;
    this.bookingService
      .addOnePart(this.slot._id, part)
      .pipe(first())
      .subscribe(
        response => {
          this.slot.extraParts.push(Object.assign({}, part));
          this.loadUniqueParts();
        },
        this.showErrorNotification,
        () => {
          delete this.isAddingPart[part._id];
        }
      );
  }

  onRemovePart(part: any) {
    this.isRemovingPart[part._id] = true;
    this.bookingService
      .removeOnePart(this.slot._id, part._id)
      .pipe(first())
      .subscribe(
        response => {
          if (!isArray(this.slot.extraParts)) {
            return;
          }
          let valueIndex;
          this.slot.extraParts.some((extraPart: any, index: number) => {
            if (extraPart._id === part._id) {
              valueIndex = index;
              return true;
            }
          });
          this.slot.extraParts.splice(valueIndex, 1);
        },
        this.showErrorNotification,
        () => {
          delete this.isRemovingPart[part._id];
        }
      );
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

  private showErrorNotification() {
    this.notificationService.pushNotification(
      'Something went wrong!',
      NotificationType.WARNING,
      5000
    );
  }
}

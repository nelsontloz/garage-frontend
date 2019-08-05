import { Component, OnInit } from '@angular/core';
import { ExtraPartsService } from '../extra-parts.service';
import { first } from 'rxjs/operators';
import {
  faEdit,
  faTrash,
  faPlus,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {
  NotificationService,
  NotificationType,
} from 'src/app/notification/notification.service';

@Component({
  selector: 'app-extra-parts',
  templateUrl: './extra-parts.component.html',
  styleUrls: ['./extra-parts.component.scss'],
})
export class ExtraPartsComponent implements OnInit {
  isAddingNewPart = false;
  isSaving = false;
  isRemoving = '';
  extraParts = null;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;

  partForm: FormGroup;
  constructor(
    private extraPartsService: ExtraPartsService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.partForm = this.fb.group({
      name: ['', Validators.required],
      price: [
        '',
        Validators.compose([
          Validators.required,
          (control: AbstractControl) => {
            if (control.value >= 0) {
              return null;
            }
            return {
              invalidPrice: true,
            };
          },
        ]),
      ],
    });
  }

  ngOnInit() {
    this.extraPartsService
      .getParts()
      .pipe(first())
      .subscribe((response: any[]) => {
        this.extraParts = response;
      });
  }

  onAddNew() {
    this.isAddingNewPart = !this.isAddingNewPart;
  }

  onCancel() {
    this.isAddingNewPart = false;
    this.partForm.reset();
  }

  onRemovePart(partId: string, index: number) {
    this.isRemoving = partId;
    this.extraPartsService
      .deletePart(partId)
      .pipe(first())
      .subscribe(
        response => {
          this.notificationService.pushNotification(
            'Part removed!',
            NotificationType.SUCCESS,
            5000
          );
          this.extraParts.splice(index, 1);
        },
        error => {
          this.notificationService.pushNotification(
            'Something went wrong!',
            NotificationType.DANGER,
            5000
          );
        },
        () => {
          this.isRemoving = '';
        }
      );
  }

  onSubmitPart() {
    if (this.partForm.invalid) {
      return;
    }
    this.isSaving = true;
    this.extraPartsService
      .createParts(this.partForm.value.name, +this.partForm.value.price)
      .pipe(first())
      .subscribe(
        createdPart => {
          this.extraParts.push(createdPart);
          this.notificationService.pushNotification(
            'Part created!',
            NotificationType.SUCCESS,
            5000
          );
          this.partForm.reset();
        },
        error => {
          this.notificationService.pushNotification(
            'Something went wrong!',
            NotificationType.DANGER,
            5000
          );
        },
        () => {
          this.isSaving = false;
        }
      );
  }
}

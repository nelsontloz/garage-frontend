import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormGroup,
} from '@angular/forms';

import { first } from 'rxjs/operators';
import * as moment from 'moment';

import { BookingService } from '../../booking.service';
import { AuthService } from 'src/app/auth.service';
import { Account } from 'src/app/interfaces/session.interface';
import {
  NotificationService,
  NotificationType,
} from 'src/app/notification/notification.service';

export enum BookingServiceType {
  ANNUAL_SERVICE = 'Annual Service',
  MAJOR_SERVICE = 'Major Service',
  REPAIR = 'Repair',
  MAJOR_REPAIR = 'Major Repair',
}

export enum VehicleEngineType {
  DIESEL = 'diesel',
  PETROL = 'petrol',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
}

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.scss'],
})
export class BookSlotComponent implements OnInit {
  serviceTypes = Object.values(BookingServiceType);
  engineTypes = Object.values(VehicleEngineType);
  carBrands = carBrands;
  dateMoment: moment.Moment;
  bookSlot;

  vehicleForm = this.fb.group({
    licenseDetails: ['', Validators.required],
    engineType: ['', this.selectInputValidator(this.engineTypes)],
    type: ['', Validators.required],
    maker: ['', Validators.required],
  });

  slotForm = this.fb.group({
    serviceType: ['', this.selectInputValidator(this.serviceTypes)],
    customerComments: [''],
  });

  account: Account;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAccount().subscribe((account: Account) => {
      this.account = account;
    });
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.dateMoment = moment(queryParams.date, 'DD-MM-YYYY HH:mm');
      this.bookingService
        .getSlotByDate(this.dateMoment)
        .pipe(first())
        .subscribe(response => {
          this.bookSlot = response;
          if (this.bookSlot.status !== 'free') {
            this.notificationService.pushNotification(
              'Selected slot was already taken!',
              NotificationType.WARNING
            );
            this.router.navigate(['/booking']);
          }
        });
    });
  }

  isInvalidControl(formGroup: FormGroup, controlName: string) {
    const formControl = formGroup.controls[controlName];
    return formControl.touched && formControl.invalid;
  }

  onSubmit() {
    if (this.slotForm.invalid || this.vehicleForm.invalid) {
      this.slotForm.markAllAsTouched();
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicleDetails = this.vehicleForm.value;
    const slotDetails = this.slotForm.value;
    slotDetails.vehicle = vehicleDetails;
    this.bookingService
      .bookSlot(this.bookSlot._id, slotDetails)
      .pipe(first())
      .subscribe(() => {
        this.notificationService.pushNotification(
          'Slot booked successfully!',
          NotificationType.SUCCESS
        );
        this.router.navigate(['/booking']);
      });
  }

  navigateBack() {
    this.location.back();
  }

  private selectInputValidator(array: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valueIndex = array.indexOf(control.value);
      return valueIndex < 0
        ? { invalidSelection: { value: control.value } }
        : null;
    };
  }
}

const carBrands = [
  'AC',
  'AC PROPULSION',
  'ACURA',
  'A.D. TRAMONTANA',
  'ALFA ROMEO',
  'ALMAC',
  'ALTERNATIVE CARS',
  'AMUZA',
  'ANTEROS',
  'ARASH',
  'ARIEL',
  'ARRINERA',
  'ASL',
  'ASTERIO',
  'ASTON MARTIN',
  'AUDI',
  'BAC',
  'BAJAJ',
  'BEIJING AUTOMOBILE',
  'BENTLEY',
  'BMW',
  'BOLLORÉ',
  'BOLWELL',
  'BRILLIANCE/HUACHEN',
  'BRISTOL',
  'BRITISH LEYLAND',
  'BRM BUGGY',
  'BROOKE',
  'BUDDY',
  'BUFORI',
  'BUGATTI',
  'BUICK',
  'BYD',
  'CADILLAC',
  'CAPARO',
  'CARBONTECH',
  'CARICE',
  "CHANG'AN",
  'CHANGHE',
  'CHERY',
  'CHEVROLET',
  'CHEVRON',
  'CITROËN',
  'CHRYSLER',
  'COMMUTER CARS',
  'CONNAUGHT',
  'COVINI',
  'DACIA',
  'DAIHATSU',
  'DATSUN',
  'DE LA CHAPELLE',
  'DMC',
  'DIARDI',
  'DODGE',
  'DONKERVOORT',
  'DONGFENG',
  'DONTO',
  'DS AUTOMOBILES',
  'DYNASTI ELECTRIC',
  'E-VADE',
  'EFFEDI',
  'EGY-TECH ENGINEERING',
  'ELECTRIC RACEABOUT',
  'ELFIN',
  'EMGRAND',
  'ENGLON',
  'ETERNITI',
  'ETOX',
  'EQUUS',
  'EXAGON',
  'FARALLI & MAZZANTI',
  'FAW',
  'FERRARI',
  'FIAT',
  'FISKER',
  'FODAY',
  'FORCE',
  'FORD',
  'FORD AUSTRALIA',
  'FORD GERMANY',
  'FORNASARI',
  'FRASER',
  'GAC GROUP',
  'GALPIN',
  'GEELY',
  'GENESIS',
  'GIBBS',
  'GILLET',
  'GINETTA',
  'GMC',
  'GONOW',
  'GREAT WALL/CHANGCHENG',
  'GREENTECH AUTOMOTIVE',
  'GRINNALL',
  'GTA MOTOR',
  'GUMPERT',
  'GURGEL',
  'HENNESSEY',
  'HINDUSTAN',
  'HOLDEN',
  'HONDA',
  'HONGQI',
  'HRADYESH',
  'HTT TECHNOLOGIES',
  'HULME',
  'HYUNDAI',
  'ICML',
  'IFR',
  'IRAN KHODRO',
  'IKCO',
  'IMPERIA',
  'INFINITI',
  'IVM',
  'INVICTA',
  'ISDERA',
  'ISUZU',
  'JAC',
  'JAGUAR',
  'JEEP',
  'JENSEN MOTORS',
  'JETCAR',
  'JONWAY',
  'JOSS',
  'KAIPAN',
  'KANTANKA',
  'KARMA',
  'KOENIGSEGG',
  'KORRES',
  'KIA',
  'KIAT',
  'KISH KHODRO',
  'KTM',
  'LADA',
  'LAMBORGHINI',
  'LANCIA',
  'LAND ROVER',
  'LANDWIND',
  'LARAKI',
  'LEBLANC',
  'LEITCH',
  'LEOPARD',
  'LEXUS',
  'LI-ION',
  'LIFAN',
  'LIGHTNING',
  'LINCOLN',
  'LISTER',
  'LOCAL MOTORS',
  'LOBINI',
  'LOTEC',
  'LOTUS CARS',
  'LUCRA CARS',
  'LUXGEN',
  'MAHINDRA',
  'MARUSSIA',
  'MARUTI SUZUKI',
  'MASERATI',
  'MASTRETTA',
  'MAZDA',
  'MCLAREN',
  'MERCEDES-BENZ',
  'MG',
  'MICRO',
  'MINI',
  'MITSUBISHI',
  'MITSUOKA',
  'MORGAN',
  'MULLEN',
  'MYCAR',
  'MYVI-PERODUA',
  'NISSAN',
  'NOBLE',
  'NOTA',
  'OLDSMOBILE',
  'OPEL',
  'OPTIMAL ENERGY',
  'ORCA',
  'OLTCIT',
  'PAGANI',
  'PANHARD',
  'PANOZ',
  'PERANA',
  'PERODUA',
  'PEUGEOT',
  'P.G.O.',
  'POLARSUN',
  'PLYMOUTH',
  'PORSCHE',
  'PROTO',
  'OULLIM',
  'PROTON',
  'PURITALIA',
  'QOROS',
  'QVALE',
  'RADICAL',
  'RELIANT',
  'RENAULT',
  'REVA',
  'RIMAC',
  'RINSPEED',
  'RODING',
  'ROEWE',
  'ROLLS-ROYCE',
  'ROSSIN-BERTIN',
  'ROSSION',
  'ROVER',
  'SAAB',
  'SALEEN',
  'SAIC-GM-WULING',
  'SAIPA',
  'SAKER',
  'SAMSUNG',
  'SAN',
  'SBARRO',
  'SCION',
  'SEAT',
  'SHANGHAI MAPLE',
  'SIN',
  'ŠKODA',
  'SMART',
  'SPADA VETTURE SPORT',
  'SPYKER',
  'SSANGYONG',
  'SSC NORTH AMERICA',
  'STREET & RACING',
  'SUBARU',
  'SUZUKI',
  'TANOM',
  'TATA',
  'TAURO',
  'TAWON CAR',
  'TD CARS',
  'TESLA',
  'THAI RUNG',
  'TOYOTA',
  'TREKKA',
  'TRIDENT',
  'TRIUMPH',
  'TROLLER',
  'TRUMPCHI',
  'TUSHEK',
  'TVR',
  'TVS',
  'ULTIMA',
  'UMM',
  'UEV',
  'URI',
  'UAZ',
  'VAUXHALL MOTORS',
  'VECTOR',
  'VENCER',
  'VENIRAUTO',
  'VENTURI',
  'VEPR',
  'VOLKSWAGEN',
  'VOLVO',
  'VINFAST',
  'W MOTORS',
  'WALLYSCAR',
  'WESTFIELD',
  'WHEEGO',
  'WIESMANN',
  'XENIA',
  'YES!',
  'YOUABIAN PUMA',
  'ZASTAVA AUTOMOBILES',
  'ZENDER CARS',
  'ZENOS CARS',
  'ZENVO',
  'ZIL',
  'ZX AUTO',
];

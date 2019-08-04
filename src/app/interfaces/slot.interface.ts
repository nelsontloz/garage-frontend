export interface Vehicle {
  _id: string;
  licenseDetails: string;
  engineType: string;
  type: string;
  maker: string;
}

export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: string;
}

export interface Slot {
  status: string;
  customerComments: string;
  vehicle: Vehicle;
  _id: string;
  date: Date;
  customer: Customer;
  serviceType: string;
}

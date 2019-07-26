export interface Vehicle {
  type: string;
  licenseDetails: string;
  engineType: VehicleEngineType;
  maker: string;
}

export enum VehicleEngineType {
  DIESEL = 'diesel',
  PETROL = 'petrol',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
}

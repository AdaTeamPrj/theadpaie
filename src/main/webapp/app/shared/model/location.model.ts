import { IEmployee } from 'app/shared/model/employee.model';
import { IEmployeur } from 'app/shared/model/employeur.model';

export interface ILocation {
  id?: number;
  streetName?: string;
  numeroRue?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  employees?: IEmployee[] | null;
  employeurs?: IEmployeur[] | null;
}

export const defaultValue: Readonly<ILocation> = {};

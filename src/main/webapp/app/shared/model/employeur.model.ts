import { IConventionCollective } from 'app/shared/model/convention-collective.model';
import { ILocation } from 'app/shared/model/location.model';

export interface IEmployeur {
  id?: number;
  name?: string;
  numeroSiret?: string;
  numApe?: string;
  numUrssaf?: string;
  conventionCollectives?: IConventionCollective[] | null;
  locations?: ILocation[] | null;
}

export const defaultValue: Readonly<IEmployeur> = {};

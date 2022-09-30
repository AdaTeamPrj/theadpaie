import dayjs from 'dayjs';
import { IConventionCollective } from 'app/shared/model/convention-collective.model';
import { IEmployeur } from 'app/shared/model/employeur.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { TypeForfait } from 'app/shared/model/enumerations/type-forfait.model';

export interface IContrat {
  id?: number;
  salaireBase?: number;
  emploi?: string;
  dateArrive?: string;
  classification?: number;
  typeForfait?: TypeForfait;
  nbHeure?: number | null;
  conventionCollective?: IConventionCollective | null;
  employeur?: IEmployeur | null;
  employee?: IEmployee | null;
}

export const defaultValue: Readonly<IContrat> = {};

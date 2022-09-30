import { IEmployeur } from 'app/shared/model/employeur.model';

export interface IConventionCollective {
  id?: number;
  idcc?: number;
  nom?: string;
  position?: number;
  coefficient?: number;
  valeurPoint?: number;
  baseFixe?: number;
  salaireMinimaux?: number;
  employeurs?: IEmployeur[] | null;
}

export const defaultValue: Readonly<IConventionCollective> = {};

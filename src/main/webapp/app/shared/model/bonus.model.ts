import { IContrat } from 'app/shared/model/contrat.model';

export interface IBonus {
  id?: number;
  nom?: string;
  montant?: number;
  contrat?: IContrat | null;
}

export const defaultValue: Readonly<IBonus> = {};

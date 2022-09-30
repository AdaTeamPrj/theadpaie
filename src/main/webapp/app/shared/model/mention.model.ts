import { IFicheDePaie } from 'app/shared/model/fiche-de-paie.model';

export interface IMention {
  id?: number;
  mention?: string;
  ficheDePaies?: IFicheDePaie[] | null;
}

export const defaultValue: Readonly<IMention> = {};

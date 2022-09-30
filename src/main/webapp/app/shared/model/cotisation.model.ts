import dayjs from 'dayjs';
import { IFicheDePaie } from 'app/shared/model/fiche-de-paie.model';
import { Categorie } from 'app/shared/model/enumerations/categorie.model';

export interface ICotisation {
  id?: number;
  name?: string;
  famille?: Categorie;
  taux?: number;
  startDate?: string;
  endDate?: string | null;
  actuel?: boolean;
  ficheDePaies?: IFicheDePaie[] | null;
}

export const defaultValue: Readonly<ICotisation> = {
  actuel: false,
};

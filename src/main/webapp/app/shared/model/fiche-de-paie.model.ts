import dayjs from 'dayjs';
import { IContrat } from 'app/shared/model/contrat.model';
import { IEmployeur } from 'app/shared/model/employeur.model';
import { ITauxDImposition } from 'app/shared/model/taux-d-imposition.model';
import { ICotisation } from 'app/shared/model/cotisation.model';
import { IMention } from 'app/shared/model/mention.model';

export interface IFicheDePaie {
  id?: number;
  salaireBrut?: number;
  startDate?: string;
  endDate?: string;
  datepaiement?: string;
  salaireNet?: number;
  montantNetAvantImpots?: number;
  proFees?: number;
  deductions?: number | null;
  contrat?: IContrat | null;
  employeur?: IEmployeur | null;
  imposition?: ITauxDImposition | null;
  cotisations?: ICotisation[] | null;
  mentions?: IMention[] | null;
}

export const defaultValue: Readonly<IFicheDePaie> = {};

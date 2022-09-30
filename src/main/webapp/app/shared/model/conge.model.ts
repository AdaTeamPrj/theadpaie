import dayjs from 'dayjs';
import { IContrat } from 'app/shared/model/contrat.model';
import { Decision } from 'app/shared/model/enumerations/decision.model';

export interface IConge {
  id?: number;
  holdateStart?: string;
  holdateEnd?: string;
  holdatePay?: number;
  nbCongeAcquis?: number | null;
  nbCongePris?: number;
  dateDemande?: string;
  decision?: Decision;
  dateReponse?: string | null;
  contrat?: IContrat | null;
}

export const defaultValue: Readonly<IConge> = {};

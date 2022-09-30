import dayjs from 'dayjs';

export interface ITauxDImposition {
  id?: number;
  taux?: number;
  minSalary?: number;
  maxSalary?: number | null;
  startDate?: string;
  endDate?: string | null;
}

export const defaultValue: Readonly<ITauxDImposition> = {};

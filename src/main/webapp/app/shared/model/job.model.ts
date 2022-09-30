import { IEmployee } from 'app/shared/model/employee.model';

export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  employees?: IEmployee[] | null;
}

export const defaultValue: Readonly<IJob> = {};

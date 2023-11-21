import {TimeLog} from 'types/models/time-log';

export interface ReportTemplateParams {
  title: string;
  fromDate: Date;
  toDate: Date;
  generatedDate: Date;
  generatedFor: string;
  logs: TimeLog[];
}

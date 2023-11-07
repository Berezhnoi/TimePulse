// Utils
import {uniqueId} from 'utils';

// Type
import {TimeLog} from 'types/models/time-log';

export class TimeLogDTO implements TimeLog {
  readonly id: string;
  readonly loggedTime: number;
  readonly loggedDate: number;
  readonly createdDate: number;
  readonly notes: string;

  /**
   * Create a new TimeLogDTO instance
   *
   * @param {number} loggedTime - The amount of time logged in hours.
   * @param {number} loggedDate - The date when the work was performed (timestamp in milliseconds).
   * @param {string} notes - Additional notes or comments for the log report.
   */
  constructor(loggedTime: number, loggedDate: number, notes: string) {
    this.id = uniqueId();
    this.createdDate = Date.now();

    this.loggedTime = loggedTime;
    this.loggedDate = loggedDate;
    this.notes = notes;
  }
}

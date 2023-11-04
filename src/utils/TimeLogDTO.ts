// Utils
import {uniqueId} from 'utils';

// Type
import {TimeLog} from 'types/models/time-log';

export class TimeLogDTO implements TimeLog {
  private readonly _id: string;
  private readonly _loggedTime: number;
  private readonly _loggedDate: number;
  private readonly _createdDate: number;
  private readonly _notes: string;

  /**
   * Create a new TimeLogDTO instance
   *
   * @param {number} loggedTime - The amount of time logged in hours.
   * @param {number} loggedDate - The date when the work was performed (timestamp in milliseconds).
   * @param {string} notes - Additional notes or comments for the log report.
   */
  constructor(loggedTime: number, loggedDate: number, notes: string) {
    this._id = uniqueId();
    this._createdDate = Date.now();

    this._loggedTime = loggedTime;
    this._loggedDate = loggedDate;
    this._notes = notes;
  }

  get id(): string {
    return this._id;
  }

  get loggedTime(): number {
    return this._loggedTime;
  }

  get loggedDate(): number {
    return this._loggedDate;
  }

  get createdDate(): number {
    return this._createdDate;
  }

  get notes(): string {
    return this._notes;
  }
}

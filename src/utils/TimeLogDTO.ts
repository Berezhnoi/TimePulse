// Utils
import {uniqueId} from 'utils';

// Type
import {TimeLog} from 'types/models/time-log';

export class TimeLogDTO implements TimeLog {
  readonly id: string;
  readonly fromTime: number;
  readonly toTime: number;
  readonly pause: number;
  readonly loggedDate: number;
  readonly createdDate: number;
  readonly notes: string;

  /**
   * Create a new TimeLogDTO instance.
   *
   * @param {number} fromTime - The starting time of the work in milliseconds since the epoch.
   * @param {number} toTime - The ending time of the work in milliseconds since the epoch.
   * @param {number} pause - The duration of the pause in milliseconds.
   * @param {number} loggedDate - The date when the work was performed (timestamp in milliseconds).
   * @param {string} notes - Additional notes or comments for the log entry.
   */
  constructor(fromTime: number, toTime: number, pause: number, loggedDate: number, notes: string) {
    // Generate a unique identifier for the time log entry
    this.id = uniqueId();

    // Set the creation date to the current timestamp
    this.createdDate = Date.now();

    // Assign values to class properties
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.pause = pause;
    this.loggedDate = loggedDate;
    this.notes = notes;
  }
}

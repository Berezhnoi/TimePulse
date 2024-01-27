export interface TimeLog {
  /**
   * unique identifier
   */
  id: string;

  /**
   * The starting time of the work in milliseconds since the epoch.
   */
  fromTime: number;

  /**
   * The ending time of the work in milliseconds since the epoch.
   */
  toTime: number;

  /**
   * The duration of the pause in milliseconds.
   */
  pause: number;

  /**
   * The date when the work was performed (timestamp in milliseconds).
   */
  loggedDate: number;

  /**
   * The date when the log report was created (timestamp in milliseconds).
   */
  createdDate: number;

  /**
   * Additional notes or comments for the log report.
   */
  notes: string;
}

export interface TimeLog {
  /**
   * unique identifier
   */
  id: string;

  /**
   * The amount of time logged in hours.
   */
  loggedTime: number;

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

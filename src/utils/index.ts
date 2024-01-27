import {TimeLog} from 'types/models/time-log';

export const isNumeric = (value: string | number): boolean => {
  if (typeof value !== 'string' && typeof value !== 'number') return false; // we only process strings and numbers
  return !isNaN(value as number) && !isNaN(parseFloat(value as string));
};

export const uniqueId = (): string => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

/**
 * Convert minutes to milliseconds.
 *
 * @param {number} minutes - The number of minutes to convert.
 * @returns {number} The equivalent time in milliseconds.
 */
export const minutesToMilliseconds = (minutes: number): number => {
  return minutes * 60 * 1000;
};

/**
 * Convert milliseconds to minutes.
 *
 * @param {number} milliseconds - The number of milliseconds to convert.
 * @returns {number} The equivalent time in minutes.
 */
export const millisecondsToMinutes = (milliseconds: number): number => {
  return milliseconds / (60 * 1000);
};

interface LogTime {
  hours: number;
  minutes: number;
}

/**
 * Calculate the time difference for a single time log.
 *
 * @param {TimeLog} log - The time log.
 * @param {boolean} subtractPause - Whether to subtract pause duration from the total time.
 * @returns {LogTime} The time difference in hours and minutes.
 */
export const calculateLogTime = (log: TimeLog, subtractPause: boolean = true): LogTime => {
  const {fromTime, toTime, pause} = log;

  // Calculate duration without pause by default
  let duration = toTime - fromTime;

  // Subtract pause if specified
  if (subtractPause) {
    duration -= pause;
  }

  // Convert duration to minutes
  const minutes = duration / (60 * 1000);

  // Convert total minutes to hours and remaining minutes
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  return {hours, minutes: remainingMinutes};
};

/**
 * Calculate the total time based on the provided array of time logs.
 *
 * @param {TimeLog[]} logs - The array of time logs.
 * @param {boolean} subtractPause - Whether to subtract pause duration from the total time.
 * @returns {TotalTime} The total time in hours and minutes.
 */
export const calculateTotalTime = (logs: TimeLog[], subtractPause: boolean = true): LogTime => {
  let totalMinutes = 0;

  logs.forEach(log => {
    const {hours, minutes} = calculateLogTime(log, subtractPause);

    totalMinutes += hours * 60 + minutes;
  });

  // Convert total minutes to hours and remaining minutes
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = Math.round(totalMinutes % 60);

  return {hours, minutes: remainingMinutes};
};

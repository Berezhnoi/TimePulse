import {SCREENS} from 'config/screens';

export type TimesheetStackParamsList = {
  [SCREENS.TimesheetMain]: undefined;
  [SCREENS.TimeLog]: undefined;
  [SCREENS.ViewLog]: {logId: string};
};

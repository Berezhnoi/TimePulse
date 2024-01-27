// Libs
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

// Types
import {RootState} from 'store';
import {TimeLog} from 'types/models/time-log';

export interface TimeLogsState {
  [userId: string]: {
    logs: TimeLog[];
  };
}

const initialState: TimeLogsState = {
  ['oksana']: {
    logs: [],
  },
};

const userSlice = createSlice({
  name: 'timeLogs',
  initialState,
  reducers: {
    addTimeLog: (state: TimeLogsState, action: PayloadAction<{userId: string; timeLog: TimeLog}>) => {
      const {userId, timeLog} = action.payload;

      // Check if the userId exists in the state
      if (!(userId in state)) {
        state[userId] = {logs: []};
      }

      state[userId].logs.push(timeLog);
    },

    editTimeLog: (state, action: PayloadAction<{userId: string; timeLog: Partial<TimeLog>}>) => {
      const {userId, timeLog} = action.payload;

      if (!timeLog.id) return state;

      // Check if the userId exists in the state
      if (!(userId in state)) return state;

      const logIndex: number = state[userId].logs.findIndex(log => log.id === timeLog.id);

      if (logIndex === -1) return state;

      state[userId].logs[logIndex] = {...state[userId].logs[logIndex], ...timeLog};
    },

    removeTimeLog: (state, action: PayloadAction<{userId: string; timeLogId: TimeLog['id']}>) => {
      const {userId, timeLogId} = action.payload;

      // Check if the userId exists in the state
      if (!(userId in state)) return state;

      const logIndex: number = state[userId].logs.findIndex(log => log.id === timeLogId);

      if (logIndex === -1) return state;

      // remove the time log
      state[userId].logs.splice(logIndex, 1);
    },
  },
});

export const {addTimeLog, editTimeLog, removeTimeLog} = userSlice.actions;

export const getUserTimeLogs = createSelector(
  (state: RootState) => (state.user.id ? state.timeLogs[state.user.id] : {}),
  (timeLogsState = {}): TimeLog[] => {
    return (timeLogsState as TimeLogsState[keyof TimeLogsState])?.logs || [];
  },
);

export const geLogById = createSelector(
  (state: RootState, logId: string) => ({
    logId,
    timeLogsState: state.user.id ? state.timeLogs[state.user.id]?.logs || [] : [],
  }),
  ({logId, timeLogsState}) => timeLogsState.find(log => log.id === logId),
);

export default userSlice;

// Libs
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

// Types
import {RootState} from 'store';
import {TimeLog} from 'types/models/time-log';

export const MOCK_DATA: TimeLog[] = [
  {
    createdDate: 1700604347766,
    id: 'lp8vx4s6vh4dhe0vn8',
    loggedDate: 1700524800000,
    loggedTime: 6,
    notes: 'I worked in the building, overseeing renovations',
  },
  {
    createdDate: 1700604361857,
    id: 'lp8vxfnldtvo790d4oe',
    loggedDate: 1700438400000,
    loggedTime: 8,
    notes: 'I managed tasks at the hotel, ensuring guest satisfaction ',
  },
  {
    createdDate: 1700604890987,
    id: 'lp8w8rxn6b4nfkuw69h',
    loggedDate: 1698796800000,
    loggedTime: 8,
    notes: 'I successfully completed my job, meeting all project deadlines',
  },
  {
    createdDate: 1700604908351,
    id: 'lp8w95bzkuvv6h7nopl',
    loggedDate: 1698883200000,
    loggedTime: 6,
    notes: 'I contributed to the team effort, fostering a positive work environment',
  },
  {createdDate: 1700604927971, id: 'lp8w9kgzrfccerxu17b', loggedDate: 1698969600000, loggedTime: 3, notes: 'Test app'},
  {
    createdDate: 1700604953262,
    id: 'lp8wa3zi8jezrf8zx7w',
    loggedDate: 1699228800000,
    loggedTime: 8,
    notes: 'Do my jom, I handled various assignments, demonstrating adaptability in my role',
  },
  {
    createdDate: 1700604978898,
    id: 'lp8wanrm485kefyv5x4',
    loggedDate: 1699315200000,
    loggedTime: 8,
    notes: 'Overtime, I dedicated extra hours to meet urgent project requirements ',
  },
  {createdDate: 1700604995317, id: 'lp8wb0fp2bwkvmcsb7', loggedDate: 1699401600000, loggedTime: 8, notes: ''},
  {
    createdDate: 1700605015498,
    id: 'lp8wbg0afqx4jw2fxa',
    loggedDate: 1699488000000,
    loggedTime: 12,
    notes: '12 ohhhhhhh',
  },
  {
    createdDate: 1700605049462,
    id: 'lp8wc67qbogu43zcajl',
    loggedDate: 1700092800000,
    loggedTime: 8,
    notes:
      'Demonstravi capabilitatem meam, I showcased my capabilities in managing unexpected situations effectively. ',
  },
  {
    createdDate: 1700605073171,
    id: 'lp8wcoibhkkl5ibddik',
    loggedDate: 1699574400000,
    loggedTime: 8,
    notes: 'Happy Friday ',
  },
  {
    createdDate: 1700605092012,
    id: 'lp8wd31obbs1lwiyc4q',
    loggedDate: 1699833600000,
    loggedTime: 2,
    notes:
      'Demonstravi capabilitatem meam, showcasing my expertise in delivering high-quality, durable structures that stood the test of time',
  },
  {createdDate: 1700605104791, id: 'lp8wdcwnanh3lod7exb', loggedDate: 1699920000000, loggedTime: 8, notes: ''},
  {
    createdDate: 1700605131459,
    id: 'lp8wdxhfm81b0r11rep',
    loggedDate: 1700006400000,
    loggedTime: 4,
    notes: 'I meticulously oversaw the framing and structural aspects of the building process',
  },
  {
    createdDate: 1700605172907,
    id: 'lp8wetgrsvfjid7r0xg',
    loggedDate: 1700179200000,
    loggedTime: 8,
    notes: ' I collaborated with architects to ensure precise execution of design plans ',
  },
  {
    createdDate: 1700605202914,
    id: 'lp8wfgmazqn4i2np0i',
    loggedDate: 1700524800000,
    loggedTime: 4,
    notes:
      'In labore edificio, I coordinated with subcontractors, managing the integration of electrical and plumbing systems',
  },
];

export interface TimeLogsState {
  [userId: string]: {
    logs: TimeLog[];
  };
}

const initialState: TimeLogsState = {
  ['oksana']: {
    logs: MOCK_DATA,
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

export default userSlice;

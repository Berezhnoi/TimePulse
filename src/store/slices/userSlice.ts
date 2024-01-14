// Libs
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Types
import {User} from 'types/models/user';

export interface UserState extends Partial<User> {
  /**
   * A flag indicating whether the user is authenticated.
   */
  isSignedIn: boolean;
}

const initialState: UserState = {
  isSignedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (__, action: PayloadAction<User>) => {
      return {...action.payload, isSignedIn: true};
    },

    updateUser: (userState: UserState, action: PayloadAction<Partial<UserState>>) => {
      return {...userState, ...action.payload};
    },

    logout(userState: UserState) {
      userState.isSignedIn = false;
    },

    setLanguage: (userState: UserState, action: PayloadAction<{language: string}>) => {
      userState.language = action.payload.language;
    },
  },
});

export const {login, updateUser, setLanguage, logout} = userSlice.actions;

export default userSlice;

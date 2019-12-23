import { createAction } from 'redux-actions';

export const USER = {
  LOGIN: {
    START: 'USER/LOGIN_START',
    SUCCESS: 'USER/LOGIN_SUCCESS',
    FAILURE: 'USER/LOGIN-FAILURE',
  },
  SET_ONLINE: {
    START: 'USER/SET_ONLINE/START',
    SUCCESS: 'USER/SET_ONLINE/SUCCESS',
    FAILURE: 'USER/SET_ONLINE/FAILURE',
  },
  SAVE_USERS: 'USER/SAVE_USERS',
  LOGOUT: {
   START: 'USER/LOGOUT/START',
   SUCCESS: 'USER/LOGOUT/SUCCESS',
   FAILURE: 'USER/LOGOUT/FAILURE',
  },
  SELECT_PEER_USER: 'USER/SELECT_PEER_USER',
  PEER_SET: 'USER/PEER_SET',
};

export const loginStart = createAction(USER.LOGIN.START);
export const logout = createAction(USER.LOGOUT.START);
export const saveUsers = createAction(USER.SAVE_USERS);
export const selectPeerUser = createAction(USER.SELECT_PEER_USER);

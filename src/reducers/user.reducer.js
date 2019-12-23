import {USER } from '../actions/auth.actions';

const initState = {
  id: '',
  nickname: '',
  photoUrl: '',
  status: 'offline',
};

export default function userReducer (state = initState, { type, payload }) {
  switch (type) {
    case USER.LOGIN.SUCCESS:
    {
      return {
        ...state,
        ...payload,
        status: 'online',
      };
    }
    case USER.LOGOUT.SUCCESS:
      return initState;
    default:
    {
      return state;
    }

  }
}

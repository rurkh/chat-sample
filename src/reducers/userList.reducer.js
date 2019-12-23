import { USER } from '../actions/auth.actions';

const initState = [];

export default function userListReducer(state = initState, { type, payload }) {
  switch (type) {
    case USER.SAVE_USERS:
    {
      return payload;
    }
    default:
    {
      return state;
    }
  }
}

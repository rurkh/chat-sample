import { USER } from '../actions/auth.actions';

const initState = {
  isLoading: false,
};

export default function appReducer(state = initState, { type }) {
  switch (type) {
    case USER.LOGIN.START:
    case USER.LOGIN.SUCCESS:
    case USER.LOGIN.FAILURE:
    {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    default:
    {
      return state;
    }
  }
};

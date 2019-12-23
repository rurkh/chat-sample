import { USER } from '../actions/auth.actions';
import { CHAT } from '../actions/chat.actions';

const initState = {
  peerUser: '',
  chatRoomId: '',
  messages: [],
};

export default function peerUserReducer(state = initState, { type, payload }) {
  switch (type) {
    case USER.PEER_SET:
    {
      return {
        ...state,
        chatRoomId: payload.chatRoomId,
        peerUser: payload.peerUserId,
      };
    }
    case CHAT.SAVE_MESSAGES:
    {
      return {
        ...state,
        messages: payload,
      }
    }
    default:
    {
      return state;
    }
  }
}

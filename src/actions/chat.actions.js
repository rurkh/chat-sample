import { createAction } from 'redux-actions';

export const CHAT = {
  SEND_MESSAGE: {
    START: 'CHAT/SEND_MESSAGE/START',
    SUCCESS: 'CHAT/SEND_MESSAGE/SUCCESS',
    FAILURE: 'CHAT/SEND_MESSAGE/FAILURE',
  },
  SAVE_MESSAGES: 'CHAT/SAVE_MESSAGES',
};

export const sendMessage = createAction(CHAT.SEND_MESSAGE.START);
export const saveMessages = createAction(CHAT.SAVE_MESSAGES);

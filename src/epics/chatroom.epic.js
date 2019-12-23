import { combineEpics, ofType } from 'redux-observable';
import { USER } from '../actions/auth.actions';
import { concatMap, switchMap } from 'rxjs/operators';
import { fireDB } from '../services/FirebaseService';
import firebaseConf from '../constants/firebase';
import { hashString } from '../utils/hashString';
import { CHAT } from '../actions/chat.actions';
import { showToast } from '../utils/toast';

const chatDataEpic = (action$, store) => action$.pipe(
  ofType(USER.SELECT_PEER_USER),
  switchMap(async (action)=> {
    const { payload } = action;
    let groupChatId = '';
    const { value: { user: { id: userId } } } = store;
    if (hashString(userId) <= hashString(payload)) {
      groupChatId = `${userId}-${payload}`;
    } else {
      groupChatId = `${payload}-${userId}`;
    }

    return {
      type: USER.PEER_SET,
      payload: { peerUserId: payload, chatRoomId: groupChatId }
    };
  })
);

const sendMessageEpic = (action$, store) => action$.pipe(
  ofType(CHAT.SEND_MESSAGE.START),
  concatMap(async action => {
    const { payload: message } = action;
    const { value: { peer: { chatRoomId } } } = store;
    let existedChatRoom;
    try {
      existedChatRoom = await fireDB.collection(firebaseConf.NODE_CHAT_ROOM).doc(chatRoomId).get();
    } catch(e) {
      showToast(0, 'unable to fetch chatroom');

      return {
        type: CHAT.SEND_MESSAGE.FAILURE,
        payload: e.message,
      };
    }

    if(!existedChatRoom.data()) {
      try {
        await fireDB.collection(firebaseConf.NODE_CHAT_ROOM).doc(chatRoomId).set({
          participants: [message.from, message.to],
        });
      } catch(e) {
        showToast(0, 'unable to set chatroom');

        return {
          type: CHAT.SEND_MESSAGE.FAILURE,
          payload: e.message,
        };
      }
    }

    try {
      await fireDB.collection(firebaseConf.NODE_MESSAGES).doc().set({ ...message, roomId: chatRoomId, read: false });
    } catch(e) {
      showToast(0, 'unable to send message');

      return {
        type: CHAT.SEND_MESSAGE.FAILURE,
        payload: e.message,
      };
    }

    return {
      type: CHAT.SEND_MESSAGE.SUCCESS,
    };
  })
);

export default combineEpics(chatDataEpic, sendMessageEpic);

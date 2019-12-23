import { combineEpics, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { USER } from '../actions/auth.actions';
import { fireDB } from '../services/FirebaseService';
import fireBaseConf from '../constants/firebase';

const getAllUsers = (action$, store) => action$.pipe(
  ofType(USER.LOGIN.SUCCESS),
  mergeMap(async () => {
    try {
      const { value: { user } } = store;
      const allUsers = await fireDB.collection(fireBaseConf.NODE_USERS).get();

      return {
        type: USER.SAVE_USERS,
        payload: [ ...allUsers.docs.map(doc => doc.data()).filter(item => item.id !== user.id)]
      };
    } catch(e) {}
  })
);

export default combineEpics(getAllUsers);

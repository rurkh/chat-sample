import { combineEpics, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { loginStart, USER } from '../actions/auth.actions';
import {fireDB, googleAuthProvider, initializedFirebase, realtimeDB} from '../services/FirebaseService';
import { showToast } from '../utils/toast';
import AppString from '../constants/firebase';

const loginEpic = action$ => action$.pipe(
  ofType(loginStart),
  mergeMap(() =>
    initializedFirebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(async ({ user }) => {
        if (!user) {
          showToast(0, 'User info not available');

          return {
            type: USER.LOGIN.FAILURE,
          };
        }

        const result = await fireDB
          .collection(AppString.NODE_USERS)
          .where(AppString.ID, '==', user.uid)
          .get();

        if (result.docs.length === 0) {
          try {
            await fireDB.collection(AppString.NODE_USERS)
              .doc(user.uid)
              .set({
                id: user.uid,
                nickname: user.displayName,
                photoUrl: user.photoURL,
                status: 'offline',
              });
            const addedUser = await fireDB.collection(AppString.NODE_USERS)
              .doc(user.uid)
              .get();
            return {
              type: USER.LOGIN.SUCCESS,
              payload: addedUser.data(),
            };
          } catch(e) {

            return {
              type: USER.LOGIN.FAILURE,
              payload: e,
            };
          }
        }

        return {
          type: USER.LOGIN.SUCCESS,
          payload: result.docs[0].data()
        };

      })
      .catch(err => {
       showToast(0, err.message);
        return {
          type: USER.LOGIN.FAILURE,
          payload: err.message
        };
      })
  )
);

const logoutEpic = (action$, store) => action$.pipe(
  ofType(USER.LOGOUT.START),
  mergeMap(async () => {
    try {
      const { value: { user: { id } } } = store;
      await initializedFirebase.auth().signOut();
      await realtimeDB.ref(`users/${id}`).set('offline');

      return {
        type: USER.LOGOUT.SUCCESS,
      };
    } catch(e) {

      return {
        type: USER.LOGOUT.FAILURE,
        payload: e.message,
      }
    }

  })
);

export default combineEpics(loginEpic, logoutEpic);

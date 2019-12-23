import { combineEpics, ofType } from 'redux-observable';
import { USER } from '../actions/auth.actions';
import { mapTo } from 'rxjs/operators';
import { push } from 'connected-react-router';

const redirectToMain = action$ => action$.pipe(
  ofType(USER.LOGIN.SUCCESS),
  mapTo(push('/' ))
);

export default combineEpics(redirectToMain);

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './app.reducer';
import userReducer from './user.reducer';
import userListReducer from './userList.reducer';
import peerUserReducer from './peerUser.reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  user: userReducer,
  userList: userListReducer,
  peer: peerUserReducer,
});

export default createRootReducer;

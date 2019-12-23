import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootEpic from '../epics';
import createRootReducer from '../reducers';
import initialState from '../constants/initialState';
import { createEpicMiddleware } from 'redux-observable';

export const history = createBrowserHistory();

export default function configureStore() {
  const epicMiddleWare = createEpicMiddleware();
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(createRootReducer(history), initialState, composeEnhancers(applyMiddleware(epicMiddleWare), applyMiddleware(routerMiddleware(history)))  );
  epicMiddleWare.run(rootEpic);

  return store;
};

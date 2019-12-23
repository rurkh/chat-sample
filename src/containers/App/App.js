import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from '../Main/Main';
import Login from '../../containers/Login';
import { logout } from '../../actions/auth.actions';
import PrivateRoute from '../../components/PrivateRoute';
import './App.css';

function App(props) {
  toast.configure({
    autoClose: 4000,
    draggable: false,
  });

  return (
    <BrowserRouter>
      {props.isLoggedIn && props.location === '/' && (<Redirect to={'/'} />)}
      {!props.isLoggedIn && props.location === '/' && (<Redirect to={'/login'} />)}
        <Switch>
          <PrivateRoute
            exact
            isLoggedIn={props.isLoggedIn}
            path="/"
          >
            <Main />
          </PrivateRoute>
          <Route
            exact
            path="/login"
            render={props => <Login {...props} />}
            />
        </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
 isLoggedIn: !!state.user.id,
 userId: state.user.id,
 location: state.router.location.pathname,
});

export default connect(mapStateToProps, {
  logout
})(App);

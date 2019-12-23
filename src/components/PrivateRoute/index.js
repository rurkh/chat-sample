import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PublicRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
}

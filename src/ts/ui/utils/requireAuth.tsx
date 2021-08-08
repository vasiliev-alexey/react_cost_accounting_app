import React, { ComponentType, FC } from 'react';
import { Redirect } from 'react-router-dom';

const withAuthentication =
  <P extends unknown>(Component: ComponentType<P>, isAuth: boolean): FC<P> =>
  (props) => {
    if (isAuth) {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
        }}
      />
    );
  };

export default withAuthentication;

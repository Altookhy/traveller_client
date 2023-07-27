import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const withNoAuth = (Component) => {
  const WithNoAuthComponent = (props) => {
    const { authData } = useContext(AuthContext);

    if (!authData || !authData.token) {
      return <Component {...props} />;
    }

    return <Navigate to="/" replace />;
  };

  WithNoAuthComponent.displayName = `WithNoAuth(${getDisplayName(Component)})`;

  return WithNoAuthComponent;
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withNoAuth;

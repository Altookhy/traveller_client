import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const withProtectedIfAdmin = (Component) => {
  return (props) => {
    const { authData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (authData) {
        setIsLoading(false);
      }
    }, [authData]);

    if (isLoading) {
      return <div>Loading...</div>; 
    }
    if (authData && authData.token && authData.user.role === 'admin') {
      return <Component {...props} />;
    }

    return <Navigate to="/SignIn" replace />;
  };
};

export default withProtectedIfAdmin;

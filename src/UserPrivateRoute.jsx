import React from 'react';
import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('userToken') && localStorage.getItem('userType') ? true : null;
  return auth ? children : <Navigate to="/" />;
};

export default UserPrivateRoute;
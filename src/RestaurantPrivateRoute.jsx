import React from 'react';
import { Navigate } from 'react-router-dom';

const RestaurantPrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('userToken') && localStorage.getItem('restaurantType') ? true : null;
  return auth ? children : <Navigate to="/" />;
};

export default RestaurantPrivateRoute;
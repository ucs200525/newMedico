// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, uid ,role } = useContext(AuthContext);
  if(!isLoggedIn){
    return <Navigate to="/login" />;
  }
  // Check if user is logged in and uid is verified
  if (!uid) {
    return <Navigate to="/verify-uid" />;
  }
 
  // Clone the element and pass the uid as a prop
  return React.cloneElement(element, { uid ,role }) ;
};

export default ProtectedRoute;

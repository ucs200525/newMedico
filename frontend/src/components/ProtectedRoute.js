// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const {  uid ,role } = useContext(AuthContext);

  // Check if user is logged in and uid is verified
  if (!uid) {
    return <Navigate to="/verify-uid" />;
  }
  
 
  // Clone the element and pass the uid as a prop
  return React.cloneElement(element, { uid ,role }) ;
};

export default ProtectedRoute;

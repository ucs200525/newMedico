// src/components/ValidateLogin.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ValidateLogin = ({ element }) => {
  const {isLoggedin,uid ,role} = useContext(AuthContext);

  // Check if user is logged in and uid is verified
  if (!isLoggedin) {
    return <Navigate to="/verify-uid" />;
  }
 
  return React.cloneElement(element, { uid ,role }) ;
};

export default ValidateLogin;
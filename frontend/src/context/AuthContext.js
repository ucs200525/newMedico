import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(''); // State for UID
  const [role, setRole] = useState(''); // State for Role from UserRoleSelection (corrected typo)

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setUid(localStorage.getItem('uid') || ''); // Retrieve UID from local storage
    setRole(localStorage.getItem('role') || ''); // Retrieve Role from local storage
  }, []);

  const login = () =>{
    setIsLoggedIn(true);
    setRole('admin')
    console.log("Auth admin")
  } 
  const userRole = ()=>{
    setIsLoggedIn(true);
    
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid'); // Remove UID from local storage
    localStorage.removeItem('role'); // Remove Role from local storage
    setIsLoggedIn(false);
    setUid(''); // Reset UID
    setRole(''); // Reset Role
  };

  const setUidContext = (newUid) => {
    setUid(newUid);
    localStorage.setItem('uid', newUid); // Store UID in local storage
  };

  const setRoleContext = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole); // Store Role in local storage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, uid, setUidContext, role, setRoleContext }}>
      {children}
    </AuthContext.Provider>
  );
};

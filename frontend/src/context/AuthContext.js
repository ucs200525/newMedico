import { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(localStorage.getItem('uid') || ''); // Retrieve UID from local storage
  const [role, setRole] = useState(localStorage.getItem('role') || ''); // Retrieve Role from local storage
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Retrieve Username from local storage
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Add token state

  useEffect(() => {
    // Check if token exists in local storage
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const login = (newToken, newRole, newUsername) => {
    setIsLoggedIn(true);
    setToken(newToken); // Set token
    setRole(newRole); // Set Role
    setUsername(newUsername); // Set Username
    localStorage.setItem('token', newToken); // Store token in local storage
    localStorage.setItem('role', newRole); // Store Role in local storage
    localStorage.setItem('username', newUsername); // Store Username in local storage
  };

  const LoginUserName = (name) =>{
    setUsername(name);
  };

  const loginUser = (newToken, newRole) =>{
    setIsLoggedIn(true);
    setToken(newToken); // Set token
    setRole(newRole); // Set Role
    localStorage.setItem('token', newToken); // Store token in local storage
    localStorage.setItem('role', newRole); // Store Role in local storage
  };

  const logout = () => {
    // Make a post request to the logout endpoint
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`)
      .then(response => {
        // You can handle the response if necessary
        console.log("Logout successful:", response.data);
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });

    // Clean up local storage and reset state
    localStorage.removeItem('token');
    localStorage.removeItem('uid'); // Remove UID from local storage
    localStorage.removeItem('role'); // Remove Role from local storage
    localStorage.removeItem('username'); // Remove Username from local storage
    setIsLoggedIn(false);
    setUid(''); // Reset UID
    setRole(''); // Reset Role
    setUsername(''); // Reset Username
    setToken(''); // Reset token
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
    <AuthContext.Provider value={{ isLoggedIn, login, loginUser, LoginUserName, username, logout, uid, setUidContext, role, setRoleContext, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

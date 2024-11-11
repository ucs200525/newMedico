import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(Cookies.get('uid') || ''); // Retrieve UID from cookies
  const [role, setRole] = useState(Cookies.get('role') || ''); // Retrieve Role from cookies
  const [username, setUsername] = useState(Cookies.get('username') || ''); // Retrieve Username from cookies
  const [token, setToken] = useState(Cookies.get('token') || ''); // Retrieve token from cookies

  useEffect(() => {
    // Check if token exists in cookies
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const login = (newToken, newRole, newUsername, newUid) => {
    setIsLoggedIn(true);
    setToken(newToken); // Set token
    setRole(newRole); // Set Role
    setUsername(newUsername); // Set Username
    setUid(newUid); // Set UID
    // Store token, role, username, and uid in cookies
    Cookies.set('token', newToken, { secure: true, sameSite: 'Strict' });
    Cookies.set('role', newRole, { secure: true, sameSite: 'Strict' });
    Cookies.set('username', newUsername, { secure: true, sameSite: 'Strict' });
    Cookies.set('uid', newUid, { secure: true, sameSite: 'Strict' });
  };

  const LoginUserName = (name) => {
    setUsername(name);
    Cookies.set('username', name, { secure: true, sameSite: 'Strict' });
  };

  const loginUser = (newToken,newRole) => {
    setIsLoggedIn(true);
    setRole(newRole); // Set Role
    setToken(newToken); // Set token
    Cookies.set('token', newToken, { secure: true, sameSite: 'Strict', expires: 7 });
    Cookies.set('role', newRole, { secure: true, sameSite: 'Strict' }); // Store Role in cookies
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

    // Clean up cookies and reset state
    Cookies.remove('token');
    Cookies.remove('uid');
    Cookies.remove('role');
    Cookies.remove('username');
    setIsLoggedIn(false);
    setUid(''); // Reset UID
    setRole(''); // Reset Role
    setUsername(''); // Reset Username
    setToken(''); // Reset token
  };

  const setUidContext = (newUid) => {
    setUid(newUid);
    Cookies.set('uid', newUid, { secure: true, sameSite: 'Strict' }); // Store UID in cookies
  };

  const setRoleContext = (newRole) => {
    setRole(newRole);
    Cookies.set('role', newRole, { secure: true, sameSite: 'Strict' }); // Store Role in cookies
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, loginUser, LoginUserName, username, logout, uid, setUidContext, role, setRoleContext, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

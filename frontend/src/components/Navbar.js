import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Ensure correct path
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, role, uid, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    if (uid) {
      navigate(path);
    } else {
      navigate('/verify-uid');
    }
  };

  return (
    <nav className="navbar">
      <header>
        <div className="container">
          <Link to="/" className="branding border">
            <h1 className="logo">MEDICO</h1>
            <p className="moto">Your Digital Key To Health</p>
          </Link>
          <ul className="nav-links">
            {isLoggedIn ? (
              <>
                {role === 'admin' ? (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboard')}>Dashboard</button></li>
                    <li><button onClick={() => handleNavigation('/prescriptions')}>Prescriptions</button></li>
                    <li><button onClick={() => handleNavigation('/reports')}>Reports</button></li>
                    <li><button onClick={() => navigate('/patients')}>Add Patients</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    <li><button>{username}</button></li>
                  </>
                ) : role === 'user' ? (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                    <li><button onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                    <li><button onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                ) : null}
              </>
            ) : (
              <>
                {uid ? (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                    <li><button onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                    <li><button onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

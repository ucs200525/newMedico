import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';
<<<<<<< HEAD

=======
>>>>>>> 6563bc3bc3b7f1518a408d2211b639e716788d33

const Navbar = () => {
  const { isLoggedIn, role, uid, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    // Check if UID is present before navigating
    if (uid) {
      navigate(path);
    } else {
      navigate('/verify-uid'); // Redirect to Verify UID page if UID is not set
    }
  };

  return (
    <div className="navbar">
      <div className="container">
<<<<<<< HEAD
        <h1 className="logo">MEDICO</h1>
        <p className="Moto">  Your Digital Key To Health</p>

=======
        <div className="branding">
        <h1 className="logo">MEDICO</h1>
        <p className="moto">Your Digital Key To Health</p>
        </div>
>>>>>>> 6563bc3bc3b7f1518a408d2211b639e716788d33
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
                </>
              ) : role === 'user' ? (
                <>
                  <li><button onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                  <li><button onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                  <li><button onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) :                <>
              <li><button onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
              <li><button onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
              <li><button onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>}
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const CustomNavbar = () => {
  const { isLoggedIn, role, uid, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For toggling the sidebar

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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.branding} onClick={handleLogout} >
          <h1 className={styles.logo}>MEDICO</h1>
          <p className={styles.moto}>Your Digital Key To Health</p>
        </Link>

        {/* Hamburger / Cross Button for Smaller Devices */}
        <div className={styles.menuIcon} onClick={toggleMenu}  style={{ color: 'white' }}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Sidebar for Smaller Devices */}
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.navLinks}>
            {isLoggedIn ? (
              <>
                {role === 'admin' ? (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboard')}>Dashboard</button></li>
                    <li><button onClick={() => handleNavigation('/prescriptions')}>Prescriptions</button></li>
                    <li><button onClick={() => handleNavigation('/reports')}>Reports</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                    <li><button onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                    <li><button onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                )}
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Navigation Links for Larger Devices */}
        <div className={styles.navbarLinks}>
          <ul>
            {isLoggedIn ? (
              <>
                {role === 'admin' ? (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboard')}>Dashboard</button></li>
                    <li><button onClick={() => handleNavigation('/prescriptions')}>Prescriptions</button></li>
                    <li><button onClick={() => handleNavigation('/reports')}>Reports</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><button onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                    <li><button onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                    <li><button onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                )}
              </>
            ) : (
              <>
                <li><Link to="/login"><button className={styles.loginRegisterButton}>Login</button></Link></li>
                <li><Link to="/register"><button className={styles.loginRegisterButton}>Register</button></Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isLoggedIn, role, uid, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    if (uid) {
      navigate(path);
      setSidebarOpen(false); // Close sidebar on navigation
    } else {
      navigate('/verify-uid');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.branding}>
          <h1 className={styles.logo}>MEDICO</h1>
          <p className={styles.moto}>Your Digital Key To Health</p>
        </Link>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
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
      </aside>
    </nav>
  );
};

export default Navbar;

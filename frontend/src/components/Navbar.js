import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Ensure correct path
import styles from './Navbar.module.css'; // Updated to import CSS module

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
    <nav className={styles.navbar}>
      <header>
        <div className={styles.container}>
          <Link to="/" className={`${styles.branding} ${styles.border}`}>
            <h1 className={styles.logo}>MEDICO</h1>
            <p className={styles.moto}>Your Digital Key To Health</p>
          </Link>
          <ul className={styles['nav-links']}>
            {isLoggedIn ? (
              <>
                {role === 'admin' ? (
                  <>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/dashboard')}>Dashboard</button></li>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/prescriptions')}>Prescriptions</button></li>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/reports')}>Reports</button></li>
                    <li><button className={styles.navButton} onClick={handleLogout}>Logout</button></li>
                  </>
                ) : role === 'user' ? (
                  <>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                    <li><button className={styles.navButton} onClick={handleLogout}>Logout</button></li>
                  </>
                ) : null}
              </>
            ) : (
              <>
                {uid ? (
                  <>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/dashboardUser')}>Dashboard User</button></li>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/PrescriptionsUser')}>Prescriptions User</button></li>
                    <li><button className={styles.navButton} onClick={() => handleNavigation('/ReportsUser')}>Reports User</button></li>
                    <li><button className={styles.navButton} onClick={handleLogout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className={styles.navLink}>Login</Link></li>
                    <li><Link to="/register" className={styles.navLink}>Register</Link></li>
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

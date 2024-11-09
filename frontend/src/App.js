// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import VerifyUid from './pages/VerifyUIDPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/DashboardPage';
import Patients from './pages/AddPatientsPage';
import Prescriptions from './pages/PrescriptionsPage';
import Reports from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserDataPage from './pages/UserDataPage';
import Health from "./pages/HealthPage";
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';

import DashboardUser from './pages/DashboardUser';
import PrescriptionsUser from './pages/PrescriptionsUser';
import ReportsUser from './pages/ReportsUser';

import ValidateLogin from './components/ValidateLogin';
import UserRoleSelection from './pages/UserRoleSelection';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/verify-uid" element={<VerifyUid />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-data" element={<UserDataPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/prescriptions" element={<ProtectedRoute element={<Prescriptions />} />} />
          <Route path="/reports" element={<ProtectedRoute element={<Reports />} />} />
          <Route path="/HealthPage" element={<Health/>} />
          


          <Route path="/main-page" element={<UserRoleSelection />} />


          <Route path="/dashboardUser" element={<ProtectedRoute element={<DashboardUser />} />} />
          <Route path="/ReportsUser" element={<ProtectedRoute element={<ReportsUser />} />} />
          <Route path="/PrescriptionsUser" element={<ProtectedRoute element={<PrescriptionsUser />} />} />
          <Route path="*" element={<Navigate to="/main-page" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

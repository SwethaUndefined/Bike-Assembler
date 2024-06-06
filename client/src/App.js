import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';  
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/adminDashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/bikes" />} />
        <Route path="/bikes" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} /> 
      </Routes>
    </Router>
  );
};

export default App;

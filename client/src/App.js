import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';  
import Dashboard from './pages/dashboard';
import AssemblyPage from './pages/assembly';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/assembly/:bike_id" element={<AssemblyPage />} />

    </Routes>
  </Router>
  );
};

export default App;

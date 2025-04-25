import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};


export default App;
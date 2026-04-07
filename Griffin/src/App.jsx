import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';

// This is the Gatekeeper component. 
// It wraps around any page you want to keep hidden from unauthenticated users.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('soc_token');
  
  if (!isAuthenticated) {
    // If no token is found, redirect them back to the root (Login) page
    return <Navigate to="/" replace />;
  }
  
  // If they have the token, render the requested page
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: The Authentication Screen */}
        <Route path="/" element={<Login />} />
        
        {/* Protected Route: The Main SOC Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback Route: If a user types a random URL (like /fakepage), send them to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
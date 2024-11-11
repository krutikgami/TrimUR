import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser == null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

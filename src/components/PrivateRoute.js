import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import your auth context

const PrivateRoute = ({ element }) => {
    const { user } = useAuth(); // Get user from context

    return user ? element : <Navigate to="/login" />; // Render the element if authenticated, else redirect
};

export default PrivateRoute;
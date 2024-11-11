import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import your auth context

const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useAuth(); // Get user from context

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/login" replace />} // Redirect to login if not authenticated
        />
    );
};

export default PrivateRoute;

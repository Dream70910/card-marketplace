import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import your auth context
import DialogConfirmation from './dialogs/DialogConfirmation';

const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth(); // Get user from context

    if (loading) {
        return <DialogConfirmation
            open={loading}
            onClose={() => { }}
            type="loading"
            title="Please wait"
            message="We are processing your booking request. Please wait and don’t close this page"
            buttonText="Cancel"
            onButtonClick={
                () => { }
            }
        />
    }

    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
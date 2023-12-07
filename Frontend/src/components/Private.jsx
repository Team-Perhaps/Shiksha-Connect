import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Private = () => {
    const { currentUser } = useAuth()
    const auth = currentUser? true : false;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default Private
import React from 'react'
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import Team from '../team/Team';
import Dashboard from './Developer';
import Admin from './Admin';
import { Navigate, Outlet } from 'react-router-dom';

function ConDashboard() 
{
    const { role, currentUser } = useAuth();
    const auth = currentUser? true : false;
    if(!currentUser)return(<Navigate to="/login" />);
    if(role == 'teacher')return(<Dashboard/>)
    if(role == 'localadmin')return(<Admin/>)
    if(role == 'currdev') return(<Dashboard/>)
    if(role == 'admin')return(<Admin/>)
    
}

export default ConDashboard
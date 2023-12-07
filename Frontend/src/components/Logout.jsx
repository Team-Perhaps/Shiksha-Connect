import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Logout() {
    const { logout } = useAuth()
    async function handleLogout() {
        try {
          await logout()
          return(<Navigate to="/login" />)
        } catch {
          console.log("Failed to logout")
        } 
      }
      handleLogout()
  return (
    
    <Navigate to="/login" />
  )
}

export default Logout
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const useAuth=()=>{
    const user=localStorage.getItem('loggedIn')
    if(user){
      return true
    } else {
      return false
    }
  }

const ProtectedRoutes = (props) => {
    const auth=useAuth()
    return (
        auth  ? <Outlet/>:<Navigate to="/" />  
    )
};

export default ProtectedRoutes;

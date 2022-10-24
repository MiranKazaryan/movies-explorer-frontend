import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({loggedIn}) => {
    return (
        loggedIn === false ? <Navigate to="/" /> : <Outlet/>
    )
};

export default ProtectedRoutes;
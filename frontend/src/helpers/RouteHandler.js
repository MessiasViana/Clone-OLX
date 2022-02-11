import React from "react";
import { isLogged } from "./authHandler";
import { Navigate } from "react-router-dom";


const RequireAuth = ({ children, ...rest }) => {
    let logged = isLogged();
    let authorized = (rest.private && !logged) ? false : true;

    if(authorized) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}

export default RequireAuth;
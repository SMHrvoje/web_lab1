import React from "react";
import {Nav} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import LogOut from "./LogOut.tsx";
import LogIn from "./LogIn.tsx";


const LoginSignOut = () =>{
    const {
        isAuthenticated,
    }=useAuth0()



    return(
        <>
            {isAuthenticated ? <LogOut/> : <LogIn/>}
        </>
    )
}

export default LoginSignOut
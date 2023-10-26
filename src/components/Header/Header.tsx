import React from 'react';
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import LoginSignOut from "../authComps/LoginSignOut.tsx";
import {useAuth0} from "@auth0/auth0-react";
import trophy from "./trophy.jpg"



const Header = () => {

    const{isAuthenticated} =useAuth0()


    return(
        <>
        <Navbar bg='success' data-bs-theme="dark" className="px-3 text-right" >

            <Navbar.Brand className="text-warning text-right">
                <NavLink href="/">
                    Tournament maker
                <img
                src={trophy}
                alt="logo"
                width="30"
                height="30"
                className="d-inline-block align-top mx-3"
                />
                </NavLink>
            </Navbar.Brand>
                <Container className="justify-content-end">
                    <Nav>
                        <LoginSignOut/>
                    </Nav>
                </Container>


        </Navbar>
        </>
    )
}

export default Header
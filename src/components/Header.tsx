import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import LoginSignOut from "./authComps/LoginSignOut.tsx";



const Header = () => {


    return(
        <>
        <Navbar bg='success' data-bs-theme="dark" className="px-3 text-right" >

            <Navbar.Brand className="text-warning text-right">
                Tournament maker
                <img
                src="public/trophy.jpg"
                alt="logo"
                width="30"
                height="30"
                className="d-inline-block align-top mx-3"
                />
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
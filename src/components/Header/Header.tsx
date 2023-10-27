import { Container, Navbar, NavLink} from "react-bootstrap";
import LoginSignOut from "../authComps/LoginSignOut.tsx";
import trophy from "./trophy.jpg"



const Header = () => {

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
                        <LoginSignOut/>
                </Container>


        </Navbar>
        </>
    )
}

export default Header
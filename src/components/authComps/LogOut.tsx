import {useAuth0} from "@auth0/auth0-react";
import {Button, Navbar} from "react-bootstrap";



const LogOut = () => {

    const {logout,user} = useAuth0()

    const logOutFunc = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }

    return (

        <>
            <Navbar.Brand className="d-none d-sm-block px-2 text-wrap  font-weight-bolder">
                {user?.email}
            </Navbar.Brand>
            <Button onClick={logOutFunc}>
                Log out
            </Button>
        </>

    )

}

export default LogOut
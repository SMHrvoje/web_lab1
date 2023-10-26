import {useAuth0} from "@auth0/auth0-react";
import {Button} from "react-bootstrap";



const LogIn = () => {

    const {loginWithRedirect} = useAuth0()

    const loginFunc = () => {
        loginWithRedirect()
    }

    return (

        <>
            <Button onClick={loginFunc}>
                Log in
            </Button>
        </>

    )

}

export default LogIn
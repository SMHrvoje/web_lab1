import React from 'react';
import CreateTournamentForm from "../components/CreateTournamentForm.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {Container} from "react-bootstrap";


const HomePage = () =>{

const {isAuthenticated}=useAuth0()

    return (
        <>
            {isAuthenticated ?   <CreateTournamentForm/>
            :
                <>
                <Container className="justify-content-center align-content-center">
                    <h2 className="justify-content-center align-content-center text-center">
                        Log in to create a tournament
                    </h2>
                </Container>
                </>
            }
        </>
    )
}

export default HomePage
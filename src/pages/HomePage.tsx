import React, {ReactNode, useState} from 'react';
import CreateTournamentForm from "../components/CreateTournamentForm.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../config/firebase.tsx";
import {useNavigate} from "react-router-dom";
import {Ttournament} from "./TournamentPage.tsx";




const HomePage = () =>{

const {isAuthenticated}=useAuth0()
    const [myTournaments,setMyTournaments] = useState<Ttournament[]>([])
    const navigate = useNavigate();
    const{user}=useAuth0()

    React.useEffect(()=>{

        const tournamentsRef=collection(db,"tournaments")


            const onlyMine=query(tournamentsRef,where("owner","==",`${user?.email}`))
            const unsubscribe = onSnapshot(onlyMine, (querySnapshot: any) => {
                    setMyTournaments(querySnapshot.docs.map((doc:any) =>({...doc.data(),id:doc.id} as Ttournament)))
            })


        return ()=>{
            unsubscribe()
        }
    },[])

    return (
        <>
            {isAuthenticated ?
                <Container>
                    <CreateTournamentForm/>
                    <Container className="text-center mt-4">
                        <h3>
                            My tournaments
                        </h3>
                    </Container>
                    <Row className="mt-5 mb-2">
                        {myTournaments.map((tournament):ReactNode=>{
                            return <Col xs="6" md="4" key={tournament.id} >
                                <Card className="bg-success-subtle text-center mb-5" onClick={()=>{
                                    navigate(`/tournament/${tournament.id}`)
                                }}>
                                    <Card.Title>
                                        {tournament.name}
                                    </Card.Title>
                                </Card>
                            </Col>
                        })}
                    </Row>
                </Container>
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
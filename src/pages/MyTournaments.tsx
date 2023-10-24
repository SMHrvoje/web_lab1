import React, {ReactNode, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {db} from "../config/firebase.tsx";
import {collection,getDocs,query,where} from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";


export type Ttournament ={
    id:string
    name:string,
    format:string,
    owner:string,
    players:string[]
    rounds:any
}

const MyTournaments = () => {

    const [myTournaments,setMyTournaments] = useState<Ttournament[]>([])
    const tournamentsRef=collection(db,"tournaments")
    const navigate = useNavigate();
    const{user}=useAuth0()

    React.useEffect(()=>{

        const getTournaments =async () => {
            const onlyMine=query(tournamentsRef,where("owner","==",`${user?.email}`))
            const data=await getDocs(onlyMine);
            setMyTournaments(data.docs.map((doc) =>({...doc.data(),id:doc.id} as Ttournament)))
        }
        getTournaments()
    },[])


    return (
        <>
            <Container className="mt-4">
                <Row>
                    {myTournaments.map((tournament):ReactNode=>{
                       return <Col xs="6" md="4" key={tournament.id}>
                            <Card className="bg-dark-subtle text-center" onClick={()=>{
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
        </>
    )
}

export default MyTournaments
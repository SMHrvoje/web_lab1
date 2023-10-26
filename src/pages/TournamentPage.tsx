import React, {ReactNode} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {doc, getDoc, collection, query,onSnapshot} from "firebase/firestore";
import {db} from "../config/firebase.tsx";
import Leaderboard from "../components/Leaderboard/Leaderboard.tsx";
import Match from "../components/Match/Match.tsx";

export type TRounds=Map<number,TMatch[]>
export type TMatch={
    id:string,
    player1:string,
    player2:string,
    score:string
    round:number
}
export type Ttournament={
    name:string,
    format:string,
    id:string,
    players:string[]
}

const TournamentPage = () =>{
    const {id} =useParams()
    const navigate=useNavigate()
    const [tournament,setTournament]=React.useState<Ttournament>()
    const [rounds,setRounds]=React.useState<TRounds>()



    React.useEffect(() => {
        const tournamentsRef = doc(db, "tournaments", id!)
        const getTournament = async () => {
            const data = await getDoc(tournamentsRef);
            const turnir = {...data.data(), id: data.id} as Ttournament
            setTournament(turnir)
            return turnir

        }
        const q = query(collection(db, `tournaments/${id}/matches`));
        const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
            const matchesGotten:TRounds=new Map<number, TMatch[]>()
            querySnapshot.forEach((doc:any) => {
                const gottenData:TMatch=({...doc.data(), id: doc.id} as TMatch);
                if (matchesGotten.has(gottenData.round)){
                    // @ts-ignore
                    (matchesGotten.get(gottenData.round)).push(gottenData)
                }
                else{
                    matchesGotten.set(gottenData.round,[gottenData])
                }
            });
            setRounds(matchesGotten)
        })


            const mainFunction = async () => {
                const tournament = await getTournament()
                setTournament(tournament)

            }
        mainFunction()

            return () => {
                unsubscribe()
            }


        }, [])


        return (
            <>
                <Container className="mt-4">
                    <Button onClick={() => {
                        navigate("/")
                    }}>
                        back
                    </Button>
                </Container>
                <Container className="text-center mb-5">
                    <h1 className="mt-1 text-uppercase">
                        {tournament?.name}
                    </h1>
                    <Row className="mt-5">

                           <Row>
                               <Col xs={4} lg={2}>
                                   <h5>Players:</h5>
                               </Col>
                               {tournament?.players?.map((player:string, index:number) => (
                               <Col xs={4} lg={2}>
                                   <span key={index}
                                         className="px-lg-5 py-lg-2 py-sm-1 px-sm-2 justify-content-center align-content-center  bg-success-subtle `` rounded-4 text-uppercase">{player}</span>

                               </Col>
                                 ))}
                           </Row>


                    </Row>
                    <Row className="mt-4"><h2>Rounds</h2></Row>
                    <Row className="mt-4">
                        {rounds && Array.from(rounds.keys()).map((round, index): ReactNode => (
                            <Col xs={12} lg={6}  key={index}>
                                <h5>{`Round ${round}`}</h5>
                                {rounds.get(round)?.map((match,index2) => (
                                    <Match tournamentId={id!} {...match} indeks={index2}  />
                                ))}
                            </Col>
                        ))}
                    </Row>
                    {tournament?.id && <Leaderboard tournamentId={id!} format={tournament!.format}
                                                    players={tournament!.players}
                                                    rounds={rounds!}
                    />
                    }
                </Container>
            </>
        )



}



export default TournamentPage
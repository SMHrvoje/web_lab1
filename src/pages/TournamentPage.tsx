import React, {ReactNode} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {doc, getDoc, collection, query,onSnapshot} from "firebase/firestore";
import {db} from "../config/firebase.tsx";
import Leaderboard from "../components/Leaderboard/Leaderboard.tsx";
import Match from "../components/Match/Match.tsx";
import {useAuth0} from "@auth0/auth0-react";
import copyPic from "../../public/7124212_copy_clipboard_icon.svg"
import {toast} from "react-toastify";

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
    players:string[],
    owner:string
}

type TournamentPageProps={
    change:boolean
}


const TournamentPage = ({change}:TournamentPageProps) =>{
    const {id} =useParams()
    const navigate=useNavigate()
    const [tournament,setTournament]=React.useState<Ttournament>()
    const [rounds,setRounds]=React.useState<TRounds>()
    const { user}=useAuth0()




    React.useEffect(() => {
        const tournamentsRef = doc(db, "tournaments", id!)
        const getTournament = async () => {
            const data = await getDoc(tournamentsRef);
            const turnir = {...data.data(), id: data.id} as Ttournament
            if(data.data()==undefined){
                navigate("/")
            }
            if ((change && user && user?.email!==turnir?.owner)){
                navigate("/")
            }
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


        if((change && user && user?.email===tournament?.owner) || (!change)) return (
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
                    {(user && user?.email===tournament?.owner) &&
                        <Row className="justify-content-center align-content-center">
                            <a>
                                <span>
                                    {
                                        window.location.href.split("/").slice(0,3).concat(["onlyView"]).concat(window.location.href.split("/").slice(4,5)).join("/")
                                    }
                                </span>
                                <img className="mx-2" alt="copy" src={copyPic} onClick={() => {navigator.clipboard.writeText(window.location.href.split("/").slice(0,3).concat(["onlyView"]).concat(window.location.href.split("/").slice(4,5)).join("/")
                                )
                                toast.success("Copied to clipboard")
                                }}/>
                            </a>
                        </Row>
                    }
                    <Row className="mt-5">


                               <Col xs={4} lg={2} className="my-2">
                                   <h5>Players:</h5>
                               </Col>
                               {tournament?.players?.map((player:string, index:number) => (
                               <Col xs={4} lg={2} className="my-2 text-center justify-content-center align-content-center">
                                   <span key={index}
                                         className="px-lg-5 py-lg-2 py-sm-1 px-sm-2 justify-content-center align-content-center  bg-success-subtle rounded-4 text-uppercase">{player}</span>

                               </Col>
                                 ))}



                    </Row>
                    <Row className="mt-4"><h2>Rounds</h2></Row>
                    <Row className="mt-4">
                        {rounds && Array.from(rounds.keys()).sort((a,b)=>a-b).map((round, index): ReactNode => (
                            <Col xs={12} lg={6}  key={index}>
                                <h5>{`Round ${round}`}</h5>
                                {rounds.get(round)?.map((match,index2) => (
                                    <Match tournamentId={id!} {...match} indeks={index2} change={change}  />
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
import React, {ReactNode} from 'react';
import {Col, Container, Row, Stack} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {doc, getDoc, collection,getDocs} from "firebase/firestore";
import {db} from "../config/firebase.tsx";
import {Ttournament} from "./MyTournaments.tsx";
import TournamentRound from "../components/TournamentRounds/TournamentRound.tsx";
import Leaderboard from "../components/Leaderboard/Leaderboard.tsx";

type Round ={
    id:string,
    roundNumber:number
}

const TournamentPage = () =>{
    const {id} =useParams()
    const [tournament,setTournament]=React.useState<Ttournament>()
    const [rounds,setRounds]=React.useState<Round[]>()



    React.useEffect(() =>{
        const tournamentsRef=doc(db,"tournaments",id!)
        const getTournament =async () => {
            const data=await getDoc(tournamentsRef);
           // console.log(data.data())
            setTournament({...data.data(),id:data.id} as Ttournament)
            const roundsRef=collection(db,`tournaments/${data.id}/rounds`)
            const rounds= await getDocs(roundsRef)
            const roundsparsed=rounds.docs.map((doc) =>({...doc.data(),id:doc.id} as Round))
            //console.log(roundsparsed)
            setRounds(roundsparsed.sort((a:Round,b:Round)=>a.roundNumber-b.roundNumber))
        }
        getTournament()
    },[])


       return(
           <>
               <Container className="text-center mb-5">
                   <h1 className="mt-3 text-uppercase">
                       {tournament?.name}
                   </h1>
                   <Row className="mt-5">
                       <Stack direction="horizontal" gap={3} className="justify-content-evenly text-center mt-">
                           <h5>Players:</h5>{tournament?.players?.map((player,index)=>(
                           <span key={index} className="justify-content-center align-content-center  bg-success-subtle px-5 rounded-4 text-uppercase">{player}</span>
                       ))}
                       </Stack>

                   </Row>
                   <Row className="mt-4"><h2>Rounds</h2></Row>
                   <Row className="mt-4">
                       {rounds && rounds?.map((round,index):ReactNode=>(
                           <Col xs={6} key={index}>
                               <h5>{`Round ${round.roundNumber}`}</h5>
                               <TournamentRound tournamentId={tournament!.id} roundId={round.id}/>
                           </Col>
                       ))}
                   </Row>
                   {tournament?.id &&  <Leaderboard tournamentId={tournament!.id} format={tournament!.format}  players={tournament!.players}/>
                   }
               </Container>
           </>
       )



}


export default TournamentPage
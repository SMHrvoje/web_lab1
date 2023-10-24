import React from 'react';
import {collection, getDoc, getDocs, query, where} from "firebase/firestore"
import {Ttournament} from "../../pages/MyTournaments.tsx";
import {db} from "../../config/firebase.tsx";
import {Row, Stack} from "react-bootstrap";
import Match from "../Match/Match.tsx";
type reference={
    tournamentId:string,
    roundId:string
}
export type TMatch={
    id:string,
    player1:string,
    player2:string,
    score:string
}
const TournamentRound = ({tournamentId,roundId}:reference)=> {

    const [matches,setMatches]=React.useState<TMatch[]>()
    React.useEffect(()=>{
        const getMatches =async () => {
            const matchesRef=collection(db,`tournaments/${tournamentId}/rounds/${roundId}/matches`)
            const data= await getDocs(matchesRef)
            const matchesParsed=data.docs.map((doc)=>(
                {...doc.data(),id:doc.id} as TMatch
            ))
            //console.log(matchesParsed)
            setMatches(matchesParsed)
            }
        getMatches()
    },[])

    return (
        <>
            {matches && matches?.map((match,index)=>{
                return (

                       <Match {...match} tournamentId={tournamentId} roundId={roundId} />

                )
            })}
        </>
    )
}

export default TournamentRound
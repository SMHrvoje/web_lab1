import React, {ReactNode} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";

import {makeLeaderboard, TLeaderBoard, TLeaderboardTable} from "../../algorithms/MatchesHandling.ts";
import {TRounds} from "../../pages/TournamentPage.tsx";


type TLeaderboardProps={
    tournamentId:string,
    format:string,
    players:string[]
    rounds: TRounds
}
export type TMatch={
    id:string,
    player1:string,
    player2:string,
    score:string
    round:number
}


const Leaderboard = ({rounds,format,players}:TLeaderboardProps) => {

    const [leaderboard,setLeaderboard]=React.useState<TLeaderBoard>()

    React.useEffect( () => {

        const data:TLeaderBoard=makeLeaderboard(players,rounds,format)
        setLeaderboard(data)
        }

    ,[rounds,players,format])


    return (
        <>
        <Container className="mt-4 w-75 justify-content-center align-content-center">
            <Row>
                <h2 className="border-bottom border-2 w-100">
                    Leaderboard
                </h2>
            </Row>

            <Table className="w-100 m-auto">
                <thead>
                <tr>
                    <th>player</th>
                    <th>wins</th>
                    <th>draws</th>
                    <th>losses</th>
                    <th>score</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard && Array.from(leaderboard.entries()).map((p,index)=>(

                    <tr key={index} >
                       <td>{p[0]}</td>
                       <td>{p[1].get("wins")}</td>
                       <td>{p[1].get("draws")}</td>
                       <td id="lose">{p[1].get("losses")}</td>
                       <td id="score" className="border-bottom border-primary">{p[1].get("score")}</td>
                    </tr>

                ))
                }
                </tbody>
            </Table>

        </Container>

        </>
    )
}


export default Leaderboard
import React, {ReactNode} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase.tsx";


type TLeaderboard={
    tournamentId:string,
    format:string,
    players:string[]
}
type TMatch={
    id:string,
    player1:string,
    player2:string,
    score:string
}


const Leaderboard = ({tournamentId,format,players}:TLeaderboard) => {

    const [matches,setMatches]=React.useState<TMatch[] | []>([])
    const [tournamentFormat,setTournamentFormat]=React.useState({
        win:0,
        draw:0,
        lose:0
    })
    const [leaderboard,setLeaderboard]=React.useState({items:new Map()})

    React.useEffect( () => {

            const formatFormat = format.split("/")
            setTournamentFormat({
                win: parseFloat(formatFormat[0]),
                draw: parseFloat(formatFormat[1]),
                lose: parseFloat(formatFormat[2])
            })


            const makeLeaderboard = (polje) => {
                const tempMap: Map<string, number> = new Map()
                const formats= {
                    win: parseFloat(formatFormat[0]),
                    draw: parseFloat(formatFormat[1]),
                    lose: parseFloat(formatFormat[2])
                }
                console.log(formats)
                for (const player3 of players) {
                    tempMap.set(player3, 0)
                }

                for (const match of polje) {

                    const parsedScore = match.score.split(":")
                    console.log(parsedScore)
                    if (parseFloat(parsedScore[0]) == -1 || parseFloat(parsedScore[1]) == -1 || match.score==="") continue
                    if (parsedScore[0] > parsedScore[1]) {
                        tempMap.set(match.player1, tempMap.get(match.player1) + formats.win)
                        tempMap.set(match.player2, tempMap.get(match.player2) + formats.lose)

                    } else if (parsedScore[0] === parsedScore[1]) {
                        tempMap.set(match.player1, tempMap.get(match.player1) + formats.draw)
                        tempMap.set(match.player2, tempMap.get(match.player2) + formats.draw)

                    } else {
                        tempMap.set(match.player1, tempMap.get(match.player1) + formats.lose)
                        tempMap.set(match.player2, tempMap.get(match.player2) + formats.win)

                    }
                }
                setLeaderboard({items: tempMap})
            }
            const getMatches = async () => {
                const matchArray: TMatch[] = []
                const rounds = (await getDocs(collection(db, `tournaments/${tournamentId}/rounds`))).docs
                for (const snap of rounds) {
                    const matches = (await getDocs(collection(db, `tournaments/${tournamentId}/rounds/${snap.id}/matches`)))
                    matches.docs.forEach((doc) => {
                        matchArray.push(doc.data() as TMatch)
                    })

                }
                setMatches((matches) => (
                    [
                        ...matches,
                        ...matchArray
                    ]
                ))
                return matchArray
            }

            const mainFunction=async ()=>{
                const data1=await getMatches()
                makeLeaderboard(data1)
            }
            mainFunction()
            console.log(leaderboard)

        }

    ,[])


    return (
        <>
        <Container className="w-50 mt-4">
            <Row>
                <h2>
                    Leaderboard
                </h2>
            </Row>

            {leaderboard.items && Array.from(leaderboard.items, ([name, value]) => ({ name, value })).sort((a,b)=>b.value-a.value).map((p)=>(
                <>
                <Row>
                    <Col  xs={6}><Container className="text-center border-2 border-warning">{p.name}</Container></Col>
                    <Col  xs={6}><Container>{p.value}</Container></Col>
                </Row>
                </>
            ))
            }

        </Container>

        </>
    )
}


export default Leaderboard
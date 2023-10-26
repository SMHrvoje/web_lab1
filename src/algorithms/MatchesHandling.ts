import {TRounds} from "../pages/TournamentPage.tsx";


export type TMatchFormat={
    win:number,
    draw:number,
    lose:number,
}
type TPlayerStats=Map<string,number>
export type TLeaderBoard=Map<string,TPlayerStats>

const parseFormat =(format:string)=> {
    const splitedFormat=format.split("/")
    return {
        win: parseFloat(splitedFormat[0]),
        draw: parseFloat(splitedFormat[1]),
        lose: parseFloat(splitedFormat[2])
    } as TMatchFormat
}

const LeaderboardCompator = (a:TPlayerStats,b:TPlayerStats):number=>{
   if(a.get("score")===b.get("score")){
    // @ts-ignore
       return b.get("wins")- a.get("wins")
   }
   else { // @ts-ignore
       return b.get("score")-a.get("score")
   }
}


export const makeLeaderboard = (players : string[],rounds:TRounds,format:string) => {
    const parsedFormat:TMatchFormat=parseFormat(format)
    const tempMap: TLeaderBoard = new Map<string,TPlayerStats>()
    for(let player of players){
        tempMap.set(player,new Map<string, number>([["wins",0],["draws",0],["losses",0],["score",0]]))
    }
    Array.from(rounds.values()).forEach((round) => {
        round.forEach((match) => {
            if (match.score !== ":") {
                const parsedScore = match.score.split(":")
                //if (parseFloat(parsedScore[0]) == -1 || parseFloat(parsedScore[1]) == -1 || match.score === "") continue
                if (parseFloat(parsedScore[0]) > parseFloat(parsedScore[1])) {
                    tempMap.get(match.player1)?.set("wins", tempMap.get(match.player1)?.get("wins")! + 1)
                    tempMap.get(match.player2)?.set("losses", tempMap.get(match.player2)?.get("losses")! + 1)
                    tempMap.get(match.player1)?.set("score", tempMap.get(match.player1)?.get("score")! + parsedFormat.win)
                    tempMap.get(match.player2)?.set("score", tempMap.get(match.player2)?.get("score")! + parsedFormat.lose)

                } else if (parseFloat(parsedScore[0]) === parseFloat(parsedScore[1])) {
                    tempMap.get(match.player1)?.set("draws", tempMap.get(match.player1)?.get("draws")! + 1)
                    tempMap.get(match.player2)?.set("draws", tempMap.get(match.player2)?.get("draws")! + 1)
                    tempMap.get(match.player1)?.set("score", tempMap.get(match.player1)?.get("score")! + parsedFormat.draw)
                    tempMap.get(match.player2)?.set("score", tempMap.get(match.player2)?.get("score")! + parsedFormat.draw)


                } else {
                    tempMap.get(match.player1)?.set("losses", tempMap.get(match.player1)?.get("losses")! + 1)
                    tempMap.get(match.player2)?.set("wins", tempMap.get(match.player2)?.get("wins")! + 1)
                    tempMap.get(match.player1)?.set("score", tempMap.get(match.player1)?.get("score")! + parsedFormat.lose)
                    tempMap.get(match.player2)?.set("score", tempMap.get(match.player2)?.get("score")! + parsedFormat.win)

                }
            }
        })
    })
    return new Map([...tempMap.entries()].sort((a,b)=>LeaderboardCompator(a[1],b[1])))

}





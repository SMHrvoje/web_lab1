import robin from 'roundrobin'


export const getRounds = (players: string[]) =>{
    return robin(players.length,players)
}
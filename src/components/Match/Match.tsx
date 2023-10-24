import React from 'react';
import {TMatch} from "../TournamentRounds/TournamentRound.tsx";
import {Stack, Form, Button} from "react-bootstrap";
import {useForm,SubmitHandler} from "react-hook-form";
import {updateDoc,doc} from "firebase/firestore"
import {db} from "../../config/firebase.tsx";

type MatchProps={
    tournamentId:string,
    roundId:string,
    id:string

}
type TScore={
    value1:number | string,
    value2:number | string
}

const Match = ({tournamentId,roundId,id,player1,player2,score}:MatchProps & TMatch) => {
            const {register,reset,handleSubmit,formState:{errors},setError}=useForm<TScore>(
                {
                    defaultValues:{
                        value1:score==="" ? "" : parseFloat(score.split(":")[0]),
                        value2:score==="" ? "" : parseFloat(score.split(":")[1]),

                    }
                }
            )
            const [editing,setEditing]=React.useState<boolean>(false)

    const checkValue= (value) =>{
                if (isNaN(parseFloat(value))) return false
        const newValue=parseFloat(value)
        return newValue >= 0;


    }
    const onSubmit:SubmitHandler<TScore>=async (data) => {
                const bool1=checkValue(data.value1)
               const bool2= checkValue(data.value2)
             if(!bool1) setError("value1",{type:"custom",message:"value 1 isnt valid"})
        if(!bool2) setError("value2",{type:"custom",message:"value 1 isnt valid"})
        const docRef= doc(db,`tournaments/${tournamentId}/rounds/${roundId}/matches/${id}`)

        await updateDoc(docRef,{
            score: data.value1+":"+data.value2
        })

        setEditing(false)
    }




    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="my-2">
            <Stack direction="horizontal" >

                   <span  className="justify-content-center align-content-center  bg-success-subtle px-2 rounded-4 text-uppercase">{player1}</span>
                   <span className="px-2">v</span>
                   <span  className="justify-content-center align-content-center  bg-success-subtle px-2 rounded-4 text-uppercase">{player2}</span>
                   <span className="px-2">=</span>
                   <Form.Control className={errors.value1 && "border-warning"} {...register("value1")} disabled={!editing}/>
                    <span className="px-2">:</span>
                   <Form.Control className={errors.value2 && "border-warning"} {...register("value2")} disabled={!editing}/>
                {editing ? <>  <Button type="submit" className="mx-1">save</Button>
                    <Button
                    onClick={()=>{
                        reset()
                        setEditing(false)
                    }}
                    >reset</Button>
                </> :
                <Button onClick={()=>{
                    setEditing(true)
                }}
                className="mx-1"
                >Edit</Button>
                }

            </Stack>
            </form>
        </>
    )
}

export default Match
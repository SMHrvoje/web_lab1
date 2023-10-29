import React from 'react';
import {Stack, Form, Button, Row, Col} from "react-bootstrap";
import {useForm,SubmitHandler} from "react-hook-form";
import {updateDoc,doc} from "firebase/firestore"
import {db} from "../../config/firebase.tsx";
import {TMatch} from "../Leaderboard/Leaderboard.tsx";

type MatchProps={
    tournamentId:string,
    indeks:number,
    change:boolean

}
type TScore={
    value1: string,
    value2:  string
}

const checkValue= (value: string)  =>{
    if (!isNumeric(value)) {
        console.log("nije")
        return false
    }
    const newValue=parseFloat(value)
    return newValue >= 0;


}
function isNumeric(str:string):boolean {
    // @ts-ignore
    if(!isNaN(str) &&
        !isNaN(parseFloat(str))){
        const val=parseFloat(str)
        if (val>999 ||(val.toString().split(".").length>1 && val.toString().split(".")[1].length>2)){
            return false
        }
        else return true
    }
    else return false
}

const Match = ({tournamentId,id,player1,player2,score,indeks,change}:MatchProps & TMatch) => {
            const {register,reset,handleSubmit,formState:{errors},setError}=useForm<TScore>(
                {
                    defaultValues:React.useMemo(()=>{
                        return {
                            value1:score===":" ? "" : score.split(":")[0],
                            value2:score===":" ? "" : score.split(":")[1],

                        }
                    },[score])
                }
            )
            const [editing,setEditing]=React.useState<boolean>(false)


    React.useEffect(()=>{
        reset({
            value1:score===":" ? "" : score.split(":")[0],
            value2:score===":" ? "" : score.split(":")[1],

        })
    },[score])


    const onSubmit:SubmitHandler<TScore>=async (data) => {
                console.log(data)
                const bool1=checkValue(data.value1)
               const bool2= checkValue(data.value2)
             if(!bool1) setError("value1",{type:"custom",message:"value 1 isnt valid"})
            if(!bool2) setError("value2",{type:"custom",message:"value 2 isnt valid"})
        if(bool1 && bool2) {
            const docRef= doc(db,`tournaments/${tournamentId}/matches/${id}`)

          await updateDoc(docRef,{
                score: data.value1+":"+data.value2
            })


            setEditing(false)
        }
    }
    const clearScores=async ()=>{
        if(window.confirm("Are you sure you want to clear this score?")){
            const docRef= doc(db,`tournaments/${tournamentId}/matches/${id}`)

            await updateDoc(docRef,{
                score: ":"
            })
            reset()
        }
    }




    return(

            <form onSubmit={handleSubmit(onSubmit)} className="my-2" key={indeks!}>
                <Row className="justify-content-center">
                    <Col xxs={12} sm={10} md={4} lg={5} xl={4} className=" d-table-cell align-middle py-1">
                        <span  className=" justify-content-center align-content-center  bg-success-subtle px-2 rounded-4 text-uppercase mx-2">{`${player1}`}</span>
                        <span  className="justify-content-center align-content-center  bg-success-subtle px-2 rounded-4 text-uppercase">{`${player2}`}</span>
                    </Col>
                    <Col xxs={6} sm={6} md={4} lg={3} xl={4}>
                    <Stack direction="horizontal" gap={1}>
                        <Form.Control className={errors.value1 && "border-warning"} {...register("value1")} disabled={!editing}/>
                        <Form.Control className={errors.value2 && "border-warning"} {...register("value2")} disabled={!editing}/>

                    </Stack>
                    </Col>
                    {change && <>
                        {editing ? <Col xs={12} lg={4} className="mt-1">  <Button type="submit" className="mx-1">save</Button>
                                <Button
                                    onClick={()=>{
                                        reset()
                                        setEditing(false)
                                    }}
                                >undo</Button>
                            </Col> :
                            <Col xs={12} lg={4} className="mt-1">
                                <Button onClick={()=>{
                                    setEditing(true)
                                }}
                                        className="mx-1"
                                >Edit</Button>
                                <Button onClick={clearScores}>
                                    clear
                                </Button>
                            </Col>

                        }
                    </>}
                </Row>
            </form>

    )
}

export default Match
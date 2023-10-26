import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useForm,SubmitHandler} from "react-hook-form";
import {addDoc,doc,collection} from "firebase/firestore"
import {db} from "../config/firebase.tsx";
import {getRounds} from "../algorithms/roundRobin/RoundRobin.ts";
import {useAuth0} from "@auth0/auth0-react";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import {toast} from "react-toastify";

type TNewTournamentData={
    name:string,
    format:string,
    members:string
}

const TournamentForm = () => {

    const {register,
            handleSubmit,
        setError,
        formState:{
        errors
        },
        reset
            }=useForm<TNewTournamentData>({
        defaultValues:{
            name:"",
            format:"",
            members:""
        }})
    const {user}=useAuth0()

    const submitData :SubmitHandler<TNewTournamentData> =async (data) => {
      const checkingMembers=checkMembers(data.members)
        if (checkFormat(data.format) && Array.isArray(checkingMembers) && checkingMembers.length>0){
            const players=checkMembers(data.members)
            const docRef = await addDoc(collection(db, "tournaments"), {
                name:data.name,
                format:data.format,
                players: players,
                owner: user.email
            });
            await createRoundsAndMatches(docRef.id,players)
            toast.success("You have successfully created a tournament")
            reset()
        }
        else return

    }

    const createRoundsAndMatches = async (tournamentId:string,members) => {
        const players=getRounds(members)
        console.log(players)
        for(let i = 0; i < players.length; i++) {
            for(let j = 0; j < players[i].length;j++){
               await addDoc(collection(db,`tournaments/${tournamentId}/matches`), {
                   player1: players[i][j][0],
                   player2: players[i][j][1],
                   score : ":",
                   round: i+1
               })
            }
        }
    }

    const checkFormat = (format:string) => {

        const parsedFormat:string[]=format.split("/")
        let checksOut=true
        if (parsedFormat.length===3){
               parsedFormat.forEach((broj)=>{
                  const brojcek=parseFloat(broj)
                   if (isNaN(brojcek)){
                       checksOut=false
                       setError("format", { type: 'custom', message: 'Format is not in valid format' })
                   }
               })
            return checksOut
        }
        else {
            setError("format", { type: 'custom', message: 'Format is not in valid format' })
            return false
        }

    }

    const checkMembers = (members:string) => {

        let clanovi:string[]=[]

        if (members.split(";").length>=4 && members.split(";").length<=8){
            clanovi=members.split(";")
        }
        else if(members.split("\n").length>=4 && members.split("\n").length<=8){
            clanovi=members.split("\n")
        }
        else{
            setError("members",{type:"custom",message:"Player count is not alright or they arent separated as they should be"})
            return false
        }

        if (new Set(clanovi).size==clanovi.length) return clanovi
        else{
            setError("members",{type:"custom",message:"Cannot repeat players"})
            return false
        }
    }

    return(
        <>
            <Container className="mt-4">
               <Card>
                   <Card.Header className="text-bg-success">
                       <h2 className="text-center">Create a tournament</h2>
                   </Card.Header>
                   <Card.Body>
                       <Form onSubmit={handleSubmit(submitData)}>
                           <Row className="mb-2 ">
                               <Form.Group as={Col} controlId="formTournamentName" >
                                   <Form.Label>Tournament name</Form.Label>
                                   <Form.Control className={errors.name && "border-warning"} {...register("name", { required: true })}  type="text" placeholder="Enter tournament name"/>
                                   <Form.Text>name for your tournament</Form.Text>
                               </Form.Group>
                               <Form.Group as={Col} controlId="formTournamentFormat" >
                                   <Form.Label>Tournament format</Form.Label>
                                   <Form.Control className={errors.format && "border-warning"} {...register("format", { required: true })}  type="text" placeholder="Enter tournament format"/>
                                   <Form.Text>format like 3/1/0 (win/draw/lose)</Form.Text>
                               </Form.Group>
                           </Row>
                           <Row>
                               <Form.Group controlId="formTournamentMembers" >
                                   <Form.Label>Tournament members</Form.Label>
                                   <Form.Control className={errors.members && "border-warning"} {...register("members", { required: true })} as="textarea" rows={3} placeholder="John;Jack..." />
                                   <Form.Text>4-8 members separated with a semicolon(;) or a new row(\n)</Form.Text>
                               </Form.Group>
                           </Row>
                           <Row className="justify-content-center mt-3">
                               <Button type="submit" className="w-25">
                                   CREATE
                               </Button>
                           </Row>

                       </Form>
                   </Card.Body>
               </Card>
            </Container>
        </>
    )
}

export default TournamentForm
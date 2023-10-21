import React from "react";
import { Col, Container, Form, Row} from "react-bootstrap";
import {useForm,SubmitHandler} from "react-hook-form";



const TournamentForm = () => {

    const {register}=useForm()


    return(
        <>
            <Container className="mt-4">
                <h2 className="text-center">Create a tournament</h2>
                <Form>
                   <Row className="mb-2">
                       <Form.Group as={Col} controlId="formTournamentName" >
                           <Form.Label>Tournament name</Form.Label>
                           <Form.Control  type="text" placeholder="Enter tournament name"/>
                       </Form.Group>
                       <Form.Group as={Col} controlId="formTournamentPoints" >
                           <Form.Label>Tournament name</Form.Label>
                           <Form.Control  type="text" placeholder="Enter tournament name"/>
                       </Form.Group>
                   </Row>
                    <Form.Group controlId="formTournamentMembers" >
                        <Form.Label>Tournament members</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default TournamentForm
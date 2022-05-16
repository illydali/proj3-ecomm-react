import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import { FloatingLabel, Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";


export default function Login(props) {
    const context = useContext(UserContext)

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logIn, setLogin] = useState(false);
    const [unableToLogin, setUnableToLogin] = useState(false)
    

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const login = async () => { 
        try{
            let result = await context.login(email, password);
            console.log(result);
            setLogin(true)
            navigate('/profile')
        } catch(e) {
            setUnableToLogin(true)
        }
       
    }
    
    return (<>

        <Container className="min-vh-100">
            <Form >
                <Form.Group className="mb-3 justify-content" controlId="formGroupEmail">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3">
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password">
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </FloatingLabel>
                </Form.Group>

                <div className="error-helper"
                    style={{ display: unableToLogin === true ? "block" : "none"}}>
                    Your password is incorrect or this account doesn't exist, please retry.
                </div>

                <Button
                    className="mb-2"
                    variant="outline-secondary"
                    onClick={login}
                    >
                    Login
                </Button>
            </Form>
    
                New to our store? 
                <Button variant='link'>
                <Link to="/register" >Sign up
                 </Link>
                 </Button>
            
            
        </Container>
    </>
    )
}
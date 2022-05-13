import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import { FloatingLabel, Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";


export default function Login(props) {
    const context = useContext(UserContext)

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logIn, setLogin] = useState(false);
    

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };


    // const login = async (e) => {
    //     e.preventDefault()
    //     alert('hello')
    //     try {
    //         const response = await axios.post("https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/users/login", {
    //             email,
    //             password
    //         })
    //         localStorage.setItem("accessToken", response.data.accessToken)
    //         localStorage.setItem('refreshToken', response.data.refreshToken)
    //         localStorage.setItem('id', response.data.id)
    //         userContext.userInfo(response.data.user)
    //         console.log(response.data)
    //         navigate('/records')
    //     } catch (e) {
    //         console.log(e)
    //     }

    // }

    const login = async () => {
        let result = await context.login(email, password);
        console.log(result);
        setLogin(true)
        navigate('/profile')
    }
    
    return (<>

        <Container>
            <Form>
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

                <Button
                    className="mb-2"
                    variant="outline-secondary"
                    onClick={login}
                    >
                    Login
                </Button>
            </Form>
    
                New to our store? 
                <br/>
                <Link to="/register" >Sign up
                 </Link>
            
            
        </Container>
    </>
    )
}
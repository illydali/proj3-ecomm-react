import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import { FloatingLabel, Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import LoginContext from "../context/LoginContext";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };


    const login = async (e) => {
        e.preventDefault()
        alert('hello')
        try {
            const response = await axios.post("https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/users/login", {
                email,
                password
            })


            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('id', response.data.id)

            console.log(response.data)
            navigate('/records')
        } catch (e) {
            console.log(e)
        }

    }

    // //when first load, get the accessToken in localStorage if available
    // useEffect(() => {
    //     const accessTokenStored = JSON.parse(localStorage.getItem("accessToken"));
    //     if (accessTokenStored) {
    //         setAccessToken(accessTokenStored);
    //     }
    // }, []);


    return (<>

        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
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
                    type="submit"
                    className="mb-2"
                    variant="outline-secondary"
                    onClick={login}>
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
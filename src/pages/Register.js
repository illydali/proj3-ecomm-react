import React, {
    useState
} from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom'
import config from '../config';
import { Container, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function Register() {

    const navigate = useNavigate()
    // const [registerError, setRegisterError] = useState(false)
    // const [confirmPasswordFail, setConfirmPasswordFail] = useState(false)
    // const [emailInUse, setEmailInUse] = useState(false)
    // const [errorState, setErrorState] = useState({})
    const [formState, setFormState] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'address': '',
        'password': '',
        'confirmPassword': '',
        'birthdate': '',
        'contact': ''
    })

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    console.log(formState)


    const createAccount = async (e) => {
        e.preventDefault()
        try {
            let response = await axios.post('https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api'+ '/users/register', formState)
            console.log(response.data)


            if (response.status === 200) {
                navigate("/login");
            }
            else (alert('error'))
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupFirstName">
                        <FloatingLabel

                            label="First Name"
                            className="mb-3">
                            <Form.Control
                                required
                                type="first_name"
                                placeholder="Enter first name"
                                name="first_name"
                                value={formState.first_name}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupLastName">
                        <FloatingLabel

                            label="Last Name">
                            <Form.Control
                                required
                                type="last_name"
                                placeholder="Enter last name"
                                name="last_name"
                                value={formState.last_name}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <FloatingLabel

                            label="Email">
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={formState.email}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupAddress">
                        <FloatingLabel

                            label="Address">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Address"
                                name="address"
                                value={formState.address}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <FloatingLabel

                            label="Password">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                autoComplete="off"
                                value={formState.password}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <FloatingLabel

                            label="Confirm Password">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                autoComplete="off"
                                value={formState.confirmPassword}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupBirthDate">
                        <FloatingLabel

                            label="Date of Birth">
                            <Form.Control
                                required
                                type="date"
                                name="birthdate"
                                value={formState.birthdate}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupContact">
                        <FloatingLabel

                            label="Contact Number">
                            <Form.Control
                                required
                                type="number"
                                placeholder="Enter phone number"
                                name="contact"
                                value={formState.contact}
                                onChange={updateFormField}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button
                        type="submit"
                        className="mb-2"
                        variant="outline-secondary"
                        onClick={createAccount}>
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    )
}

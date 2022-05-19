import React, {
    useState
} from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';
import config from '../config';
const BASE_URL = config.BASE_API_URL

export default function Register() {

    const navigate = useNavigate()
    const [registerError, setRegisterError] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [emailRegistered, setEmailRegistered] = useState(false)
    const [errorState, setErrorState] = useState({})
    const [formState, setFormState] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'address': '',
        'password': '',
        'confirmPassword': '',
        'birth_date': '',
        'contact': ''
    })

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    function validateEmail(email) {
        let regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    const validateInputs = async () => {
        let isValid = true;
        let errorMessage = {}

        if (formState.first_name === "" || formState.first_name < 3) {
            isValid = false
            errorMessage['first_nameError'] = "First name must be at least 3 characters"
        }

        if (formState.last_name === "" || formState.last_name< 3) {
            isValid = false
            errorMessage['last_nameError'] = "Last name must be at least 3 characters"
        }

        if (formState.email === "" || validateEmail(formState.email) === false) {
            isValid = false
            errorMessage['emailError'] = "Please provide a valid email"
        }

        if (formState.address === "" || formState.address.length < 10) {
            isValid = false
            errorMessage['addressError'] = "Please provide your address"
        }

        if (formState.contact < 8) {
            isValid = false
            errorMessage['contactError'] = "Contact number must be 8 characters or more"
        }

        if (!formState.birth_date) {
            isValid = false
            errorMessage['birthdateError'] = "Please choose your date of birth"
        }

        setErrorState(errorMessage)
        return isValid
    }

    const createAccount = async (e) => {
        e.preventDefault()

        let valid = validateInputs()
        if (!valid) {
            return;
        }

        try {
            let response = await axios.post(BASE_URL +  '/users/register', formState)
            if (response.data === "Unable to create user") {
                setRegisterError(true)
            } else if (response.data === "Passwords do not match") {
                setConfirmPassword(true)
                setRegisterError(true)
            } else if (response.data === "Email already in use") {
                setEmailRegistered(true)
                setRegisterError(true)
            } else if (response.status === 200) {
                setRegisterError(false)
                navigate("/login");
            } 
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container className="min-vh-200">
                <Form className='mt-3'>
                <div>
                <p className="error-helper"
                    style={{ display: emailRegistered === true ? "block" : "none" }}>
                    You have already created an account with this email, please login
                </p>
            </div>
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
                            <div className="error-helper">
                                {errorState["first_nameError"]}
                            </div>
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
                            <div className="error-helper">
                                {errorState["last_nameError"]}
                            </div>
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
                            <div className="error-helper">
                                {errorState["emailError"]}
                            </div>
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
                            <div className="error-helper">
                                {errorState["addressError"]}
                            </div>
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
                            <div className="error-helper">
                                {errorState["passwordError"]}
                            </div>
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
                            <p className="error-helper"
                                style={{ display: confirmPassword === true ? "block" : "none" }}>
                                Passwords do not match
                            </p>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupBirthDate">
                        <FloatingLabel

                            label="Date of Birth">
                            <Form.Control
                                required
                                type="date"
                                name="birth_date"
                                value={formState.birth_date}
                                onChange={updateFormField}
                            />
                            <div className="error-helper">
                                {errorState["birthdateError"]}
                            </div>
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
                            <div className="error-helper">
                                {errorState["contactError"]}
                            </div>
                            {/* <Form.Control.Feedback type="invalid">
                                {errorState.contactError}
                            </Form.Control.Feedback> */}
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Button
                        type="submit"
                        className="mb-2"
                        variant="outline-secondary"
                        onClick={createAccount}>
                        Register
                    </Button>
                    <p className="error-helper"
                                style={{ display: registerError === true ? "block" : "none" }}>
                                Please complete the required information and resubmit
                            </p>
                </Form>
            </Container>
        </>
    )
}
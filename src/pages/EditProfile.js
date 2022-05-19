import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Container, Form, Button, FloatingLabel } from 'react-bootstrap'
import Loader from '../components/Loader'
import UserContext from '../context/UserContext';

import config from '../config';
const BASEURL = config.BASE_API_URL

export default function EditProfile() {

    let context = useContext(UserContext);
    let navigate = useNavigate()

    const [registerError, setRegisterError] = useState(false)
    const [errorState, setErrorState] = useState({})
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [formState, setFormState] = useState({
        'first_name': '',
        'last_name': '',
        'address': '',
        'birth_date': '',
        'contact': ''
    })

    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    console.log(formState)

    const validateInputs = async () => {
        let isValid = true;
        let errorMessage = {}

        if (formState.first_name === "" || formState.first_name < 3) {
            isValid = false
            errorMessage['first_nameError'] = "First name must be at least 3 characters"
        }

        if (formState.last_name === "" || formState.last_name < 3) {
            isValid = false
            errorMessage['last_nameError'] = "Last name must be at least 3 characters"
        }

        if (formState.address === "" || formState.address.length < 10) {
            isValid = false
            errorMessage['addressError'] = "Please provide your address"
        }

        if (formState.contact < 8) {
            isValid = false
            errorMessage['contactError'] = "Contact number must be 8 characters or more"
        }
        setErrorState(errorMessage)
        return isValid
    }

    const updateAccount = async (e) => {
        e.preventDefault()

        let valid = validateInputs()
        if (!valid) {
            return;
        }
        try {
            let userId = user.id
            let response = await axios.patch(BASEURL + '/users/update/' + userId, formState)
            console.log(response.data)

            if (response.data === "Unable to edit user") {
                setRegisterError(true)
            } else if (response.status === 200) {
                setRegisterError(false)
                navigate("/profile");
            }
        } catch (err) {
            console.log(err)
        }
    }

    const accessToken = localStorage.getItem('accessToken');

    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    useEffect(() => {
        const fetchProfile = async () => {
            console.log("Use effect for profile works")
            let response = await context.profile()

            setUser(response);
            setLoggedIn(true)
            setLoaded(true)
            const { birth_date, ...userData } = response
            const formatBirthdate = birth_date ? formatDate(birth_date) : "";
            let formData = {
                ...userData,
                'birth_date': formatBirthdate,
            }
            setFormState(formData)
            console.log(response);
        }
        fetchProfile();
    }, [accessToken])


    if (loaded === false) {
        return (
            <Loader />
        )
    } else if (loaded === true && loggedIn === false) {
        navigate("/login")
    } else {

        return (
            <>
                <Container>
                    <div className="profile-wrapper p-2">
                        <h1 className="text-center mt-3">Edit Profile</h1>
                        <hr></hr>

                        <Form>

                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                <FloatingLabel

                                    label="First Name"
                                    className="mb-3">
                                    <Form.Control
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
                            <Form.Group className="mb-3" controlId="formGroupAddress">
                                <FloatingLabel

                                    label="Address">
                                    <Form.Control
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
                            <Form.Group className="mb-3" controlId="formGroupBirthDate">
                                <FloatingLabel

                                    label="Date of Birth">
                                    <Form.Control
                                        type="date"
                                        name="birth_date"
                                        value={formState.birth_date}
                                        onChange={updateFormField}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupContact">
                                <FloatingLabel

                                    label="Contact Number">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter phone number"
                                        name="contact"
                                        value={formState.contact}
                                        onChange={updateFormField}
                                    />
                                    <div className="error-helper">
                                        {errorState["contactError"]}
                                    </div>
                                </FloatingLabel>
                            </Form.Group>

                            <Button
                                type="submit"
                                className="mb-2"
                                variant="outline-secondary"
                                onClick={updateAccount}>
                                Update
                            </Button>
                            <p className="error-helper"
                                style={{ display: registerError === true ? "block" : "none" }}>
                                Please complete the required information and resubmit
                            </p>
                        </Form>
                    </div>
                </Container>
            </>
        )
    }
}
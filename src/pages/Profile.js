import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cart from './Cart';
import { Button, Container, Stack, } from 'react-bootstrap'
import UserContext from '../context/UserContext';


export default function Profile() {

    const navigate = useNavigate();
    let context = useContext(UserContext);
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken')
    //     const fetch = async () => {
    //         const response = await axios.get(`https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/users/profile`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         })
    //         setUser(response.data.user)
    //         setLoggedIn(true)
    //         setLoaded(true)
    //         console.log(response.data)
    //     }
    //     fetch();
    // }, [])


    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            console.log("Use effect for profile works")
            let response = await context.profile()
            setUser(response);
            setLoggedIn(true)
            setLoaded(true)
            console.log(response);
        }
        fetchProfile();
    }, [accessToken])

    const logout = async () => {
        let result = await context.logout();
        console.log(result, 'logout success');
        setLoggedIn(false);
        setLoaded(false)
        setUser({})
        if (result) {
            navigate('/')
        }
    }


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
                    <h1 className="text-center mt-3">My Profile</h1>
                    <hr></hr>
                    <div className="row p-3">
                        <div className="col-6 leftcol">
                            <p>Name:</p>

                            <p>Email:</p>
                            <p>Birthate: </p>
                            <p>Contact Number:</p>
                            <p>Address:</p>


                        </div>

                        <div className="col-6">

                            <p>{user.first_name} {user.last_name} {user.username} </p>
                            <p>{user.email}</p>
                            <p>{moment(user.birth_date).format('MMMM Do YYYY')} </p>
                            <p>{user.contact}</p>
                            <p>{user.address}</p>

                        </div>
                    </div>
                    <div className="row">
                        <div className="text-center my-3">
                            <Link className="suggestion cart-checkout" to="/profile/edit"> Edit Profile </Link>
                            <Link className='suggestion cart-checkout' to="/cart"> View Cart </Link>
                            <Link className='suggestion cart-checkout' to='/allorders'>View Order History</Link>
                            <Button variant='outline-secondary' className='my-2' onClick={logout}>Logout</Button>
                        </div>
                    </div>
                </div>
                </Container>
            </>
        )
    }
}
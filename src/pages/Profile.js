import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cart from './Cart';


export default function Profile() {

    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const fetch = async () => {
            const response = await axios.get(`https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                }
            })
            setUser(response.data.user)
            setLoggedIn(true)
            setLoaded(true)
            console.log(response.data)
        }
        fetch();
    }, [])

    if (loaded === false) {
        return (
            <Loader />
        )
    } else if (loaded === true && loggedIn === false) {
        navigate("/login")
    } else {

        return (
            <>
                <div className="profile-wrapper p-2">
                    <h1 className="text-center mt-3">My Profile</h1>
                    <hr></hr>
                    <div className="row p-3">
                        <div className="col-6 leftcol">
                            <ul >
                                <li>Name:</li>
                                <li>Email:</li>

                                <li>Contact Number:</li>
                                <li>Address:</li>
                            </ul>

                        </div>
                        
                        <div className="col-6">
                            <ul >
                                <li>{user.first_name} {user.last_name} {user.username} </li>
                                <li>{user.email}</li>

                                <li>{user.contact}</li>
                                <li>{user.address}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="click-edit my-3">
                            <Link className="btn allbtn" to="/profile/edit"> Edit Profile </Link>
                        </div>
                    </div>
                </div>
                <Cart/>
            </>
        )
    }
}
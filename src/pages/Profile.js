import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Cart from './Cart';
import { Button, Stack, } from 'react-bootstrap'
import UserContext from '../context/UserContext';


export default function Profile() {

    const navigate = useNavigate();
    let context = useContext(UserContext);
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    // const [user, setUser] = useState({})

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

    useEffect(()=> {
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
        if(result){
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
                            <Stack gap={2} className="col-md-5 mx-auto">
                                <Button variant="secondary">Save changes</Button>
                                <Button variant="outline-secondary">Cancel</Button>
                            </Stack>
                        </div>
                    </div>
                    <Button onClick={logout}>Logout</Button>
                </div>
              
            </>
        )
    }
}
import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import axios from 'axios';

import { Alert } from 'react-bootstrap'
import config from '../config'
const BASE_URL = config.TEST_API_URL



export default function UserProvider(props) {

    const [userProfile, setUserProfile] = useState({});
    const [logIn, setLogIn] = useState(false);
    const [records, setRecords] = useState([]);
    const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        const accessTokenStored = localStorage.getItem("accessToken")
        if (accessTokenStored) {
            setAccessToken(accessTokenStored);
        }
    }, []);

    //if accessToken is valid, we retrieve user info
    useEffect(() => {
        const profile = async () => {
            if (accessToken) {
                let response = await localStorage.getItem("user.id")
                setUserProfile(response);
                setLogIn(true);
            }
        };
        if (accessToken) {
            profile();
        }
    }, [accessToken]);

    const context = {
        login: async (email, password) => {
            console.log("is it working");
            let response = await axios.post(BASE_URL + "/users/login", {
                "email": email,
                "password": password
            })
            if (response.data) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('id', response.data.user.id)
                setLogIn(true);
                setUserProfile(response.data)
                console.log("response data")
                console.log(response.data)
                return true;
            } else {
                setLogIn(false);
                return false;
            }


        },

        profile: async () => {
            const token = localStorage.getItem('accessToken')

            const response = await axios.get(BASE_URL + '/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data) {
                console.log(response.data)
                setUserProfile(response.data.user);
                return response.data.user;
            } else {
                setUserProfile({})
                return false;
            }

        },

        logout: async () => {
            let refresh = {
                'refreshToken': localStorage.getItem('refreshToken')
            }
            console.log(refresh);
            if (refresh) {
                let response = await axios.post(BASE_URL + "/users/logout", refresh)
                if (response.data) {
                    setLogIn(false);
                    setUserProfile({});
                    localStorage.clear()
                    return true; //logout success
                }
            } else {
                return false; //no refresh token
            }

        },
        records: async () => {
            let response = await axios.get(BASE_URL + '/records');
            setRecords(response.data);
            if (response.data) {
                return response.data
            } else {
                console.log('none found')
            }
        },
        addToCart: async (userId, recordId, recordTitle) => {
            const token = localStorage.getItem('accessToken')
            let URL = BASE_URL + "/cart/" + userId + "/add/" + recordId;
            try {
                await axios.get(URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                return (<Alert variant="success">{recordTitle} added to Shopping Cart successfully.</Alert>)
            } catch (e) {
                console.log("Error add to cart:", e);
                return (<Alert variant="danger">ERROR: Failed to add product: {recordTitle} to Shopping Cart.</Alert>)
            }
        },
        getAllSuccessOrders: async (userId) => {
            let response = await axios.get(BASE_URL + '/orders/allorders/' + userId);
            if (response.data) {
                return response.data
            } else {
                console.log('none found')
            }
        },
        getSingleOrder: async (orderId) => {
            const token = localStorage.getItem('accessToken')
            let URL = BASE_URL + '/orders/' + orderId;
            try {
                let response = await axios.get(URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                return response
            } catch (e) {
                console.log('GET ORDERS ERROR', e)
            }
        }
    }

    return <UserContext.Provider value={context} >
        {props.children}
    </UserContext.Provider >

}
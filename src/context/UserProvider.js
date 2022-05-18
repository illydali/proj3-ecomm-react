import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import axios from 'axios';

import { Alert } from 'react-bootstrap'
import config from '../config'
const BASE_URL = config.BASE_API_URL



export default function UserProvider(props) {

    const [userProfile, setUserProfile] = useState({});
    const [logIn, setLogIn] = useState(false);
    const [records, setRecords] = useState([]);
    const [accessToken, setAccessToken] = useState("")
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        setInterval(async () => {
            let refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post(BASE_URL + '/users/refresh', {
                        refreshToken
                    })
                    localStorage.setItem('accessToken', response.data.accessToken);
                    setAccessToken(localStorage.setItem('accessToken'))
                    console.log('access token reset for another 15mins')
                } catch (e) {
                    console.log('refresh token is expired, pls log in');
                }
            } else {
                localStorage.clear();
            }
        }, config.REFRESH_INTERVAL)
    }, []);

    if (accessToken) {
        const checkAccesssToken = async () => {
            const response = await axios.get(BASE_URL + "/users/profile", {
                headers: {
                    authorization: "Bearer " + accessToken
                }
            })
            console.log(response.data)
            console.log(response.data.id)
            console.log('login verified')

            // see if the id and returning access token is the same
            if (response.data.id === parseInt(localStorage.getItem('id'))) {
                setLogIn(true)
            }
        }
        checkAccesssToken()
    }

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
                return true;
            } else {
                setLogIn(false);
                setUserProfile({})
                localStorage.clear()
            }
        },
        logIn,
        profile: async () => {
            let profileToken = localStorage.getItem('accessToken')
            const response = await axios.get(BASE_URL + '/users/profile', {
                headers: {
                    Authorization: `Bearer ${profileToken}`,
                }
            })
            if (response.data) {
                setUserProfile(response.data.user);
                return response.data.user;
            } else {
                setUserProfile({})
                return false;
            }
        },
        userProfile,

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
                    setCartItem([])
                    localStorage.clear()
                    return true; // logout successful
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
        getCart: async (userId) => {

            if (!userId) {
                userId = localStorage.getItem("id")
            }
            let response = await axios.get(BASE_URL + "/cart/" + userId)
            if (response.data !== "Unable to get items.") {
                setCartItem(response.data)
                console.log(response.data)
                return response.data
            } else {
                setCartItem(0)
                console.log('pls. log in')
            }
        },
        setCartItem,
        cartItem,
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
            if (!userId) {
                userId = localStorage.getItem("id")
            }
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
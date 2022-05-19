import React, { useState, useEffect, useContext } from 'react'

import axios from 'axios'
import { Container, Alert, Button } from 'react-bootstrap'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Loader from '../components/Loader'
import UserContext from '../context/UserContext'
import config from '../config';
const baseUrl = config.BASE_API_URL

export default function Cart() {

    const context = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartItem, setCartItem] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [user, setUser] = useState({})

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log("Use effect for header works")
                let response = await context.profile()
                setUser(response);
                setIsLoggedIn(true)
            } catch (e) {
                setIsLoggedIn(false)
                setUser({})
                console.log('cart acesss failed', e)
            }
        }
        fetchProfile();
    }, [accessToken])


    useEffect(() => {
        const fetchCart = async () => {
            let userId = localStorage.getItem("id")
            console.log(userId)
            console.log(user)
            let response = await axios.get(baseUrl + "/cart/" + userId)
            if (response.data !== "Unable to get all items.") {
                setCartItem(response.data)
                setLoaded(true)
                setIsLoggedIn(true)
                context.setCartItem(response.data)
                console.log(response.data)
            } else {
                console.log('none')

            }
        }
        fetchCart()
    }, [])

    useEffect(() => {
        let totalCost = 0;
        for (let i of cartItem) {
            totalCost += (i.record.price * i.quantity)
        }
        setTotalCost(totalCost)
    }, [cartItem])


    const minusQuantity = async (e) => {
        // Get index
        const cartRecordId = cartItem.findIndex(p => p.record.id === parseInt(e.target.name))
        // Clone state
        let cloned = [...cartItem]
        // Replace the data
        if (cloned[cartRecordId].quantity > 1) {
            cloned[cartRecordId].quantity -= 1;
        } else {
            // nothing happen, qty already 1 
        }
        // Set back the state
        setCartItem(cloned)
        context.setCartItem(cloned)
        let userId = user.id
        await axios.post(`${baseUrl}/cart/${userId}/updateQuantity/${e.target.name}`, {
            "quantity": cloned[cartRecordId].quantity
        })
        console.log(cartItem)
    }

    const addQuantity = async (e) => {
        const cartRecordId = cartItem.findIndex(p => p.record.id === parseInt(e.target.name))
        let cloned = [...cartItem]
        cloned[cartRecordId].quantity += 1
        setCartItem(cloned)
        context.setCartItem(cloned)
        let userId = user.id
        await axios.post(`${baseUrl}/cart/${userId}/updateQuantity/${e.target.name}`, {
            "quantity": cloned[cartRecordId].quantity
        })
        console.log(cartItem)
    }

    const deleteFromCart = async (e) => {
        let userId = localStorage.getItem("id")
        await axios.get(`${baseUrl}/cart/${userId}/remove/${e.target.name}`)
        // Get index
        const cartRecordId = cartItem.findIndex(p => p.record.id === parseInt(e.target.name))
        // Clone state
        let cloned = [...cartItem]
        // Remove the item from original state using splice
        cloned.splice(cartRecordId, 1)
        setCartItem(cloned)
        context.setCartItem(cloned)
        console.log('delete success')
    }

    const renderCartItem = () => {
        let cartRender = []
        cartItem.map(p =>
            cartRender.push(
                <React.Fragment key={p.id}>
                    <div className="row mt-2 mb-3" >
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="cart-img-container" style={{
                                backgroundImage: `url(${p.record.image_url})`
                            }}></div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-9">
                            <h3 style={{ color: "#4a4a4a" }}>{p.record.title}</h3>
                            <p className="cart-indi-des">{p.record.type}</p>
                            <div className="cart-update-qty-box mb-2">
                                <Button className="cart-update-qty mr-2" variant='outline-secondary' size='sm' onClick={minusQuantity} name={p.record.id} value={p.quantity}>
                                    -
                                </Button>
                                <div className='px-3'>
                                    {p.quantity}
                                </div>
                                <Button
                                    variant='outline-secondary' size='sm'
                                    className="cart-update-qty ml-2" onClick={addQuantity} name={p.record.id} value={p.quantity}>
                                    +
                                </Button>
                            </div>
                            <Button variant='outline-secondary' size='sm' className="cart-qty-cta mb-1" onClick={deleteFromCart} name={p.record.id}>
                                Delete < RiDeleteBin5Line /></Button>
                            <div className="d-flex justify-content flex-end">
                                <p>${(p.record.price * p.quantity / 100).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <p className="grey-line"></p>
                </React.Fragment>
            ))
        if (cartRender[0] === undefined) {
            cartRender.push(
                <div style={{ height: "50vh" }}>
                    No item in cart yet!
                </div>
            )
        }
        return cartRender
    }


    if (loaded === false) {
        return <Loader />
    }
    else if (loaded === true && isLoggedIn === false) {
        return (
            <div>Redirecting to Login Page...</div>

        )
    }
    else {
        return (<>
            <Container className="min-vh-150">
                <div>
                    <div className="page-width" style={{ display: "block" }}>
                        <h1 className="mt-4 mb-2">My Cart</h1>
                        <br />
                        {renderCartItem()}
                        <div style={{ display: cartItem.length > 0 ? 'block' : 'none' }}
                        >
                            <div className="cart-total-cost">
                                <p> SUBTOTAL:</p>
                                <p>  ${(totalCost / 100).toFixed(2)}  </p>
                            </div>
                            <div className="cart-checkout">

                                <a className='suggestion fs-4 text-uppercase' href={`${baseUrl}/checkout/?user_id=` + localStorage.getItem("id")}>
                                    Checkout</a>
                                <br/>
                            </div>
                            <p className='text-center'>You qualify for free shipping!</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
        )
    }
}
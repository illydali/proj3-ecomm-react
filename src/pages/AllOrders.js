import React, { useContext, useEffect, useState } from 'react'

import { Link, } from 'react-router-dom'
import { Container, Alert, Button } from 'react-bootstrap'
import UserContext from '../context/UserContext'

import config from '../config'
const baseURL = config.TEST_API_URL

export default function Orders() {

    const context = useContext(UserContext)

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const getOrder = async () => {
            try {
                let result = await context.getAllSuccessOrders()
                console.log(result)
                setOrders(result)
            } catch (e) {
                console.log(e)
            }
        }
        getOrder()
    }, [])


    const displayOrders = () => {
        let lst = []
        for (let o of orders) {
            lst.push(
                <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.status.action}</td>
                    {/* <td>{o.quantity}</td> */}
                    <td>{o.order_date.slice(0, 10)}</td>
                    <td>${(o.payment_total / 100).toFixed(2)}</td>
                    {/* <td>{o.date_of_completion === null ? "-" : o.date_of_completion.slice(0, 10)}</td> */}
                    <td><Link className="suggestion cart-checkout" to={"/order/" + o.id}>See More</Link>
                    </td>
                </tr>
            )
        }
        if (lst.length === 0) {
            lst.push(
                <tr><td> <div>No orders to display.</div></td></tr>

            )
        }
        return lst
    }

    return (
        <>
            <Container className="min-vh-100">
                {context.logIn === false ? (
                    <>
                <Alert> Please log in to view order history. </Alert>
                    <Button variant='outline-secondary' as={Link} to ='/login'> Login </Button>
                </>
                ) : (
                    <div className="page-width">
                        <div className="login-wrapper orders-wrapper">
                            <h1>My Orders </h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                        <th>
                                            Placed on
                                        </th>
                                        <th>
                                            Total Paid
                                        </th>
                                        <th>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayOrders()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Container>
        </>
    )
}


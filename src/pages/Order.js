import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import UserContext from "../context/UserContext";
import Loader from '../components/Loader'
import axios from "axios";
import config from "../config";
import { Container } from "react-bootstrap";
const BASE_URL = config.TEST_API_URL

export default function Order() {

    let { order_id } = useParams();
    console.log(order_id)
    const context = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const [orderView, setOrderView] = useState({})

    useEffect(() => {
        const getOrders = async () => {
            try {
                // const result = await axios.get(BASE_URL +'/orders/' + order_id);
                const result = await context.getSingleOrder(order_id)
                console.log(result.data[0])
                setOrderView(result.data[0])
               
            } catch (e) {
                console.log("some error", e)
            } 
            setLoaded(true)
        } 
        getOrders()
    }, [order_id])

    const displayOrderItems = () => {
        return (
            <>
              <div className="row mt-2 mb-2" key={orderView.id}>
                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="product-img-container" style={{
                                backgroundImage: `url(${orderView.record.image_url})`
                            }} ></div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-9">
                            <p className="order-indi-title" >{orderView.record.title}</p>
                            <p className="cart-indi-des">Quantity: {orderView.quantity}</p>
                            {/* <p className="cart-indi-des">{i.tea.description}</p> */}
                            <div className="cart-indi-cost">
                                <p>${(orderView.record.price * orderView.quantity / 100).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <p className="light-grey-line mt-3"></p>
            </>
        )
    }

    return (
        <>
            {loaded === false ?
                <Loader />
                :
                <Container>
                <div className="page-width" style={{ display: "block" }}>
                    <h1>Order Information</h1>
                    <p className="grey-line"></p>
                    <table key={orderView.id}>
                <tbody>
                    <tr>
                        <td style={{ width: "200px", color: "#777777" }}>
                            Order ID:
                    </td>
                        <td>
                            {orderView.order.id}
                          
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Recipient Name:
                    </td>
                        <td>
                            {orderView.order.user.first_name} {orderView.order.user.last_name}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Recipient Address:
                    </td>
                        <td>
                            {orderView.order.user.address}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Subtotal:
                    </td>
                        <td>
                            ${(orderView.order.payment_total / 100).toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Completed on:
                    </td>
                        <td>
                            {/* {orderView.date_of_completion !== null ? orderView.date_of_completion.slice(0, 10) : "-"} */}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: "#777777" }}>
                            Status:
                    </td>
                        <td>
                            {orderView.order.status.action}
                        </td>
                    </tr>
                </tbody>
            </table>
                    <h1 className="mt-3">Item Details</h1>
                    <p className="grey-line"></p>
                    {displayOrderItems()}
                </div>
                </Container>
            }


        </>
    )
}
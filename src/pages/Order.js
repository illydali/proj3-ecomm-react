import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import UserContext from "../context/UserContext";
import Loader from '../components/Loader'
import { Container } from "react-bootstrap";

export default function Order() {

    let { order_id } = useParams();
    const context = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const [orderView, setOrderView] = useState({})
    const [orderDetails, setOrderDetails] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try {
                const result = await context.getSingleOrder(order_id)
                setOrderView(result.data[0])
                setOrderDetails(result.data)
            } catch (e) {
                console.log("some order view error", e)
            } 
            setLoaded(true)
        } 
        getOrders()
    }, [order_id])

    const displayOrderItems = () => {
        let orderItem = []
        orderDetails.map(o => 
            orderItem.push(
                <>
                <div className="row mt-2 mb-2" key={o.id}>
                          <div className="col-12 col-md-4 col-lg-3">
                              <div className="cart-img-container" style={{
                                  backgroundImage: `url(${o.record.image_url})`
                              }} ></div>
                          </div>
                          <div className="col-12 col-md-8 col-lg-9">
                              <p className="order-indi-title" >{o.record.title}</p>
                              <p className="cart-indi-des">Quantity: {o.quantity}</p>
                              <div className="cart-indi-cost">
                                  <p>${(o.record.price * o.quantity / 100).toFixed(2)}</p>
                              </div>
                          </div>
                      </div>
                      <p className="light-grey-line mt-3"></p>
              </>
            ))
            if (orderDetails === undefined || orderDetails.lengt === 0) {
                orderItem.push(
                    <div style={{ height: "50vh" }}>
                        No orders yet!
                    </div>
                )
            }
            return orderItem
    }

    return (
        <>
            {loaded === false ?
                <Loader />
                :
                <Container>
                <div className="page-width mt-3" style={{ display: "block" }}>
                    <h1>Order Information</h1>
                    <p className="grey-line"></p>
                    <table key={orderView.id}>
                <tbody>
                    <tr>
                        <td style={{ width: "200px", color: "#777777" }}>
                            Order Reference ID:
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
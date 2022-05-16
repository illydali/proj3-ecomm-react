import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import { Card, CardGroup, Button, Container, Row, Col } from 'react-bootstrap'

import UserContext from '../context/UserContext';

export default function Records() {

    // const [records, setRecords] = useState([]);
    const [loaded, setLoaded] = useState(false)
    // const context = useContext(ProductContext)

    const context = useContext(UserContext)
    const [records, setRecords] = useState([])

    useEffect(() => {
        const getRecords = async () => {
            let result = await context.records()
            console.log(result)
            setRecords(result)
            setLoaded(true)
        }
        getRecords()
    }, [])

    // useEffect has 2 arguments
    // arg 1: a call back function (aka 'effect')
    // arg 2: what will cause the arg 1 function to be called
    // useEffect(() => {

    //     // define the function to  use axios to get all the posts
    //     const fetchRecords = async () => {
    //         let response = await axios.get("https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/records");
    //         setRecords(response.data);
    //         setLoaded(true)
    //     }
    //     fetchRecords();

    // }, []); // emulate componenetDidMount (activate the effect on rendering the component)

    // useEffect(()=> {
    //     const fetchAll = () => {
    //         let tempRec = context.records()
    //         console.log(tempRec)
    //         setRecords(tempRec)
    //         setLoaded(true)
    //     } 
    //     fetchAll()
    // },[])

    function setCurrency(price) {
        let dollars = price / 100;
        dollars = dollars.toLocaleString("en-SG", {
            style: "currency",
            currency: "SGD"
        })
        return dollars
    }


    return (
        <Container className="min-vh-100">
            {loaded == false ?
                <Loader />
                :
                <>
               
                <Row className="g-4" >
                    <CardGroup>
                    {
                        records.map((p, ind) => {
                            return (
                                <Col className='d-flex' lg={3}>
                                    
                                <Card key={ind} border="secondary" style={{ width: '18rem' }} className='card rounded shadow-sm border-0 h-100 mt-2 my-2 flex-fill' >
                                    
                                    <Card.Img variant="top" src={p.image_url} />
                                    <Card.Body>
                                        
                                        <Card.Title>{p.title}</Card.Title>
                                        <Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            {p.artists.name}
                                            <br/>
                                            {p.labels.name}
                                            <br />
                                            {setCurrency(p.price)}
                                            </div>
                                            <Link variant="outline-secondary" className='text-italic' to={"/records/" + p.id}>See More</Link>
                                        </Card.Text>
                                    </Card.Body>

                                   
                                </Card>
                                
                                </Col>
                            )
                        }
                        )
                    }
                    </CardGroup>
                    </Row>

                </> 
            }
        </Container>
    )
}
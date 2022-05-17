import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { Card, CardGroup, Accordion, Button, Container, Row, Col } from 'react-bootstrap'

import UserContext from '../context/UserContext';

export default function Records() {

    // const [records, setRecords] = useState([]);
    const [loaded, setLoaded] = useState(false)
    // const context = useContext(ProductContext)

    const context = useContext(UserContext)
    const [records, setRecords] = useState([])

    // useEffect has 2 arguments
    // arg 1: a call back function (aka 'effect')
    // arg 2: what will cause the arg 1 function to be called
    // useEffect(() => {

    useEffect(() => {
        const getRecords = async () => {
            let result = await context.records()
            console.log(result)
            setRecords(result)
            setLoaded(true)
        }
        getRecords()
    }, []) // emulate componenetDidMount (activate the effect on rendering the component)

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
                    <div className='search-box'>
                        <div className="page-header py-5 my-2">
                            <p className="mb-0 page-title text-center text-uppercase">ALL RECORDS</p>
                            <p className="mt-2 mb-0 page-subtitle text-center mx-auto w-50">

                            </p>
                        </div>
                    </div>
                    <Row>
                        <Col >
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Labels</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Genres</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
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
                                                            <br />
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
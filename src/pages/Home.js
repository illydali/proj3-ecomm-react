import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MainCarousel from "../components/Carousel";
import UserContext from "../context/UserContext";

import { Card, CardGroup, Button, Row, Col } from 'react-bootstrap'


export default function Home() {
    const context = useContext(UserContext)
    const [allRecords, setRecords] = useState([])

    useEffect(() => {
        const getRecords = async () => {
            let result = await context.records()
            console.log(result)
            setRecords(result)
        }
        getRecords()
    }, [])

    return (
        <React.Fragment>
            <div>
                <MainCarousel />

                <div className="col-md-4 rounded-md-9 my-2" id="cta">

                    <div className="p-4">
                        <h3>Free shipping from now till the end of May!</h3>
                        <div className="row">
                            <div className="mt-3 align-center">
                                <Link to='/records'>
                                    <Button variant='light' type="button" className="p-2 btn btn-lg mt-3 ps-3 pe-3 fs-6"
                                    >SHOP NOW</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-3">
                <h3 className="text-center fw-bold fs-2">
                   BESTSELLERS
                </h3>
            </div>
            {/* <div className="scrolling-wrapper row flex-row flex-nowrap flex-lg-wrap m-4 pb-2 pt-2 gap-3 gap-lg-4"></div>
            <CardGroup>
                {allRecords.map((p => {
                    return (<Card key={p.id}>

                        <Card.Title className="text-center">
                            {p.title}
                        </Card.Title>
                    </Card>)
                }))}

            </CardGroup> */}
            <Row>
                <Col xs={12} md={12} lg={6}>

                    <div className="home-left-wrapper">
                    <h5 className="card-title fs-3 text fw-bold lh-lg">Vinyl and all it's wonders</h5>
                        <p className="px-3 py -4 card-text text-center d-flex align-items-center ">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                        unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
                        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                    </div>
                </Col>
                <Col>
                    <div className="home-right-wrapper">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src="https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" className="card-img-center" alt="..." />
                            
                        </div>
                    </div>

                </Col>
            </Row>

        </React.Fragment >
    )
}
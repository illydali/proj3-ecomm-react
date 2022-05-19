import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MainCarousel from "../components/Carousel";
import UserContext from "../context/UserContext";

import { Card, CardGroup, Button, Row, Col, Container } from 'react-bootstrap'


export default function Home() {
    const context = useContext(UserContext)
    const [allRecords, setRecords] = useState([])
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        const getRecords = async () => {
            let result = await context.records()
            let allItems = [...result];

            // https://stackoverflow.com/questions/63280808/rendering-random-elements-from-an-array-in-react
            
            const randomItems = [];
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * allItems.length);
                const randomItem = allItems.splice(randomIndex, 1)[0];
                randomItems.push(randomItem);
            }
            setFeatured(randomItems)
            setRecords(result)
        }
        getRecords()
    }, [])

    function setCurrency(price) {
        let dollars = price / 100;
        dollars = dollars.toLocaleString("en-SG", {
            style: "currency",
            currency: "SGD"
        })
        return dollars
    }

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

            <Container className="mt-3">
                <div >
                    <h1 className="text-center fw-bold fs-2">
                        BESTSELLERS

                    </h1>
                </div>
                <div className="grey-line my-1"></div>
                <CardGroup className="g-4 p-2">
                    {
                        featured.map((p) => {
                            return (
                                <Col key={p.id} className='d-flex' xs={12} lg={3}>
                                    <Card border="secondary" style={{ width: '18rem' }} className='card rounded shadow-sm border-0 h-100 mt-2 my-2 flex-fill' >
                                        <Card.Img variant="top" src={p.image_url} />
                                        <Card.Body>
                                            <Card.Title>{p.title}</Card.Title>
                                            <Card.Text className="d-flex justify-content-between align-items-center">
                                                {p.artists.name}
                                                <br />
                                                {p.labels.name}
                                                <br />
                                                {setCurrency(p.price)}
                                                <Link variant="outline-secondary" className='suggestion stretched-link' to={"/records/" + p.id}>View</Link>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                        )
                    }


                </CardGroup>

                <div className="text-center py-2 h-50 ">
                    <Button variant='outline-secondary' as={Link} to='/records' > SEE ALL RECORDS </Button>
                </div>

                <Row className="mt-3">
                    <Col xs={12} md={12} lg={6}>

                        <div className="home-left-wrapper">
                            <h5 className="fs-3 text fw-bold lh-lg text-center py-6">The Vinyl Revival</h5>
                            <p className="px-3 py-4 card-text text-center d-flex align-items-center ">

                                The analogue format made of polyvinyl chloride had been the main vehicle for the
                                commercial distribution of pop music from the 1950s until the late 1980s when
                                it was largely replaced by the compact disc.
                            </p>
                            <p className=" text-center">
                                Since 2007, vinyl records have enjoyed renewed popularity in the West and in East Asia and
                                vinyl sales began starting its comeback, and by the early 2010s, it was growing at a very quick rate.
                                Vinyl is now more popular than it has been since the late 1980s,
                                even with the large number of streaming apps in the market.
                            </p>
                            <p className=" text-center">
                                Along with steadily increasing vinyl sales, the vinyl revival is also evident in the renewed interest in the record shop, the implementation of music charts dedicated solely
                                to vinyl, and an increased output of films dedicated to the vinyl record and culture. - Wiki
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div className="home-right-wrapper">
                            <div className="card" >
                                <img src="https://images.pexels.com/photos/5699509/pexels-photo-5699509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img mw-200 mh-250" alt="A vintage record player" />

                            </div>
                        </div>

                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    )
}
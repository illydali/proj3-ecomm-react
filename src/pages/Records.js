import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Loader from '../components/Loader'
import { Card, CardGroup, Button, Container, Row } from 'react-bootstrap'

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
        <Container>
            {loaded == false ?
                <Loader />
                :
                <>
                <Row xs={1} md={2} className="g-4">
                    <CardGroup className='justify-content space-evenly'>
                    {
                        records.map((p, ind) => {
                            return (

                                <Card key={ind} border="secondary" style={{ width: '18rem' }} >
                                    <Card.Header>{p.title}</Card.Header>
                                    <Card.Img variant="top" src={p.image_url} />
                                    <Card.Body>
                                        <Card.Title>{p.artists.name}</Card.Title>
                                        <Card.Text>
                                            {p.labels.name}
                                            <br />
                                            {setCurrency(p.price)}
                                        </Card.Text>
                                    </Card.Body>
                                    <Button variant="outline-secondary" href={"/records/" + p.id}>See More</Button>
                                </Card>
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
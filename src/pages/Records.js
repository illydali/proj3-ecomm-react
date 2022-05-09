import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config';

import { Card, Button } from 'react-bootstrap'

export default function Records() {

    const [records, setRecords] = useState([]);

    // useEffect has 2 arguments
    // arg 1: a call back function (aka 'effect')
    // arg 2: what will cause the arg 1 function to be called
    useEffect(() => {

        // define the function to  use axios to get all the posts
        const fetchPosts = async () => {
            let response = await axios.get(config.TEST_URL + '/records');
            setRecords(response.data);
        }
        fetchPosts();

    }, []); // emulate componenetDidMount (activate the effect on rendering the component)

    return (
        <React.Fragment>

            {records.map((p) => {
                return (
                    <Card border="secondary" style={{ width: '18rem' }}>
                        <Card.Header>{p.title}</Card.Header>
                        <Card.Img variant="top" src={p.image_url} />
                        <Card.Body>
                            <Card.Title>{p.artists.name}</Card.Title>
                            <Card.Text>
                                {p.labels.name}
                            </Card.Text>
                        </Card.Body>
                        <Button variant="primary" href={"/records/"+p.id}>Go somewhere</Button>
                    </Card>
                )
            }
            )}
            <br />
        </React.Fragment>
    )
}
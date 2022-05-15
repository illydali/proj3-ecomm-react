import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

import { Container, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader'

import config from '../config';
import UserContext from '../context/UserContext';
const BASE_URL = config.TEST_API_URL

export default function RecordView() {

    const { record_id } = useParams();
    console.log(record_id)
    const [currentRecord, setRecord] = useState({});
    // const [currentRecordID, setCurrentRecordID] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const context = useContext(UserContext)
    const [user, setUser] = useState({})
    const [alertJSX, setAlertJSX] = useState();

    useEffect(() => {
        const getUser = async () => {
            let temp = await context.profile()
            setUser(temp)
        }
        getUser()
    }, [])

    useEffect(() => {

        const fetchRecord = async () => {
            try {
                const response = await axios.get(BASE_URL + '/records/' + record_id);
                setRecord(response.data);
                console.log(response.data)
                setLoaded(true)
            } catch (e) {
                console.log("Recordview axios error", e);
            }
        }
        fetchRecord();
    }, [record_id])

    const addToCart = async (userId, recordId, recordTitle) => {
        let response = await context.addToCart(userId, recordId, recordTitle);
        console.log(response)
        setAlertJSX(response)
    }


    return <React.Fragment>

        {loaded === false ?
            <Loader />
            :
            <Container>
                {alertJSX ? alertJSX : null}
                <Row>
                    <Col xs={12} lg={6} md={6} xl={6}>
                        <div>
                            <img
                                className='displayed-image'
                                src=
                                {currentRecord.image_url}

                                alt="Record sleeve"
                            />
                        </div>

                    </Col>
                    <Col>
                        <h1 className='strong'>
                            {currentRecord.title}
                        </h1>

                        <div className='row'>
                            <div>
                                {currentRecord.labels.name}
                            </div>
                            <div>
                                <img
                                    className='displayed-label-logo'
                                    src={currentRecord.labels.image_url}
                                    alt="Label logo"

                                />
                            </div>
                        </div>

                        <Button variant='link' onClick={() =>
                            addToCart(user.id, currentRecord.id, currentRecord.title)
                        }>
                            Add to cart
                        </Button>

                    </Col>

                </Row>

                <Row>
                    <Col xs={12} lg={6} md={6} xl={6}>


                    </Col>
                    <Col>
                        <section className='mt-3'>
                            <h6 className='strong'>Album Info</h6>
                            <br />
                            <p> {currentRecord.description}
                            </p>
                        </section>
                    </Col>

                </Row>

            </Container >
        }
    </React.Fragment>

}
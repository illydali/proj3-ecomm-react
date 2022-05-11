import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

import { Container, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader'


export default function RecordView() {

    const { record_id } = useParams();
    console.log(record_id)
    const [currentRecord, setRecord] = useState({});
    // const [currentRecordID, setCurrentRecordID] = useState(0)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

        const fetchRecord = async () => {
            try {
                const response = await axios.get('https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/records/' + record_id);
                setRecord(response.data);
                console.log(response.data)
            } catch (e) {
                console.log("Recordview axios error", e);
            }
            setLoaded(true)

        }
        fetchRecord();
    }, [record_id])
    //         let response = await axios.get(config.TEST_URL + '/records/'  + recordId)
    //         setCurrentRecord(response.data)
    //         console.log(response.data)
    //     }
    //     fetchRecord(currentRecordID);

    // }, [currentRecordID])

    return <React.Fragment>

        {loaded === false ?
            <Loader />
            :
            <Container>
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
                            <h3 className='strong'>
                               {currentRecord.title}
                            </h3>
                            <p>
                                Desc: {currentRecord.description}
                            </p>
                            <div className='row'>
                                <div>
                            {currentRecord.labels.name}
                            </div>
                            <div>
                            <img 
                            className='displayed-label-logo'
                            src= {currentRecord.labels.image_url}
                            alt="Label logo"
                            
                            />
                            </div>
                            </div>
                            <Button>
                                Add to cart
                            </Button>
                        
                            </Col> 

                </Row>

            </Container >
        }
    </React.Fragment>

}
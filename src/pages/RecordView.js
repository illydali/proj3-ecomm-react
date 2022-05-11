import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

import { Container } from 'react-bootstrap';

export default function RecordView() {

    const { record_id } = useParams();
    console.log(record_id)
    const [currentRecord, setRecord] = useState({});
    // const [currentRecordID, setCurrentRecordID] = useState(0)

    useEffect(() => {

        const fetchRecord = async () => {
            try {
                const response = await axios.get('https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api/records/' + record_id);
                setRecord(response.data);
                console.log(response.data)
            } catch (e) {
                console.log("Recordview axios error", e);
            }

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
        <Container>
            <div>
                <img
                    className="d-block w-50"
                    src=""
                    // {currentRecord.labels.image_url}
                    alt=""
                />
                </div>
                
            
            <p>
                Title: {currentRecord.title}
            </p>
            <p>
                Desc: {currentRecord.description}
            </p>

        </Container >
    </React.Fragment>

}
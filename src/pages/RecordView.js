import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import config from '../config';
import { Container } from 'react-bootstrap';

export default function RecordView() {

    const { record_id } = useParams();
    console.log(record_id)
    const [currentRecord, setRecord] = useState({});
    // const [currentRecordID, setCurrentRecordID] = useState(0)

    useEffect(() => {

        const fetchRecord = async () => {
            try {
                const response = await axios.get(config.TEST_URL + '/records/' + record_id);
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
            <h1>
                Title: {currentRecord.title}
            </h1>
            <h1>
                Desc: {currentRecord.description}
            </h1>
        </Container >
    </React.Fragment>

}
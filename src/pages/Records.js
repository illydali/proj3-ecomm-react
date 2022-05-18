import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { Card, CardGroup, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'

import UserContext from '../context/UserContext';
import axios from 'axios'
import config from '../config';
import Select from 'react-select';
const BASE_URL = config.BASE_API_URL
export default function Records() {

    const [loaded, setLoaded] = useState(false)
    const context = useContext(UserContext)
    const [records, setRecords] = useState([])

    const [labels, setLabels] = useState([])
    const [genres, setGenres] = useState([])

    const [searchTitle, setSearchTitle] = useState("")
    const [searchEngine, setSearchEngine] = useState("")
    const [searchGenre, setSearchGenre] = useState('')
    const [searchLabel, setSearchLabel] = useState([])

    
    // useEffect has 2 arguments
    // arg 1: a call back function (aka 'effect')
    // arg 2: what will cause the arg 1 function to be called
    // useEffect(() => {

    useEffect(() => {
        const getRecords = async () => {
            let result = await context.records()
            setRecords(result)
            setLoaded(true)
        }
        getRecords()
    }, []) // emulate componenetDidMount (activate the effect on rendering the component)

    useEffect(() => {
        const getLabels = async () => {
            let result = await axios.get(BASE_URL + '/search/labels');
            console.log(result.data)
            setLabels(result.data)
        }
        getLabels()
    }, [])

    const optionLabels = labels.map(item => {
        return {
            label: item[1],
            value: item[0]
        }
    })

    const optionGenres = genres.map(item => {
        return {
            label: item[1],
            value: item[0]
        }
    })

    const handleLabelChange = (selectedOptions) => {
        console.log(
            'option :', selectedOptions
        )
        let labelArray = [];

        selectedOptions.map(o =>
            labelArray.push(o.value))
        setSearchLabel(labelArray)
        console.log(labelArray)

    };

    // https://www.freecodecamp.org/news/how-to-send-the-right-data-type-from-a-form-to-the-backend-server/
    const handleGenreChange = (options) => {
        console.log(
            'option :', options)
       // create a new array with the key value that you want
        const mappedOptions = options.map(option => option.value)
        console.log(mappedOptions) // ['Worker', 'Manager']

        // convert the mapped option array to a string value
        const mappedOptionsToString = mappedOptions.toString()
        console.log(mappedOptionsToString)

        setSearchGenre(mappedOptionsToString)
        console.log(searchGenre)

    };

    useEffect(() => {
        const getGenres = async () => {
            let result = await axios.get(BASE_URL + '/search/genres');
            console.log(result.data)
            setGenres(result.data)
        }
        getGenres()
    }, [])

    const getSearch = async () => {
        let searchQuery = {}
        if (searchTitle !== '') {
            searchQuery.title = searchTitle
        }

        if (searchLabel !== '') {
            searchQuery.label_id = searchLabel
        }

        if (searchGenre !== '') {
            searchQuery.genres = searchGenre
        }

        console.log(searchGenre)

        const response = await axios.post(BASE_URL + "/search/filters", searchQuery)
        console.log(response.data)
        setRecords(response.data)
    }

    const resetSearch = async () => {
        const response = await axios.get(BASE_URL + "/records")
        setRecords(response.data)
        setSearchEngine('')
        setSearchLabel([])
        setSearchTitle('')
        setSearchGenre('')
    }

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
                            <h1 className="mb-0 page-title text-center strong text-uppercase">ALL RECORDS</h1>
                            <p className="mt-2 mb-0 page-subtitle text-center mx-auto w-50">

                            </p>
                        </div>
                    </div>
                    <Row>
                    <Col>
                        <Form className="d-flex justify-content">
                                    <FormControl
                                        type="text"
                                        width='auto'
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={((e) => setSearchTitle(e.target.value))}
                                        value={searchTitle}
                                       
                                    />

                                </Form>
                        </Col>
                        </Row> 
                    <Row d-flex>
                        <Col  >
                            <Select
                                isMulti
                                isClearable
                                placeholder='Search by Labels'
                                options={optionLabels}
                                onChange={handleLabelChange}
                               
                               
                            />
                        </Col>
                        
                        <Col>
                            <Select
                                isMulti
                                options={optionGenres}
                                placeholder='Search by Genres'
                                onChange={handleGenreChange}
                            />

                        </Col>
                        <Col>
                        <button type="submit" onClick={getSearch}>Search</button>
                        <Button type="submit" onClick={resetSearch}>Reset</Button>
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
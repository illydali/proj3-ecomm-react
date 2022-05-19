import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { Card, CardGroup, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap'

import UserContext from '../context/UserContext';
import axios from 'axios'
import config from '../config';
import Select from 'react-select';
import { MdOutlineRefresh } from 'react-icons/md'

const BASE_URL = config.BASE_API_URL
export default function Records() {

    const [loaded, setLoaded] = useState(false)
    const context = useContext(UserContext)
    const [records, setRecords] = useState([])

    const [labels, setLabels] = useState([])
    const [genres, setGenres] = useState([])

    const [searchTitle, setSearchTitle] = useState("")
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
        let labelArray = [];
        selectedOptions.map(o =>
            labelArray.push(o.value))
        setSearchLabel(labelArray)
    };

    // https://www.freecodecamp.org/news/how-to-send-the-right-data-type-from-a-form-to-the-backend-server/
    const handleGenreChange = (options) => {
        // create a new array with the key value that you want
        const mappedOptions = options.map(option => option.value)
        // convert the mapped option array to a string value
        const mappedOptionsToString = mappedOptions.toString()
        setSearchGenre(mappedOptionsToString)
    };

    useEffect(() => {
        const getGenres = async () => {
            let result = await axios.get(BASE_URL + '/search/genres');
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
        const response = await axios.post(BASE_URL + "/search/filters", searchQuery)
        setRecords(response.data)
    }

    const resetSearch = async () => {
        const response = await axios.get(BASE_URL + "/records")
        setRecords(response.data)
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
                    <Row className="justify-content-md-center">                        
                        <Col sm={12} lg={3} md={3} className='p-1'>
                            <Form>
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

                        <Col sm={12} lg={3} md={3} className='p-1'>
                            <Select
                                isMulti
                                isClearable
                                placeholder='Search by Labels'
                                options={optionLabels}
                                onChange={handleLabelChange}
                            />
                        </Col>

                        <Col sm={12} lg={3} md={3} className='p-1'>
                            <Select
                                isMulti
                                options={optionGenres}
                                placeholder='Search by Genres'
                                onChange={handleGenreChange}
                               
                            />

                        </Col>
                        <Col sm={12} lg={3} md={3}>
                            <div className='text-center p-1'>
                            <Button variant='outline-secondary rounded-pill sm' type="submit" onClick={getSearch}>Search</Button>
                            <MdOutlineRefresh fontSize="30px" type="submit" onClick={resetSearch} />
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-4" >
                        <CardGroup>
                            {
                                records.map((p, ind) => {
                                    return (
                                        <Col key={ind}  className='d-flex' lg={3}>

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
                                                        
                                                        <Link variant="outline-secondary" className='suggestion' to={"/records/" + p.id}>View</Link>
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

import React, { useContext, useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, FormControl, Navbar, Dropdown, Nav, Badge, Row, Col, Toast, Modal } from 'react-bootstrap'
import { BiCart } from 'react-icons/bi'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { BsFillVinylFill } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'

// test stuff here
import { Offcanvas, NavDropdown, Form, Button } from 'react-bootstrap'
import UserContext from '../context/UserContext'

import config from '../config'

const BASEURL = config.TEST_API_URL

export default function Header() {

    const context = useContext(UserContext)
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false)

    const [search, setSearch] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log("Use effect for header works")
                let response = await context.profile()
                setUser(response);
                setLoggedIn(true)
                console.log(response);
            } catch (e) {
                setLoggedIn(false)
                setUser({})
            }
        }
        fetchProfile();
    }, [accessToken])

    useEffect(() => {
        const getSearch = async () => {
            let response = await axios.get(BASEURL + '/search')
            console.log(response.data)
            setSearch(response.data)
        }
        getSearch()
    }, [])

    const onChangeHandler = (text) => {
        let findMatch = []
        if (text.length > 0) {
            findMatch = search.filter(s => {
                const regex = new RegExp(`${text}`, "gi")
                return (s.title.match(regex), s.artists.name.match(regex))
            })
        }
        console.log(search)
        console.log('find', findMatch)
        setSuggestions(findMatch)
        setText(text)
    }

    const onSearchHandler = (text) => {
        setText(text)
        setSuggestions([])
    }

    return (
        <>
            <Navbar collapseOnSelect fixed='sticky' bg="light" variant='light'
                expand='md' className="mb-3" style={{ height: 80 }}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/"
                    >
                        <BsFillVinylFill fontSize="25px" />
                        <span>VinylShop</span>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="offcanvasNavbar-expand"

                    />
                    {/* <Dropdown >
                    <Dropdown.Toggle variant='light'>
                        <BiCart color='dark' fontSize='20px' />
                        <Badge bg='inherit'> {10} </Badge>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu style={{ minWidth: 325 }}>
                        <span style={{ padding: 10 }}>Cart is Empty! </span>
                       
                    </Dropdown.Menu>
                </Dropdown> */}
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand"
                        aria-labelledby="offcanvasNavbarLabel-expand"
                        placement="end"

                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand">
                                {/* to change later */}
                                <IoPersonCircleOutline fontSize="30px" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/" eventKey="1"
                                >
                                    Home
                                </Nav.Link>

                                {loggedIn === false ?
                                    <Nav.Link as={Link} to="/login" eventKey="2"
                                    >
                                        Login
                                    </Nav.Link>
                                    :

                                    <Nav.Link as={Link} to="/profile" eventKey="2"
                                    >

                                        <IoPersonCircleOutline />
                                    </Nav.Link>


                                }

                                <Nav.Link as={Link} to="/records" eventKey="3"
                                >
                                    Records
                                </Nav.Link>
                                {/* <NavDropdown
                                    title="Dropdown"
                                    id="offcanvasNavbarDropdown-expand"
                                >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Button variant="outline" onClick={handleShow}>
                        <BiSearchAlt />
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <Form className="d-flex">
                                    <FormControl
                                        type="text"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={e => onChangeHandler(e.target.value)}
                                        value={text}
                                        onBlur={() => {
                                            setTimeout(() => {
                                                setSuggestions([])
                                            }, 200)
                                        }}
                                    />
                                </Form>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Search Results</p>
                            {suggestions && suggestions.map((sug) => {
                                return (
                                    <>
                                <div key={sug.id} 
                                
                                // onClick={() => {
                                //     onSearchHandler(<Link to={"/records/" + `${search.id}`}></Link>)
                                // }}
                                
                                >{sug.title}</div> 
                                <Link variant='outline-secondary' className='suggestion text-end' to={'/records/' + sug.id} onClick={handleClose}>view item</Link>
                                </>
                                )
                            })}
                        </Modal.Body>
                        
                    </Modal>

                </Container>
            </Navbar>
        </>
    )
}

import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, FormControl, Navbar, Dropdown, Nav, Badge, ListGroup, Modal } from 'react-bootstrap'
import { BiCart } from 'react-icons/bi'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { BsFillVinylFill } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'

import { Offcanvas, Form, Button } from 'react-bootstrap'
import UserContext from '../context/UserContext'

import config from '../config'
const BASEURL = config.BASE_API_URL

export default function Header() {

    const context = useContext(UserContext)
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false)
    const [cart, setCart] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [search, setSearch] = useState([])

    // quick search modal
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleClose = () => {
        setShow(false)
        setText('')
        setSuggestions([])
    };

    const handleShow = () => setShow(true);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log("check")
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
    }, [accessToken]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getSearch = async () => {
            let response = await axios.get(BASEURL + '/search')
            setSearch(response.data)
        }
        getSearch()
    }, [])

    useEffect(() => {
        const getCart = async () => {
            if (context.logIn) {
                let userId = localStorage.getItem("id")
                console.log(userId)
                let result = await context.getCart(userId)
                setCart(result)
                console.log(result)
            }
            else {
                console.log('no cart yet')
            }
        }
        getCart()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let totalCost = 0;
        for (let i of context.cartItem) {
            totalCost += (i.record.price * i.quantity)
        }
        setTotalCost(totalCost)
    }, [context.cartItem])



    function setCurrency(price) {
        let dollars = price / 100;
        dollars = dollars.toLocaleString("en-SG", {
            style: "currency",
            currency: "SGD"
        })
        return dollars
    }

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

    return (
        <>
            <Navbar collapseOnSelect fixed='top' variant='dark'
                expand='md' className="mb-3 color-nav" style={{ height: 80 }}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/"
                        className='order-md-0 mx-auto order-1'
                    >
                        <BsFillVinylFill fontSize="25px" />
                        <span> VINYL JUKEBOX</span>
                    </Navbar.Brand>


                    <Navbar.Toggle
                        aria-controls="offcanvasNavbar-expand"
                        className="order-md-1 order-0"
                    />

                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand"
                        aria-labelledby="offcanvasNavbarLabel-expand"
                        placement="start"

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

                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    {/* search icon and modal starts */}
                    <Button variant="outline" onClick={handleShow}>
                        <BiSearchAlt style={{ color: 'white' }} />
                    </Button>
                    <Modal show={show} onHide={handleClose} dialogClassName='modal-80w'>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <Form className="d-flex justify-content">
                                    <FormControl
                                        style={{ width: '70vw' }}
                                        type="text"
                                        placeholder="Quick Search"
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
                                        <ListGroup variant="flush" key={sug.id} >
                                            <ListGroup.Item>{sug.title}
                                                <br />
                                                <Link variant='outline-secondary' className='suggestion' to={'/records/' + sug.id} onClick={handleClose}>view item</Link>
                                            </ListGroup.Item>
                                        </ListGroup>

                                    </>
                                )
                            })}
                        </Modal.Body>

                    </Modal>
                    {/* search icon and modal ends */}

                    {/* cart dropdown start  */}
                    <Dropdown>
                        <Dropdown.Toggle variant='dark'>

                            <Badge bg='inherit' >
                                <BiCart color='dark' fontSize='20px' />
                                {context.cartItem.reduce((accum, item) => accum + item.quantity, 0)}
                            </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 325 }}>

                            {context.cartItem.length > 0 ? (
                                <>

                                    {context.cartItem.map((p) => {
                                        return (
                                            <span className="cartitem" key={p.id}>
                                                <img
                                                    src={p.record.image_url}
                                                    className="cartItemImg"
                                                    alt={p.record.title}
                                                />
                                                <div className="cartItemDetail">
                                                    <span>{p.record.title}</span>
                                                    <span>{setCurrency(p.record.price)} </span>
                                                    <span>{p.quantity}</span>{ }
                                                </div>

                                            </span>
                                        )
                                    })}
                                    <hr />
                                    <p className='text-center'> SUBTOTAL:
                                        ${(totalCost / 100).toFixed(2)}  </p>
                                    <Link to="/cart">
                                        <Button variant='outline-secondary' style={{ width: "95%", margin: "0 10px" }} >
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            )

                                :
                                (<>
                                    <span style={{ padding: 10 }}>Cart is Empty! </span></>)}

                        </Dropdown.Menu>
                    </Dropdown>
                    {/* cart dropdown ends */}
                </Container>
            </Navbar>
        </>
    )
}
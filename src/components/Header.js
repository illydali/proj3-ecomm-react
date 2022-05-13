
import  React, { useContext }  from 'react'
import { Link } from 'react-router-dom'
import { Container, FormControl, Navbar, Dropdown, Nav, Badge } from 'react-bootstrap'
import { BiCart } from 'react-icons/bi'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { BsFillVinylFill } from 'react-icons/bs'

// test stuff here
import { Offcanvas, NavDropdown, Form, Button } from 'react-bootstrap'
import UserContext from '../context/UserContext'
export default function Header() {
   
    const context = useContext(UserContext)

    return (
        <>
            {/* <Navbar collapseOnSelect fixed='top' className='color-nav' variant='dark' style={{ height: 80 }}>
                <Container>
                    <Navbar.Brand as={Link} to='/'>
                       VINYL SHOP
                    </Navbar.Brand>
                    <Navbar.Text className='search'>

                        <FormControl
                            style={{ width: 200 }}
                            placeholder='Search a Product'
                            className='m-auto'
                        />

                    </Navbar.Text>
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to='/records'>Records </Nav.Link>
                        <Nav.Link as={Link} to='/login'>Login </Nav.Link>

                        {/* <Dropdown align='end'>
                            <Dropdown.Toggle variant='secondary'>
                                <BiCart color='white' fontSize='25px' />
                                <Badge bg='inherit'> {10} </Badge>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ minWidth: 370 }}>
                                <span style={{ padding: 10 }}>Cart is Empty! </span>
                            </Dropdown.Menu>
                        </Dropdown> */}
            {/* <IoPersonCircleOutline color='white' fontSize='25px' />

                    </Nav>

                </Container>
            </Navbar> */}

            {/* <> */}

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
                    <Dropdown >
                    <Dropdown.Toggle variant='light'>
                        <BiCart color='dark' fontSize='20px' />
                        <Badge bg='inherit'> {10} </Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: 325 }}>
                        <span style={{ padding: 10 }}>Cart is Empty! </span>
                    </Dropdown.Menu>
                </Dropdown>
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
                               
             
                                <Nav.Link as={Link} to="/login" eventKey="2"
                                    >
                                    Login
                                </Nav.Link>

            
                                <Nav.Link as={Link} to="/profile" eventKey="2"
                                    >
                                      
                                    Profile
                                </Nav.Link>
              

                            

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
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

import React from 'react'
import { Container, FormControl, Navbar, Dropdown, Nav, Badge  } from 'react-bootstrap'
import { BiCart } from 'react-icons/bi'

export default function Header() {
    return (
        <Navbar className='color-nav' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <a href='/'> Logo </a>
                </Navbar.Brand>
                <Navbar.Text className='search'>

                    <FormControl
                        style={{ width: 200 }}
                        placeholder='Search a Product'
                        className='m-auto'
                    />

                </Navbar.Text>
                <Nav>
                    <Dropdown align='end'>
                        <Dropdown.Toggle variant='secondary'>
                            <BiCart color='white' fontSize='25px' />
                            <Badge bg='inherit'> {10} </Badge> 
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            <span style={{ padding: 10 }}>Cart is Empty! </span>
                        </Dropdown.Menu>
                    </Dropdown>

                </Nav>

            </Container>
        </Navbar>
    )
}
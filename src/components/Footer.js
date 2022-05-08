import React from "react"
import { Link } from "react-router-dom"
import {Navbar, Nav} from 'react-bootstrap'

export default function Footer() {
    return (
        <Navbar fixed='bottom'>
        
            <section className="footer-center">
                <p className="footer-header">Get App</p>
                <ul className="footer-list">
                    <li className="footer-link"><Nav.Link href="https://play.google.com/store" target="_blank" rel="noreferrer" className="footer-link-cta">Google Play Store</Nav.Link></li>
                    <li className="footer-link"><Nav.Link href="https://www.apple.com/sg/app-store/" target="_blank" rel="noreferrer" className="footer-link-cta">Apple App Store</Nav.Link></li>
                </ul>
            </section>
            <section className="footer-right">
                <p className="footer-header">Contact</p>
                <ul className="footer-list">
                    <li className="footer-link"><p className="footer-text">01233456</p></li>
                    <li className="footer-link"><p className="footer-text" style={{
                        fontSize: "0.8em"
                    }}>© All rights reserved</p></li>
                </ul>
            </section>
 

    </Navbar>
    )
}
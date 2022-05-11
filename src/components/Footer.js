import React from "react"
import { Link } from "react-router-dom"
import {Navbar, Nav} from 'react-bootstrap'

export default function Footer() {
    return (
    //     <Navbar fixed='bottom'>
        
    //         <section className="footer-center">
    //             <p className="footer-header">Get App</p>
    //             <ul className="footer-list">
    //                 <li className="footer-link"><Nav.Link href="https://play.google.com/store" target="_blank" rel="noreferrer" className="footer-link-cta">Google Play Store</Nav.Link></li>
    //                 <li className="footer-link"><Nav.Link href="https://www.apple.com/sg/app-store/" target="_blank" rel="noreferrer" className="footer-link-cta">Apple App Store</Nav.Link></li>
    //             </ul>
    //         </section>
    //         <section className="footer-right">
    //             <p className="footer-header">Contact</p>
    //             <ul className="footer-list">
    //                 <li className="footer-link"><p className="footer-text">01233456</p></li>
    //                 <li className="footer-link"><p className="footer-text" style={{
    //                     fontSize: "0.8em"
    //                 }}>© All rights reserved</p></li>
    //             </ul>
    //         </section>
 

    // </Navbar>

    <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">Footer Content</h5>
                <p>Here you can use rows and columns to organize your footer content.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                    <li><a href="#!">Link 3</a></li>
                    <li><a href="#!">Link 4</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                    <li><a href="#!">Link 1</a></li>
                    <li><a href="#!">Link 2</a></li>
                    <li><a href="#!">Link 3</a></li>
                    <li><a href="#!">Link 4</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
    </div>

</footer>
    )
}
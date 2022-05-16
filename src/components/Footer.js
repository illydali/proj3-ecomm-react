import React from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'
import { AiFillGithub, AiOutlineCopyright, AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import { BsTelegram } from 'react-icons/bs'
import { MdOutlineMailOutline } from 'react-icons/md'
export default function Footer() {
    return (
        <div className="footer-wrapper">
            <footer className="page-footer font-small blue pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-6 mt-md-0 mt-3">
                            <h5 className="text-uppercase">Meet us in person</h5>
                            <p>18A Duxton Hill, Singapore 089475</p>
                            <p>6555 2344</p>
                            <a herf="https://admin@vinyljukebox.com">
                                <p><MdOutlineMailOutline />
                                <span> admin@vinyljukebox.com</span></p></a>
                        </div>

                        <hr className="clearfix w-100 d-md-none pb-0" />

                        <div className="col-md-3 mb-md-0 mb-3">
                            <h5 className="text-uppercase">info</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!">Why Vinyl?</a></li>
                                <li><a href="#!">Link 2</a></li>
                                <li><a href="#!">Link 3</a></li>
                                <li><a href="#!">Link 4</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-md-0 mb-3">
                            <h5 className="text-uppercase">connect</h5>
                            <ul className="list-unstyled">
                                <li><a href="https://github.com/illydali"><AiFillGithub /></a></li>
                                <li><a href="https://www.facebook.com"><AiFillFacebook /> </a></li>
                                <li><a href="https://www.instagram.com"><AiOutlineInstagram /></a></li>
                                <li><a href="https://www.telegram.com"><BsTelegram /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center py-3">
                    2022 <AiOutlineCopyright /> AllRights Reserved
                </div>

            </footer>
        </div>
    )
}
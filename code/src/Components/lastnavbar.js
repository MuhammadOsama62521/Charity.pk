import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl,Container,Row,Col, NavLink } from 'react-bootstrap';
import './appbar2.css';
import { Link } from 'react-router-dom';
import firebase from '../Utilities/firebase';
import { FaFacebook,FaWhatsapp,FaInstagram,FaGoogle } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai"

import { MdMarkunread } from "react-icons/md";
  class lastnavbar extends React.Component {
    render() {
        return (
            <React.Fragment>
                
                <Navbar bg="dark" id="contact-us" variant="dark" className="lastNav" expand="lg">
                <Row>
                    <Col style={{alignItems:"center"}}>
                    <Navbar.Brand ><b>About</b></Navbar.Brand>
                    <Navbar.Brand style={{float:"right",paddingRight:"10px"}}><b>Contact Us</b></Navbar.Brand>
                        <br/>
                        <div style={{alignItems:"center",display:"flex"}}>
                        <Navbar.Brand ><b>Mission</b>
                        <div>
                        <p>
                        <Col>
                        providing the NGO's with all the funds 
                      </Col>
                        <Col>
                        neccecarry for them to
                        </Col>
                        <Col>
                        operate their work in an inovative way
                        </Col>
                        
                        </p>

                        </div>
                        </Navbar.Brand>
                        <Navbar.Brand style={{paddingLeft:"60px"}} ><b>Vision</b>
                        <div>
                        <p>
                        <Col>
                        customer gets his/her product, NGO's are helped
                        
                      </Col>
                        <Col>
                         in the form of cast, Donor can getrid of unneccecary 
                        
                        </Col>
                        <Col>
                        things by donating them to different NGOs.
                        </Col>
                        
                        </p>
                      
                        </div>
                        </Navbar.Brand>
                        
                        <Navbar.Brand style={{paddingLeft:"150px"}}>
                        
                   <FaFacebook/><label style={{paddingLeft:"5px"}}><a style={{textDecoration:'none',color:"white",backgroundColor:"dark"}} href="https://www.facebook.com/duos.osama" target="_blank">Facebook</a></label>
                   <br/>
                   <FaWhatsapp/><label style={{paddingLeft:"5px"}}>Whatsapp</label> 
                   <br/>
                   <FaInstagram/><label style={{paddingLeft:"5px"}}>Instagram</label>
                   <br/>
                   
                   <MdMarkunread/><label style={{paddingLeft:"5px"}}><a style={{textDecoration:'none',color:"white",backgroundColor:"dark"}} href="mailto:Duos62521@gmail.com?" target="_blank">Gmail</a></label>
                   <br/>
                   <AiOutlineTwitter/><label style={{paddingLeft:"5px"}}>Twitter</label>
                   </Navbar.Brand> 
                        </div>
                    </Col>
                    </Row>
                  
                    </Navbar>
                        
                        
                
                
               
            </React.Fragment>
        )
    }
}

export default lastnavbar;
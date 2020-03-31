import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import './appbar2.css';
import Donor from '../Screens/Donor';
import about from '../Screens/about';
import { Link,withRouter } from 'react-router-dom';
import firebase from '../Utilities/firebase';
import swal from 'sweetalert';
import { MdAccountCircle } from "react-icons/md";

class Appbar2 extends React.Component {

    state = {
        uname: '',
        userID: '',
        email: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    uname: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                })
            }
        })
        
    }
    loginWithGmail = () => {
        const { uname } = this.state;
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result.user)
            this.setState({
                uname: result.user.displayName,
                email: result.user.email
            })
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    logout = () => {

        firebase.auth().signOut().then(() => {
            
            this.props.history.replace('/')
            swal("Logged Out")
           window.location.reload();
            
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }


    render() {
        firebase.auth().currentUser && console.log("cuse", firebase.auth().currentUser.displayName);

        const { uname, email } = this.state;
        console.log(uname);
        return (

            <Navbar bg="dark" variant="dark" id="my-navbar-1" className="one" expand="lg">
                {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link >
                            <Link style={{ textDecoration: 'none', color: "rgba(255,255,255,0.5)",marginRight:"20px" }} to='/'>
                                Home
                            </Link>

                        </Nav.Link>
                        <NavDropdown title="Donate" id="basic-nav-dropdown" style={{marginRight:"20px"}}>
                            <NavDropdown.Item href='Donor'style={{textDecoration:'none',backgroundColor:"white",color:"black"}}>
                                <Link style={{textDecoration:'none',backgroundColor:"white",color:"black"}}  to='/donor' >
                                    Donate Product
                                </Link>
                            </NavDropdown.Item>
                           
                        </NavDropdown>
                        <NavDropdown title="Login" id="basic-nav-dropdown" style={{marginRight:"20px"}}>
                            {/* <NavDropdown.Item>
                                <Link style={{ textDecoration: 'none', color: "black" }} to='/register'>
                                    SignUp
                                </Link>
                            </NavDropdown.Item> */}
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link style={{ textDecoration: 'none', color: "black" }} to='/login'>
                                    SignIn
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                            <NavDropdown.Item>
                                <Link style={{ textDecoration: 'none', color: "black" }} to='/vendor'>
                                    Login As Vendor
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown href="#contact-us" title="Contact Us" id="basic-nav-dropdown" style={{marginRight:"20px"}}>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">FaceBook</NavDropdown.Item>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Instagram</NavDropdown.Item>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Gmail</NavDropdown.Item>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Twitter</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="About Us" id="basic-nav-dropdown" style={{marginRight:"20px"}}>

                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Mission</NavDropdown.Item>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Vision</NavDropdown.Item>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Who We are?</NavDropdown.Item>
                            <NavDropdown.Item style={{backgroundColor:"white",color:"black"}} href="#contact-us">Help</NavDropdown.Item>

                        </NavDropdown >

                    </Nav>

                    <Nav className="ml-auto">
                        <NavDropdown style={{ float: 'right', paddingLeft: '100px' }} title="My Account" id="basic-nav-dropdown">
                            <NavDropdown.Item  onClick={this.loginWithGmail}>SignIn with Gmail</NavDropdown.Item>
                            <NavDropdown.Divider />
                            
                            <NavDropdown.Item ><br/><MdAccountCircle/><b>{this.state.uname}</b></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item ><br />{this.state.email}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                        </NavDropdown >
                    </Nav>
                    {/* <Form inline>

                    </Form> */}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Appbar2);

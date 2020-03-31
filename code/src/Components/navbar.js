import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import './appbar2.css';
import firebase from '../Utilities/firebase';

import { Link } from 'react-router-dom';

class Appbar extends React.Component {

    

    render() {
      
        return (
            <div>
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <header>
                    <Navbar  className="mainNav" expand="lg">
                        <Navbar.Brand ><b>CHARITY.PK</b></Navbar.Brand>
                        <Navbar.Brand style={{ float: 'right',paddingLeft: '1175px' }}><b>GIVING THE DESERVINGS</b></Navbar.Brand>
                    </Navbar>
                    {/* <Nav style={{ float: 'right' }} >Giving the deserving</Nav> */}
                    </header>
                    
                </Link>
                {/* <div>
                  Welcome: {name}
                </div> */}
            </div>

        )
    }
}

export default Appbar;

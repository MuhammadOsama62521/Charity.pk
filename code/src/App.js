import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import firebase from './Utilities/firebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Appbar2 from './Components/appbar';
import Appbar from './Components/navbar';
import Modal from './Components/modal';
import AdsCard from './Components/AdsCard';
import Login from './Components/login'
import Register from './Components/register'
import Lastnavbar from './Components/lastnavbar';

import FourZeroFourPage from './Components/FourZeroFour';

// Screens
import Donor from './Screens/Donor';
import About from './Screens/about';
import vendor from './Screens/vendor';
import sylani from './Screens/sylani';
import kkf from './Screens/kkf';
import customer from './Screens/customer';
import { Container, Row, } from 'react-bootstrap';
import shokatkhanum from './Screens/shokatkhanum';
import about from './Screens/about';
import admin from './Screens/admin'

class App extends Component {
  

  render() {

    return (
      <BrowserRouter>
        <React.Fragment>
          <Appbar />
          <Appbar2 />
          <Switch>
            
          <Route path='/' exact component={AdsCard} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/donor' exact component={Donor} />
            <Route path='/about' exact component={About} />
            <Route path='/vendor' exact component={vendor} />
            <Route path='/sylani' exact component={sylani} />
            <Route path='/kkf' exact component={kkf} />
            <Route path='/shokatkhanum' exact component={shokatkhanum} />
            <Route path='/admin' exact component={admin}/>
            <Route path='/customer/:key/:name' exact component={customer} />
            <Route path='*' component={FourZeroFourPage} />
          </Switch>
          <br/>
          <Lastnavbar/>
        </React.Fragment>
      </BrowserRouter>
      
    )
  }
}

export default App;
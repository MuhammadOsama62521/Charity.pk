import React, { Component } from 'react'
import firebase from '../Utilities/firebase';
import { Form, Button, Container } from 'react-bootstrap';
import swal from 'sweetalert';
import { Link,withRouter } from 'react-router-dom';
import '../App.css';

import logo from '../Components/white3.jpg';
class vendor extends Component {
  state = {
    email: '',
    password: '',
    type: '',
    

  }

  login = () => {
    //console.log("hn?")
    const { email, password } = this.state;
    if(password!==''){
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        const userid = firebase.auth().currentUser.uid
        const userRef = firebase.database().ref().child("Vendor").child(userid);
        userRef.on('value', snapshot => {
          console.log(snapshot.val())
          if(!snapshot.val()){
            firebase.auth().signOut().then(()=> {
              
              swal("User Cannot LogIn")
              window.location.reload();
              this.props.history.replace('/')
              // Sign-out successful.
            }).catch(function(error) {
              // An error happened.
            });
          }
          else if (snapshot.val().name === "Sylani") {
            console.log("ok");
            this.props.history.replace('/sylani')
          }
          else if(snapshot.val().name === "kkf"){
            this.props.history.replace('/kkf')
          }
          else if(snapshot.val().name==="shokatkhanum")
          {
            this.props.history.replace('/shokatkhanum')
          }
          else{
            firebase.auth().signOut().then(()=> {
              // Sign-out successful.
            }).catch(function(error) {
              // An error happened.
            });
            this.props.history.replace('/')
          }
          console.log("User logined");
        })
      })
      .catch(function (error) {
          // Handle Errors here.
          swal("Incorrect Details")
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ...
        });
    }
    else{
      swal("please enter password")
    }
    

      }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {

    
    return (
      <React.Fragment  >
        <br />
        <Container   style={{padding:"140px 0",widt:"100% !important"}} >
          <div className="login" style={{backgroundImage:`url(${logo})`}}>
          <h1 style={{ margin: 'auto', color: 'black', fontSize: 'large' }}><b>PLEASE LOGIN</b></h1>
          <br/>
          <Form.Group  controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control  onChange={this.handleInput} name="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={this.handleInput} name="password" type="password" placeholder="Password" />
          </Form.Group>
          <Button onClick={this.login} variant="primary" type="submit">
            LogIn
          </Button>
          </div>
         
        </Container>
      </React.Fragment>
    )
  }
}
export default withRouter(vendor) ;

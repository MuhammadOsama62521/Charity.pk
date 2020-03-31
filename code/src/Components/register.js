
import React, { Component } from 'react';
import firebase from '../Utilities/firebase';
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';


class register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showRegister: true,
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  
  //function to be runned when button is clicked
  verifyRegistration = () => {

    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      swal("Password and Confirm Password not same");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .database()
            .ref()
            .child('Users')
            .child(firebase.auth().currentUser.uid)
            .set({
              name: this.state.name,
            })

          this.setState({
            showRegister: false,
          })

          swal("User Registered");
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error)
          // ...
        });
    }
    
  }

  render() {
    const { email, password, showRegister } = this.state;
    return (
      <React.Fragment>
        {showRegister &&
          <React.Fragment>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" onChange={this.handleInput} type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" onChange={this.handleInput} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" onChange={this.handleInput} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control name="confirmPassword" onChange={this.handleInput} type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button onClick={this.verifyRegistration} variant="primary" type="submit">
              Register
              </Button>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default register;
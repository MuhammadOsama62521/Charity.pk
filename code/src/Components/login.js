
import firebase from '../Utilities/firebase';
import {Form,Button, Container,Card} from 'react-bootstrap';
import React, { Component } from 'react';
import swal from 'sweetalert';
import './Form.css';

class login extends Component {
    state={
        email:'',
        password:'',
        user:''

    }
    handleInput = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        })
      }
      login=()=>{
        
          const {email,password}=this.state;
          
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
             
              swal("User logined");
            }).catch(function(error) {
              swal("Incorrect Details")
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });
          
          
          
      }
      loginWithGmail=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=> {
          console.log(result.user)
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(error=> {
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
    render() {
     
        return (
           
          <React.Fragment>
            <br/>
            <Container>
              <Card className="log">
                <Card.Body style={{paddingLeft:'340px',position:'center' }}><h1> <b>LOGIN</b></h1></Card.Body>
                <Card.Body style={{paddingLeft:'300px' }}>
                  <Form>
                    <div style={{margin:'10px',position:'center'}}>
                    <Form.Group className="login" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control onChange ={this.handleInput} name="email" type="email" placeholder="Enter email" />
                </Form.Group>
                    </div>
                  
                <Form.Group  className="login" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange ={this.handleInput} name="password"  type="password" placeholder="Password" />
                </Form.Group>
                <br/>
                <Button className="login"  onClick ={this.login} variant="primary" type="submit">
                  LogIn
              </Button>
              <br/>
              <br/>
              <div>
              <Button onClick={this.loginWithGmail}>Login with Gmail</Button>
              </div>
                  </Form>
                
              
                </Card.Body>
              
              </Card>
            
            </Container>
              
          </React.Fragment>
        );
    }
}

export default login;

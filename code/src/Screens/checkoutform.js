import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import firebase from '../Utilities/firebase';
import swal from 'sweetalert';
import { Link,withRouter } from 'react-router-dom';

class CheckoutForm extends Component {
    state = {
        email: '',
        uname: '',
        id:''
    }

    componentDidMount(){
        const { key } = this.props;
        this.setState({
            id:key
        })
        console.log(this.state.id,"okk")
    }
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {

        let uname = firebase.auth().currentUser.displayName;
        let email = firebase.auth().currentUser.email;

        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                console.log("asdaokokok",user)
                // User is signed in.
                const { product } = this.props;
                const { key } = this.props;
                console.log("osama",key)
                console.log("purchace", product)
                let token = await this.props.stripe.createToken({
                    name: uname,
                    email: email,
                });
                console.log(token.token);
                axios({
                    url: 'http://localhost:8080/checkout',
                    method: 'POST',
                    data: {
                        token: token.token,
                        product: product
                    }
                }).then(res => {
                    swal("Sucess");
                    console.log("osama",res.data);
                    //console.log("osamaOSAMA",id);
                }).catch(err => {
                    console.log(err);
                })
            } else {
                swal("Please Login first")
                // No user is signed in.
            }
        });








        // let { token } = await this.props.stripe.createToken({
        //     name: "Name",
        //     email: 'osama@gmail.com',

        // });
        // console.log(token);
        // let response = await fetch(`http://localhost:8080/checkout`, {
        //     method: "POST",
        //     headers: { "Content-Type": "text/plain" },
        //     body: {
        //         token,
        //         // product: product
        //     }
        // });

        // if (response.ok) console.log("Purchase Complete!")
    }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <br />
                <Button onClick={this.submit}>Purchase</Button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
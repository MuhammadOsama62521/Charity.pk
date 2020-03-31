import React, { Component } from 'react'
import { Container, Button, Modal,Card,Col,Row,Form } from 'react-bootstrap'
import firebase from '../Utilities/firebase';
import { Elements, StripeProvider } from 'react-stripe-elements';
//import CheckoutForm from './CheckoutForm';
import CheckoutForm from './checkoutform';
import { Link,withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import '../App.css';

class customer extends Component {
    state = {
        url: '',
        discrip: '',
        radio: '',
        price: '',
        pname: '',
        product:[],
        uname:'',
        id:'',
        show:false,
        show2:false,
        cname:'',
        address:'',
        city:'',
        productid:'',
        number:''

    }
    componentDidMount() {
const{uname,id}=this.state;

  
        const { key, name } = this.props.match.params
        const { url, price } = this.state;
        
        const userRef = firebase.database().ref().child(name).child("product").child(key);
       
        
        userRef.on('value', snapshot => {
            console.log("done", snapshot.val());
            this.setState({
                product:snapshot.val(),
                url: snapshot.val().url,
                discrip: snapshot.val().discrip,
                price: snapshot.val().price,
                pname: snapshot.val().pname
            })

        })
    }
    RadioChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    
handleShow=()=>{
    if(firebase.auth().currentUser&&firebase.auth().currentUser.displayName!==null)
    {
        const{show}=this.state
    this.setState({
        show:true
    })}

else{
    swal("LOGIN FIRST")
} 
}
handleClose=()=>{
   

    const{show}=this.state
this.setState({
    show:false
})
}
handlePay=()=>{
   if(firebase.auth().currentUser&&firebase.auth().currentUser.displayName!==null){
    const{show2}=this.state
    this.setState({
        show2:true
    })
   }
   else{
       swal("LOGIN FIRST")
   } 
   
    }
handleClosePay=()=>{
    const{show2}=this.state
    this.setState({
        show2:false
    })
}

handleInput=(event)=>{
  this.setState({
      [event.target.name]: event.target.value,
    })
}
handletext=(ex)=>{
  this.setState({
      [ex.target.name]:ex.target.value
  })
}
handlecity=(ez)=>{
  this.setState({
    [ez.target.name]:ez.target.value
})
}
handlenumber=(ef)=>{
  this.setState({
    [ef.target.name]:ef.target.value
})
}

handleupload=()=>{
  const { key,name } = this.props.match.params
    console.log(key)
    if(this.state.cname!=='' &&this.state.address!==''&&this.state.city!==''&&this.state.contact!=='')
    {
      firebase
      .database()
      .ref()
      .child('orders')
      .child('customer')
      .push({
        name:this.state.cname,
        address:this.state.address,
        city:this.state.city,
        pid:key,
      pname:this.state.pname,
      amount:this.state.price,
      contact:this.state.number,
      status:'not delieverd'
  
      })
      firebase.database().ref().child(name).child('product').child(key).update({approval:false}).then(()=>{
        swal("ThankYou for Purchasing")
        this.props.history.replace('/')
  
      })
    }
   else{
     swal("please fill all the details")
   }
    
    
}



    render() {
        const { url, discrip, radio, price, pname,product,id,show,show2 } = this.state;
        const { name,key } = this.props.match.params;
        console.log(show)
        return (

            <React.Fragment>
                <Container>
                  <br/>
                      <div className="main">
                      <Row>
                        <Col className="name" xs lg="12" style={{paddingRight:"1px"}}> <h1>VENDOR: {name}</h1></Col>
                        <Col style={{marginLeft:"5px"}} md={5}> <img src={url || 'https://via.placeholder.com/342x346'} alt="Upload Images" height="346" width="342" /></Col>
                        <Col md={5} Style={{width:'50rem'}}>
                            <Container>
                              <div className="customer">
                              <Card Style={{padding:'40px',width:'50rem',border:"1px solid black"}}>
                                <Card.Title className="title" style={{paddingRight:"5px"}}>
                                <h2 style={{paddingRight:"5px"}}><b>{pname}</b></h2>
                                </Card.Title>
                                
                                <Card.Body style={{marginBottom:"40px"}}>
                                <label><b>Price</b></label>  <br/> 
                                 {price}Rs
                                </Card.Body>
                                <Card.Body style={{marginBottom:"40px"}}>
                                <h6> <b>Description</b> <br/>{discrip}</h6>
                                </Card.Body>
                            </Card>
                              </div>
                            
                            </Container>
                            

                        </Col>
                    </Row>
                    <br/>
                   <Row>
                     <Col>
                     <Button style={{marginLeft:"3px",marginBottom:"3px"}} onClick={this.handleShow}>
                        CashOnDelievery
                    </Button>
                    
                    <Button style={{marginLeft:"10px",marginBottom:"3px"}} onClick={this.handlePay}>
                        PayOnline
                    </Button>
                     </Col>
                   </Row>
                    
</div>
                    
                    {/* //cash on deliever */}
                   
                    <Modal style={{marginTop:"50px"}} show={this.state.show} onHide={this.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Please Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control name="cname" onChange={this.handleInput} type="text" placeholder="Full Name" />
    </Form.Group>

  
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control name="address" onChange={this.handletext} placeholder="1234 Main St" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Contact Number</Form.Label>
    <Form.Control name="number" onChange={this.handlenumber} placeholder="03XXXXXXXXX" />
  </Form.Group>
  
  <Form.Row>
   

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>City</Form.Label>
      <Form.Control name="city" onChange={this.handlecity} as="select">
        <option>Choose...</option>
        <option>Karachi</option>
        <option>Islamabad</option>
        <option>Lahore</option>
        <option>Larkana</option>
      </Form.Control>
    </Form.Group>
  </Form.Row>
</Form>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.handleupload}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
{/* online pay */}
<br/>

<Modal style={{marginTop:"50px"}} show={this.state.show2} onHide={this.handleClosePay}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Card Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <StripeProvider apiKey="pk_test_oxrfIvCnUAYvMeVLgmEnIEqt00gVMEbMyA">
                <Elements>
                <CheckoutForm product={this.state.product} key={this.props.key}/>
                </Elements>
             </StripeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClosePay}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
                </Container>
            </React.Fragment>
        )
    }
}
export default withRouter(customer);
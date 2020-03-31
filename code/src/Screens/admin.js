
import { Container, Button, Modal,Card, Row,
    Col,CardDeck,Table} from 'react-bootstrap'
import firebase from '../Utilities/firebase';
import { Elements, StripeProvider } from 'react-stripe-elements';
//import CheckoutForm from './CheckoutForm';
import CheckoutForm from './checkoutform';
import { Link,withRouter } from 'react-router-dom';
import '../App.css';

import React, { Component } from 'react'

 class admin extends Component {
     state={
         products:[],
         name:'',
         orders:[]
     }
     componentDidMount(){
      this.getordersFromDB()
      
     }
     getordersFromDB=()=>{
      
      const array = [];
      let obj;
      firebase
          .database()
          .ref()
          .child('orders')
          .child('customer')
          .on('value', snapShot => {
            snapShot.forEach(value => {
               
                    obj = value.val()
                   
                    this.state.orders.push(obj)
                    console.log("my",this.state.orders)
            })
          })
         
          this.setState({
            orders: array
          }, () => { console.log(this.state.orders) })
          
     }
     handleupload=()=> {
        const arrayProducts = [];
        let obj, key;
        
        firebase
          .database()
          .ref()
          .child('Sylani')
          .child('product')
          .once('value', snapShot => {
            snapShot.forEach(value => {
                if(value.val().approval === true){
                  
                    obj = value.val()
                    key = { key: value.key }
                    const name = "Sylani"
                    obj = { ...obj, ...key, name }
                    arrayProducts.push(obj)
                }
            })
          })
        firebase
          .database()
          .ref()
          .child('kkf')
          .child('product')
          .on('value', snapShot => {
            snapShot.forEach(value => {
                if(value.val().approval===true){
                    obj = value.val()
                    key = { key: value.key }
                    const name = "kkf"
                    obj = { ...obj, ...key, name }
                    arrayProducts.push(obj)
                }
              
            })
          })
        firebase
          .database()
          .ref()
          .child('shokatkhanum')
          .child('product')
          .on('value', snapShot => { 
              
            snapShot.forEach(value => {
                console.log("skt",value.val())
                if(value.val().approval===true){
                    console.log("lazmi chalna h")
                    obj = value.val()
                    key = { key: value.key }
                    const name = "shokatkhanum"
                    obj = { ...obj, ...key, name }
                    arrayProducts.push(obj)
                }
                })
          })
       
        this.setState({
          products: arrayProducts
        }, () => { console.log(this.state.products) })
      }
    
      handleDelete=(key,name)=>{
        alert(key)
        console.log("vendor",name);
        firebase.database().ref().child(name).child('product').child(key).update({approval:false})
        window.location.reload();
   
    }
    render() {
        const{products,orders}=this.state;
        console.log("his",orders)
        return (
            <React.Fragment>
                <Container className="main2">
                  <div>
                  <div style={{alignItems:"center",paddingLeft:"450px"}}>
                    <h1>
                        <b>
                        Welcome
                          </b>
                    </h1>
                    </div>
                    <br/>
                    
                    <div className="admin1">
                      <div style={{alingText:"center",display:"flex",paddingLeft:"435px"}}>
                      <h2><b>Products On Site</b></h2>
                      </div>
                    
                    <CardDeck>
                        
                            {products.map((value, index) => {
                                return (
                                    <Row>
                                        
                                        <Col>
                                        <br/>
                                        <Card class="product-cart" style={{ width: '21.5rem' }}>
                                            <Card.Img variant="top" style={{ width: 342, height: 346 }} src={value.url} fluid />
                                            <Card.Body style={{backgroundColor:"whitesmoke"}}>
                                                <Card.Title>{value.pname}</Card.Title>
                                             
                                                
                                            <div class="product-details" style={{display:"flex", justifyContent:"space-between"}}>
                                            <Card.Link style={{marginRight:"3px"}}>Vendor {value.name}</Card.Link>
                                                <Card.Link >Rs {value.price} </Card.Link>
                                          
                                                </div>

                                                <div style={{display:"flex", justifyContent:"flex-end"}}>

                                                </div>
                                                <div style={{display:"flex", justifyContent:"flex-end"}}>

                                                <Button onClick={() => this.handleDelete(value.key,value.name)}variant="primary" style={{ margin:"15px 0"}}>
                                                   
                                                   UnApprove
                                                    
                                                    </Button>
                                                </div>
                                                
                                               
                                            </Card.Body>
                                            
                                            
                                        </Card>
                                        </Col>
                                    </Row>
                                   
                                    
                                )
                            })}

                           </CardDeck>
                         
                    </div>
                    
                    <br/>
                    <br/>
                    <hr/>
                    <br/>
                    <div style={{alignItems:"center",paddingLeft:"475px"}}>
                    <h1>
                        Orders
                    </h1>
                    </div>
                              <Table striped bordered hover>
                                    <thead style={{width:"1000px"}}>
                                      <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Contact Number</th>
                                        <th>City</th>
                                        <th>Product Purchased</th>
                                        <th>Product Id</th>
                                        <th>Total Amount</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      
                                      {orders.map((v, i) => {
                              return(
                              <tr>
                                        <td>{i}</td>
                                        <td>{v.name}</td>
                                        <td>{v.address}</td>
                                        <td>{v.contact}</td>
                                        <td>{v.city}</td>
                                        <td>{v.pname}</td>
                                        <td>{v.pid}</td>
                                        <td>{v.amount}</td>
                                        <td>{v.status}</td>
                                        </tr>
                                        )
                                      })}
                                      
                                     
                                      
                                      
                                    </tbody>
                                  </Table>
                  </div>
                  <div style={{marginLeft:"1px",marginBottom:"100px"}}>
                                  <Button className="but"style={{marginLeft:"0px",marginBottom:"00px"}}  onClick={this.handleupload}>
                                     View 
                                  </Button>
                                  </div>
                    
                </Container>
            </React.Fragment>
        )
    }
}
export default admin;
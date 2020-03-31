import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "../Utilities/firebase";
import {
    Form,
    Button,
    Container,
    Carousel,
    Card,
    CardDeck,
    ButtonGroup,
    fluid,
    Row,
    Col,
    
} from 'react-bootstrap';
import './appbar2.css';
import logo from './124.PNG';

import dona from './heart.jpg';
import sya from './sya.jpg';
import donation from './donation.jpg';
import About from '../Screens/about';
import Lastnavbar from '../Components/lastnavbar';
class AdsCard extends Component {
    state = {
        products: [],
        approval:''
      }
    
        componentDidMount() {
            debugger
        this.getProductsFromDB();
      }
    
      getProductsFromDB  =()=>  {
        const arrayProducts = [];
        let obj, key;
        
       
    //   await {} 
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
    render() {
        const { products } = this.state;
console.log("sec",products)
        return (
            <div className="card">
                <Container>
                    <React.Fragment>
                        <br />
                        <br />
                        <Carousel >
                            <Carousel.Item>
                                <img
                                    style={{ width: 1110, height: 346 }}
                                    className="d-block w-100"
                                    src={dona}
                                    alt="First slide"
                                />
                                <Carousel.Caption style={{color:"black",fontSize:"30px"}}>
                                    <h3>WANT TO LIVE HAPPY?</h3>
                                    <p><b>DONATE</b></p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            
                            <Carousel.Item>
                                <img
                                    style={{ width: 1110, height: 346 }}
                                    className="d-block w-100"
                                    src={donation}
                                    alt="Third slide"
                                />

                                <Carousel.Caption style={{color:"WHITE",fontSize:"30px"}} >
                                   
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    style={{ width: 1110, height: 346 }}
                                    className="d-block w-100"
                                    src={sya}
                                    alt="Fourth slide"
                                />

                                <Carousel.Caption  style={{color:"black",fontSize:"30px"}} >
                                    <h3><b>HELP THE NGO'S TO RAISE FUNDS</b></h3>
                                    
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <br />
                        <br />
                        <br />
                        <div>
                            
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
                                                {/* <Card.Text style={{width: 300, height: 75}}>
                                                   {value.discrip}
                                                </Card.Text> */}
                                                
                                            <div class="product-details" style={{display:"flex", justifyContent:"space-between"}}>
                                            <Card.Link style={{marginRight:"3px"}}>Vendor {value.name}</Card.Link>
                                                <Card.Link >Rs {value.price} </Card.Link>
                                          
                                                </div>

                                                <div style={{display:"flex", justifyContent:"flex-end"}}>

                                                <Button variant="primary" style={{ margin:"15px 0"}}>
                                                    <Link style={{ textDecoration: 'none' ,color:"white"}} to ={`/customer/${value.key}/${value.name}`}>
                                                    Buy Product
                                                    </Link>
                                                    </Button>
                                                </div>
                                                
                                               
                                            </Card.Body>
                                            
                                            
                                        </Card>
                                        </Col>
                                    </Row>
                                    
                                )
                            })}
                            
                        </CardDeck>
                        <br/>
                        <br/>
                        {/* <About/> */}
                        
                    </React.Fragment>
                </Container>
                {/* <Lastnavbar/> */}
            </div>
            
        );
    }
}

export default AdsCard;
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from '../Utilities/firebase';
import { Form,
    Button,
    Container,
    Carousel,
    Card,
    CardDeck,
    ButtonGroup,
    fluid,
    Row,
    Col,} from 'react-bootstrap'
    import swal from 'sweetalert';
    import '../App.css';

 class kkf extends Component {
    state = {
        products: [],
        approvedProducts:[],
        id:'',
        price:'',
        renderFlag:false,
      }
      componentDidMount() {
        this.getProductsFromDB();
      }
    
      getProductsFromDB = () => {
        const arrayProducts = [];
        let id1;
        let obj, key;
        
        //then({()=>})
       
        firebase
          .database()
          .ref()
          .child('kkf')
          .child('product')
          .once('value', snapShot => {
              console.log(snapShot.val())
            snapShot.forEach(value => {
              obj = value.val()
              key = { key: value.key }
              id1 =value.key
              const name = "kkf"
              obj = { ...obj, ...key, name }
              arrayProducts.push(obj)
            })
          })
        this.setState({
          products: arrayProducts,
        //   id:id1
          renderFlag:true
          
        }, () => { console.log("okaodkaos",this.state.id) })
        
      }
      handleApprove=(key)=>{
        
        let {id}=this.state;
        const{products}=this.state;
        console.log(id)
        if(this.state.price===''){swal("Please Enter Price")}
       else {
        firebase.database().ref().child('kkf').child('product').child(key).update({approval:true,price:this.state.price})
        swal("Approved")
       }
      

      }
      handleUnapprove=(key)=>{
        firebase.database().ref().child('kkf').child('product').child(key).update({approval:false,price:'0'})
        swal("Unapproved")
      }
      handleInput=(event)=>{
        this.setState({
          [event.target.name]:event.target.value
      })
      }
    render() {
        const{products,renderFlag}=this.state;
        return (
            renderFlag &&
            <React.Fragment>
                <Container>
                  <br/>
                <div className="wel">
                <h1><b>WELCOME</b></h1>
            </div>
            <br/>
            <CardDeck>
                        
                        {products.map((value, index) => {
                            return (
                              <div className="Vendor">
                              <Row>
                                  <Col>
                                    <br/>
                                  <div>
                                    <Card style={{ width: '21.5rem' }}>
                                        <Card.Img variant="top" style={{ width: 342, height: 346 }} src={value.url} fluid />
                                        <Card.Body>
                                            <Card.Title>{value.pname}</Card.Title>
                                            <Card.Text style={{width: 300, height: 55}}>
                                            {value.discrip}
                                            </Card.Text>
                                            <div className="description" style={{marginRight:"10px",marginBottom:"10px"}}>
                                   
                                            <Card.Link >Set price</Card.Link>
                                            <br/>
                                            <Card.Link style={{marginRight:"20px",width:"20px"}}>
                                              <input type ="number" name="price" onChange={this.handleInput} style={{width:'40'}}></input>
                                              </Card.Link>
                                            
                                            
                                            </div> 
                                            <div style={{marginBottom:"10px"}}>
                                            <Row>
                                              
                                              <Card.Body>  <Button onClick={() => this.handleApprove(value.key)} variant="primary">
                                                  
                                                  APPROVE
                                                  
                                                  </Button> </Card.Body>
                                                  <Card.Body>
                                                    <Button style={{margirnRight:"20px !important"}} onClick={() => this.handleUnapprove(value.key)}> 
                                                  UNAPPROVE
                                                  </Button>
                                                  </Card.Body>
                                                  
                                              </Row> 
                                              </div>
                                            
                                        </Card.Body>
                                    </Card>
                                    </div>
                                    </Col>
                                </Row>
                                
                              </div>
                                
                            )
                        })}
                        
                    </CardDeck>
                </Container>
            </React.Fragment>
        )
    }
}
export default kkf;
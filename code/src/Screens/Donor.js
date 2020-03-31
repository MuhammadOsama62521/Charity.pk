import React from 'react';
import { Button, Container, InputGroup, FormControl,ProgressBar,Label,Card,Row,Col } from 'react-bootstrap';
import { storage } from '../Utilities/firebase';
import firebase from '../Utilities/firebase';
import swal from 'sweetalert';
import { Link,withRouter } from 'react-router-dom';
import App from '../App';
import "../Components/Form.css";



class Donor extends React.Component {
constructor(props){
    super(props);
    this.state={
        image: null,
        url:'',
        progress:0,
        navigate:false,
        radio:'',
        pname:'',
        discrip:'',
        approval:false,
        price:'0'
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleUpload=this.handleUpload.bind(this);
    this.CheckChange=this.CheckChange.bind(this)
    this.RadioChange=this.RadioChange.bind(this)
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
handleChange=(e)=>{
    
    if(e.target.files[0]){
        const image=e.target.files[0];
this.setState(()=>({image}));
    }
}
handleUpload=()=>{
    const{image,radio,pname,url,discrip}=this.state;
    if(image!==null&&pname!==''&&discrip!==''&&radio!=='')
    {
        const uploadTask= storage.ref(`image/${image.name}`).put(image);
        uploadTask.on('state_changed',
        (snapshot)=>{
    //progress function
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
    this.setState({progress});
      //console.log(navigate);
     
       

       
},
        (error)=>{
        console.log(error);
        },
        ()=>{
    //completing fuction
    storage.ref('image').child(image.name).getDownloadURL().then(url =>{
        console.log(url);
        this.setState({url});
    }).then(()=>{
        firebase
        .database()
        .ref()
        .child(radio)
        .child('product')
        .push({
          pname: this.state.pname,
          discrip:this.state.discrip,
          url:this.state.url,
          approval:this.state.approval,
          price:this.state.price,

        }).then(()=>{
            swal("Done")
            this.props.history.replace('/')
        })
    })
        });
        
        
    
    }
    else{
        swal("Please Complete all the Details")
    }
    
    
}

CheckChange=(e)=>{
this.setState({
    [e.target.name]:e.target.checked
})
}
RadioChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
    }


    render() {
        const {progress,radio}= this.state;
        return (
            
            <React.Fragment>
                <Container>
                    <br/>
                    
                    <div className="Don">
                        <div className="Head" style={{paddingRight:"300px"}}>
                        <h1><b>Please Fill all the Required Details</b></h1>
                        </div>
                    
                    <Card>
                        <Card.Body>
                        <Row>
                            <Col>
                            <img 
                        src={this.state.url||'https://via.placeholder.com/400x300'} alt="Upload Images" width="400" height="300" />
                        
                            </Col>
                        </Row>
                        <br/>
                    <input type="file" onChange={this.handleChange}/>
                    <br/>
                    
                    <progress value={this.state.progress} max="100"/>
                    <br/>
                    
                    <label className="label"><b>ENTER PRODUCTS NAME :</b></label>
<br/> 
                <InputGroup className="mb-3" style={{width:'50%'}}>
<InputGroup.Prepend>

   
</InputGroup.Prepend>
<FormControl  name="pname" onChange={this.handleInput}/>
</InputGroup>
                <label className="label"><b>ENTER DISCRIPTION OF THE ITEM :</b></label>
<br/>
<InputGroup style={{width:'50%',height:'300px'}}>
    <InputGroup.Prepend>
      
    </InputGroup.Prepend>
    <FormControl className="textbox" name="discrip" onChange={this.handletext} as="textarea" aria-label="With textarea" />
</InputGroup>
                    <br/>
                    <div className="label">
                        <b>
                        CHOOSE WHOME TO DONATE :
                        </b>
                  
                </div>
                <div>
                    <input type="Radio" value="Sylani"
                     name ="radio" 
                     checked={this.state.radio==="Sylani"} onChange={this.RadioChange}/>SYLANI<br/>
                        <input type="Radio" value="kkf" 
                        name ="radio" checked={this.state.radio==="kkf"} onChange={this.RadioChange}/>KKF<br/>
                        <input type="Radio" value="shokatkhanum"
                         name ="radio" checked={this.state.radio==="shokatkhanum"} onChange={this.RadioChange}/>Shokat Khanum<br/>
                    </div>
                    
<br/>
                    <Button 
                    onClick={this.handleUpload}>
                    DONATE
                    </Button>

                        </Card.Body>
                    </Card>
                    
                    </div>
                    
                    </Container>   
                    </React.Fragment>
        )
    }
}

export default withRouter(Donor) ;
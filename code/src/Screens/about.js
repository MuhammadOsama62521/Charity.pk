import React, { Component } from 'react';
import { Container,Card } from 'react-bootstrap';

class about extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <div style={{backgroundColor:"#F8FAFA"}}>
                    <h1><b>MISSION</b></h1>
                    <p>
                        providing the ngos with all the funds neccecarry for them to
                        operate their work in an inovative way
                </p>
                    <br />
                    <h2><b>VISSION</b></h2>
                    <p>
                        customer gets his/her product,
                        Ngo helped in the form oof cast,
                        getting rid of unneccecary things from home
                        which is donated to different NGOs.
                </p>
                    <br />
                    <h3><b>Who We Are?</b></h3>
                    <p>
                        we are the third party which are building the bridge
                        between the donor and the NGO.
                <br />
                    </p>
                    </div>
                 
                    
                </Container>

            </React.Fragment>
        )
    }
}
export default about;
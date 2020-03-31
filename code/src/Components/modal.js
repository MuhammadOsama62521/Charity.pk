import React, { Component, useState } from 'react';
import {
    Button,
    Modal
} from 'react-bootstrap';

class UserGreetingsModal extends Component {

    state = {
        show: false
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }

    componentDidMount() {
        console.log("TEST");
    }

    render() {
        
        const { email, password } = this.props;

        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Register
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Greetings {email}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your Password is: {password}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default UserGreetingsModal;
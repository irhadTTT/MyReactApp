import React, { Component } from 'react';
import axios from '../../axios-instance';
import { connect } from 'react-redux';
import { updatePersonData } from '../../store/actions/index';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Aux from '../../hoc/AuxHelp/AuxHelp';
import { Modal, Button, Form } from 'react-bootstrap';

class ChangeModal extends Component {
    state = {
        company: '',
        country: '',
        email: '',
        firstName: '',
        id: '',
        lastName: '',
        mobile: '',
        personId: '',
        phone: '',
        street: '',
        validated: false,
    };
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isForEdit) {
            this.setState({
                company: nextProps.company,
                country: nextProps.country,
                email: nextProps.email,
                firstName: nextProps.firstName,
                lastName: nextProps.lastName,
                mobile: nextProps.mobile,
                personId: nextProps.personId,
                phone: nextProps.phone,
                street: nextProps.street,
                id: nextProps.id
            });
        }
    }
    inputChangedHandler = (event) => this.setState({ [event.target.name]: event.target.value });
    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.props.onUpdatePersonData(this.state);
        }
        this.setState({ validated: true });
    };
    render() {
        const formElementArray = [];
        for (let key in this.state) {
            if (key !== 'id' && key !== 'personId' && key !== 'validated') {
                formElementArray.push({
                    id: key,
                    value: this.state[key]
                });
            }
        }
        let form = formElementArray.map((formElement) => (
            <Form.Group key={formElement.id}>
                <Form.Label>{formElement.id}</Form.Label>
                <Form.Control
                    required
                    name={formElement.id}
                    type="text"
                    value={formElement.value || ''}
                    onChange={(event) => this.inputChangedHandler(event)}
                />
            </Form.Group>
        ));
        return <Aux>
            <Modal key={this.props.id} show={this.props.showChangeModal} onHide={this.props.onModalHide} animation={false} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Person</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form key={this.props.id} noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        {form}
                        <Button type="submit" variant="success">
                            Yes
                        </Button>
                        <Button className="ml-2" variant="danger" onClick={this.props.onModalHide}>
                            No
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Aux>
    };
};
const mappedFunToProps = dispatch => {
    return {
        onUpdatePersonData: (person) => dispatch(updatePersonData(person))
    }
}
export default connect(null, mappedFunToProps)(ErrorHandler(ChangeModal, axios));
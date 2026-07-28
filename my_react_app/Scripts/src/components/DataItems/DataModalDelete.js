import React, { Component, useEffect } from 'react';
import Aux from '../../hoc/AuxHelp/AuxHelp';
import { Modal, Button } from 'react-bootstrap';


export default class DataDeleteModal extends Component {
    render() {
        return <Aux>
            <Modal show={this.props.showDeleteModal || this.props.isForExport} onHide={this.props.onDeleteHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.isForExport ? 'Export' : 'Warning'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.isForExport ? 'Are you sure you want to export file' :
                    'Are you sure you want to delete selected person'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.props.clicked}>
                        Yes
                        </Button>
                    <Button variant="danger" onClick={this.props.onDeleteHide}>
                        No
                        </Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    }
}
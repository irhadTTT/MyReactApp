import React, { Component } from 'react';
import axios from '../../axios-instance';
import classes from './DataItem.css';
import ModalChanges from './DataModalChange';
import DataDeleteModal from './DataModalDelete';
import { deletePersonData, exportPersonData } from '../../store/actions/index';
import { connect } from 'react-redux';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { Button } from 'react-bootstrap';

class DataItem extends Component {
    state = {
        showDeleteModal: false,
        showChangeModal: false,
        personToDeleteId: null,
        personToChange: {},
        isForEdit: false,
        showExport: false
    };
    showConfirmDeleteDialog = (personId) => this.setState({ showDeleteModal: true, personToDeleteId: personId });
    closeDeleteModal = () => this.setState({ showDeleteModal: false });
    showExportConfirmDialog = () => this.setState({ showExport: true });
    closeExportModal = () => this.setState({ showExport: false });
    showChangeModal = (person) => this.setState({ showChangeModal: true, personToChange: person, isForEdit: true });
    showCreateModal = () => this.state({ showChangeModal: true, isForEdit: false });
    closeChangeModal = () => this.setState({ showChangeModal: false });
    render() {
        let viewData = <div>   
        <Button variant="primary" size="md" onClick={() => this.showChangeModal()}>
            <span className="fa fa-plus"> Add</span>
        </Button>
        </div>
        if(this.props.persons.length > 0 ){
            viewData =
            <div>
            <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Street</th>
                            <th>Country</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Mobile</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.persons.map((p) => {
                                return <tr key={p.id}>
                                    <td> {p.company}</td>
                                    <td>{p.firstName}</td>
                                    <td>{p.lastName}</td>
                                    <td>{p.street}</td>
                                    <td> {p.country}</td>
                                    <td>{p.email}</td>
                                    <td>{p.phone}</td>
                                    <td>{p.mobile}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={() => this.showChangeModal(p)}>
                                            <span className="fa fa-edit"></span>
                                        </button></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => this.showConfirmDeleteDialog(p.personId)}>
                                            <span className="fa fa-trash"></span>
                                        </button></td>
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
                <Button variant="primary" size="md" onClick={() => this.showChangeModal()}>
                    <span className="fa fa-plus"> Add</span>
                </Button>
                <Button className="ml-2" variant="success" size="md" onClick={this.showExportConfirmDialog}>
                    <span className="fa fa-file"> Export</span>
                </Button>
                </div>
        }
        return (
            <div className={classes.DataItem}>
                <h1>Persons</h1>
                {viewData}       
                <DataDeleteModal
                    showDeleteModal={this.state.showDeleteModal}
                    isForExport={this.state.showExport}
                    clicked={ this.state.showExport ? this.props.onExportPersonData
                        : () => this.props.onDeletePersonData(this.state.personToDeleteId)}
                    onDeleteHide={this.state.showExport ? this.closeExportModal : this.closeDeleteModal}>
                </DataDeleteModal>
                <ModalChanges
                    showChangeModal={this.state.showChangeModal}
                    isForEdit={this.state.isForEdit}
                    {...this.state.personToChange}
                    onModalHide={this.closeChangeModal}>
                </ModalChanges>
            </div>
        )
    };
};
const mappedStateToProps = state => {
    return {
        data: state.dataBuilder.data,
        loading: state.dataBuilder.loading,
    }
}
const mappedFunToProps = dispatch => {
    return {
        onDeletePersonData: (personId) => dispatch(deletePersonData(personId)),
        onExportPersonData: () => dispatch(exportPersonData())
    }
}
export default connect(mappedStateToProps, mappedFunToProps)(ErrorHandler(DataItem, axios));
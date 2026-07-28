import React, { Component } from 'react';
import axios from '../axios-instance';
import DataItem from '../components/DataItems/DataItem';
import Loader from '../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import { fetchData } from '../store/actions/index';
import ErrorHandler from '../hoc/ErrorHandler/ErrorHandler';
import Aux from '../hoc/AuxHelp/AuxHelp';


class MyData extends Component{
    componentDidMount(){
        this.props.onFetchData();
    }
    render(){
        let formData = <Loader/>;
        if(!this.props.loading ){
            formData = <DataItem persons={this.props.data} />
        }
        return(
            <Aux>
            <div>
                {formData}
            </div>
            </Aux>
            );
    }
}
const mappedStateToProps = state => {
    return{
        data: state.dataBuilder.data,
        loading: state.dataBuilder.loading
    }
}
const mappedFunToProps = func => {
    return{
        onFetchData: () => { func(fetchData()) }
    }
}
export default connect(mappedStateToProps, mappedFunToProps) (ErrorHandler(MyData, axios));
import React, { Component } from 'react';
import {authLogout} from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return <Redirect to="/"/>;
    }
}
const mappedDispFuncToProps = dis => {
    return{
        onLogout: () => dis(authLogout())
    }
}
export default connect(null, mappedDispFuncToProps) (Logout);
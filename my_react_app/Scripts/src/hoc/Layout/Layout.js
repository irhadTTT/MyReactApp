import React, { Component } from 'react';
import Aux from "../AuxHelp/AuxHelp";
import classes from './Layout.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';

class Layout extends Component{
    render(){
        return <Aux>
            <Toolbar 
                isAuth={this.props.isAuth}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    }
};
const mappedStateToProps = state => {
    return{
        isAuth: state.authReducer.token !== null
    }
}
export default connect(mappedStateToProps, null) (Layout);
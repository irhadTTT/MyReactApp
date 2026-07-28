import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../../src/hoc/AuxHelp/AuxHelp';

class Modal extends Component {
    shouldComponentUpdate(nextPros, nextState){
        return nextPros.show !== this.props.show || nextPros.children !== this.props.children;
    }
    render(){
        return <Aux>
        <div className={classes.Modal}
        style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
        }}>
            {this.props.children}
        </div>
    </Aux>
    }
}

export default Modal;
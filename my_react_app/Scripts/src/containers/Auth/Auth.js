import React, { Component } from 'react';
import Input from '../../components/UI/Controls/Input';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {auth, setAuthRedirectPath} from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';
import {Redirect} from 'react-router-dom';
import {updatedObject, checkValidity} from '../../common/common';
import { Form, Card, Button } from 'react-bootstrap';

class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                valid: false,
                touched: false
            }
        },
        isLoggedIn: true
    }
    componentDidMount(){
        if(this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectPath();
        }
    }
    inputChangeHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls, {
            [controlName]: updatedObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({controls: updatedControls});
    }
    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isLoggedIn);
    }
    switchToLogInHandler = () =>{
        this.setState(prevState => {
            return {isLoggedIn: !prevState.isLoggedIn}
        })
    }
    render(){
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })        
        }
        let form = formElementArray.map((formElement)=>(
            <Input className="auth-input"
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ));
        if (this.props.loading) {
            form = <Loader />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }
        return(
            <Card bg="light" className="auth-card">
                <Card.Header>
                    <Card.Title>{this.state.isLoggedIn ? 'Register' : 'Login'}</Card.Title>
                </Card.Header>
                <Card.Body>
            <div className={"Auth"}>
                {authRedirect}
                { errorMessage}
                <Form onSubmit={(event) => this.submitFormHandler(event)}>
                    <Form.Group>
                    {form}
                    </Form.Group>
                    <Button className="mt-2"  variant="success" type="submit" size="sm">
                    <span className="fa fa-arrow-alt-circle-up"></span> Submit </Button>
                </Form>
                <div className="mt-2">
                <Button 
                onClick={this.switchToLogInHandler}
                variant="danger">
                    <span className="fa fa-arrow-circle-left"></span> {this.state.isLoggedIn ? 'Log in' : 'Register' }</Button>
                </div>
            </div>
            </Card.Body>
            </Card>
        )
    }
}
const mappedStateToProps = state => {
    return {
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        isAuth: state.authReducer.token != null,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}
const mappedDispatchedActToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/"))
    }
}

export default connect(mappedStateToProps, mappedDispatchedActToProps) (Auth);
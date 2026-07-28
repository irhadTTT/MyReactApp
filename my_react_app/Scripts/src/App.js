import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import MyData from '../src/containers/MyData';
import Logout from '../src/containers/Auth/Logout';
import Layout from "./hoc/Layout/Layout";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {checkLogState} from '../src/store/actions/index';
import asyncComponent from './hoc/Async/Async';

const asyncAuth = asyncComponent(() => {
  return import('../src/containers/Auth/Auth');
});
class App extends Component {
  componentDidMount(){
    this.props.onCheckLogState();
  }
  render(){
    let routes = (
      <Switch>
      <Route path="/auth" component={asyncAuth}/> 
      <Route path="/data" component={MyData}/>
      <Redirect to="/" />
    </Switch>
    )
    if(this.props.isAuth){
      routes =  <Switch>
      <Route path="/data" component={MyData}/>
      {<Route path="/logout" component={Logout}/>}
      <Route path="/auth" component={asyncAuth}/>
      <Redirect to="/" />
    </Switch>
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mappedStateToProps = state => {
  return{
    isAuth: state.authReducer.token !== null
  }
}
const mappedFuntoProps = func => {
  return{
    onCheckLogState: () => func(checkLogState())
  }
}
export default withRouter(connect(mappedStateToProps, mappedFuntoProps) (App));

import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavItems/NavItems';
import {Navbar, Nav} from 'react-bootstrap';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
          <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Task</Navbar.Brand>
    <Nav className="mr-auto">
    <NavigationItems isAuthenticated={props.isAuth}/>
    </Nav>
  </Navbar>
    </header>
);

export default toolbar;
import React from 'react';
import classes from './NavItems.css';
import NavigationItem from './NavItem/NavItem';

const navigationItems = (props) => (
    <ul className={classes.NavItems}>
        {props.isAuthenticated ? <NavigationItem link="/data">My data</NavigationItem> : null}
        {!props.isAuthenticated ?
                <NavigationItem link="/auth">Authentication</NavigationItem>
                : <NavigationItem  link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationItems;
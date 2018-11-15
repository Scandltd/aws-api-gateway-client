import React, { Component } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';

/**
 * 
 */
class Header extends Component
{
    render() {
        return <header className="container header">
            header text
            <NavLink to="/" exact activeClassName="hideHomeLink">Home</NavLink>
        </header>
    };
}

export default Header;
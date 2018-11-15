import React, { Component } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/**
 * 
 */
class Header extends Component
{
    render() {
        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Aws API GATEWAY Client
                    </Typography>
                    <NavLink to="/" exact activeClassName="hideHomeLink"><Button>Home</Button></NavLink>
                </Toolbar>
            </AppBar>
        );
    };
}

export default Header;
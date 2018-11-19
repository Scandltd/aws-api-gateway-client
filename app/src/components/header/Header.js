import React, { Component } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

/**
 * 
 */
class Header extends Component
{
    render() {
        const progressBar = this.props.isLoading ? <LinearProgress variant="query" /> : null;

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Aws API GATEWAY Client
                    </Typography>
                    <NavLink to="/" exact activeClassName="hideHomeLink"><Button>Home</Button></NavLink>
                </Toolbar>
                { progressBar }
            </AppBar>
        );
    };
}

export default Header;


Header.propTypes = {
    isLoading: PropTypes.bool
};
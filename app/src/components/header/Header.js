import React, { Component } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

/**
 * 
 */
class Header extends Component
{
    render() {
        const progressBar = this.props.isLoading ? <LinearProgress variant="query" /> : null;
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Aws API GATEWAY Client
                        </Typography>
                        <NavLink to="/" exact activeClassName="hideHomeLink"><Button>Home</Button></NavLink>
                        <NavLink to="/settings" exact activeClassName="hideHomeLink">
                            <IconButton color="inherit">
                                <SettingsIcon />
                            </IconButton>
                        </NavLink>
                    </Toolbar>
                    { progressBar }
                </AppBar>
            </div>
        );
    };
}

export default withStyles(styles)(Header);


Header.propTypes = {
    isLoading: PropTypes.bool
};
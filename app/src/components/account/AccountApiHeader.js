import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

/**
 *
 */
class AccountApiHeader extends Component
{
    render() {
        return (
            <AppBar position="static" className="app-bar-account-api" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="text-grow">
                        {this.props.title}
                    </Typography>
                    <Button color="inherit" onClick={this.props.onButtonClick}>{this.props.buttonTitle}</Button>
                </Toolbar>
            </AppBar>
        );
    }
}


export default AccountApiHeader;

AccountApiHeader.propTypes = {
    title: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func
};

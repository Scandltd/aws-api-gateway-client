import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

/**
 *
 */
class AlertDialogComponent extends Component
{
    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { this.props.description }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.handleAgree} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AlertDialogComponent;

AlertDialogComponent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleAgree: PropTypes.func.isRequired
};




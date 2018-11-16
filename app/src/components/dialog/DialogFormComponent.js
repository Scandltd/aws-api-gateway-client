import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

/**
 *
 */
class DialogFormComponent extends Component
{
    /**
     *
     */
    handleClose = () => {
        this.props.onClose();
    };

    /**
     *
     */
    handleSave = () => {
        this.props.onSave();
    };

    /**
     *
     * @returns {*}
     */
    render () {
      console.log(this.state);

      return (
          <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
              <DialogContent>
                  {this.props.children}
              </DialogContent>
              <DialogActions>
                  <Button onClick={this.handleClose}>
                      Cancel
                  </Button>
                  <Button onClick={this.handleSave}>
                      Save
                  </Button>
              </DialogActions>
          </Dialog>
      );
    };
}

export default DialogFormComponent;

DialogFormComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

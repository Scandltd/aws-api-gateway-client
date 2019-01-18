import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

/**
 *
 */
class DialogFormComponent extends Component
{
    /**
     *
     * @returns {*}
     */
    render () {
      return (
          <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title" maxWidth="lg">
              <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
              <DialogContent>
                  {this.props.children}
              </DialogContent>
          </Dialog>
      );
    };
}

export default DialogFormComponent;

DialogFormComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func
};
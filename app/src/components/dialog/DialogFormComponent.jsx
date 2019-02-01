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
        const { open, onClose, title, children, maxWidth } = this.props;

       return (
           <Dialog open={ open } onClose={ onClose } aria-labelledby="form-dialog-title" maxWidth={ maxWidth || 'xs' }>
               <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
               <DialogContent>
                   { children }
               </DialogContent>
           </Dialog>
       );
    };
}

export default DialogFormComponent;

DialogFormComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    maxWidth: PropTypes.string,
};

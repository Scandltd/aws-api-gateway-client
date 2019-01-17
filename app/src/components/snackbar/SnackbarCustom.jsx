import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from './SnackbarContentWrapper';

/**
 *
 */
class SnackbarCustom extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    /**
     *
     */
    handleClose = () => {
        this.setState({open: false});
        if (this.props.onClose) {
            this.props.onClose(this.props.id);
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
            >
                <SnackbarContentWrapper
                    onClose={this.handleClose}
                    variant={this.props.variant}
                    message={this.props.message}
                />
            </Snackbar>
        )
    }
}

export default SnackbarCustom;

SnackbarCustom.propTypes = {
    id: PropTypes.any.isRequired,
    onClose: PropTypes.func,
    message: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired
};
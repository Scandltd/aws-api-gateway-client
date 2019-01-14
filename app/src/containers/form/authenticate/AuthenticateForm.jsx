import React, { Component } from 'react';
import FormHOC from '../../hoc/FormHOC';
import { connect } from 'react-redux';
import { connectAccountRequest } from '../../../store/actions/accountActions';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class AuthenticateForm extends Component {

    /**
     *
     * @returns {*}
     */
    renderButtons() {
        console.log(this.state);

        return (
            <div className="form-buttons">
                <Button variant="contained" color="default" disabled={this.state.isProcessing} onClick={this.onCancel}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={this.state.isProcessing} color="primary">Connect {this.state.isProcessing && <CircularProgress size={25} />}</Button>
            </div>
        );
    };

    /**
     *
     */
    onSubmitValid = () => {
        console.log(this.props);

        this.props.connectAccountRequest({}).then(response => {
          this.props.onSuccess();
        });
    };

    render() {
      return (<div>Component AuthenticateForm</div>)
    }
}

export default connect(null, {
  connectAccountRequest
})(FormHOC(AuthenticateForm));

AuthenticateForm.propTypes = {
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};
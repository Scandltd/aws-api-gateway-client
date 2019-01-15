import React, { Component } from 'react';
import FormHOC from '../../hoc/FormHOC';
import { connect } from 'react-redux';
import { connectAccountRequest } from '../../../store/actions/accountActions';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

class AuthenticateForm extends Component {
    /**
     *
     * @returns {*}
     */
    renderButtons = () => {
        return (
            <div className="form-buttons">
                <Button variant="contained" color="default" disabled={this.state.isProcessing} onClick={this.props.onCancel}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={this.state.isProcessing} color="primary">Connect {this.state.isProcessing && <CircularProgress size={25} />}</Button>
            </div>
        );
    };

    /**
     *
     */
    onSubmitValid = () => {
        this.props.connectAccountRequest({}).then(response => {
          this.props.onSuccess();
        });
    };

    /**
     *
     * @returns {*}
     */
    render() {
      return (
          <React.Fragment>
              <TextField
                  id="standard-full-width"
                  label="Api key"
                  required
                  name="apiKey"
                  placeholder="Name"
                  helperText={Boolean(this.state.errors.apiKey) ? this.state.errors.apiKey[0] : ''}
                  fullWidth
                  margin="normal"
                  multiline={true}
                  error={Boolean(this.state.errors.apiKey)}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  onChange={this.handleChange}
                  value={this.state.data.apiKey}
              />
              <TextField
                  id="standard-full-width"
                  label="Secret key"
                  required
                  name="secretKey"
                  placeholder="Name"
                  helperText={Boolean(this.state.errors.secretKey) ? this.state.errors.secretKey[0] : ''}
                  fullWidth
                  margin="normal"
                  multiline={true}
                  error={Boolean(this.state.errors.secretKey)}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  onChange={this.handleChange}
                  value={this.state.data.secretKey}
              />
          </React.Fragment>
      )
    }
}

const validationRules = {
    apiKey: {
        presence: {
            allowEmpty: false
        }
    },
    secretKey: {
        presence: {
            allowEmpty: false
        },
    }
};

const fields = {
    apiKey: '',
    secretKey: '',
};

export default connect(null, {
  connectAccountRequest
})(FormHOC(AuthenticateForm, fields, validationRules));

AuthenticateForm.propTypes = {
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};
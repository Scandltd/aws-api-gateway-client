import React, { Component } from 'react';
import FormHOC from '../../hoc/FormHOC';
import { connect } from 'react-redux';
import { connectAccountRequest } from '../../../store/actions/accountActions';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class AccountForm extends Component {
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
})(FormHOC(AccountForm, fields, validationRules));

AccountForm.propTypes = {
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};
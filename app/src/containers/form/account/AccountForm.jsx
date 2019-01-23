import React, { Component } from 'react';
import FormHOC from '../../hoc/FormHOC';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { createAccount, updateAccount } from '../../../store/actions/settingsAccount';
import { getAwsRegionSuggestionList } from '../../../enum/awsRegions';
import SelectAutocompleteField from '../../../components/form/fields/SelectAutocompleteField';

const AWS_REGIONS_SUGGESTION = getAwsRegionSuggestionList();

class AccountForm extends Component {

    /**
     *
     */
    onSubmitValid = () => {
        let data = this.state.data;

        if (this.props.isUpdateAction) {
            if (!this.props.entityId) {
                throw new Error('Please provide an entityId property!');
            }

            this.props.updateAccount(this.props.entityId, data)
                .then(response => {
                    if (this.props.onSuccess) {
                        this.props.onSuccess(response);
                    }
                })
                .catch(err => {
                    if (err.errors) {
                        this.setState({errors: err.errors});
                    }
                });
        } else {
            this.props.createAccount(data)
                .then(response => {
                    if (this.props.onSuccess) {
                        this.props.onSuccess(response);
                    }
                })
                .catch(err => {
                    if (err.errors) {
                        this.setState({errors: err.errors});
                    }
                });
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {

          const regionError = this.getErrorText('region');

        return (
            <React.Fragment>
                <TextField
                    id="standard-full-width"
                    label="Name"
                    required
                    name="name"
                    placeholder="Account name"
                    helperText={this.getErrorText('name')}
                    fullWidth
                    margin="normal"
                    multiline={true}
                    error={Boolean(this.state.errors.name)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.name}
                />
                <TextField
                    id="standard-full-width"
                    label="Access key"
                    required
                    name="accessKey"
                    placeholder="AKIAIOSFODNN7EXAMPLE"
                    helperText={this.getErrorText('accessKey')}
                    fullWidth
                    margin="normal"
                    multiline={true}
                    error={Boolean(this.state.errors.accessKey)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.accessKey}
                />
                <TextField
                    id="standard-full-width"
                    label="Secret key"
                    required
                    name="secretKey"
                    placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    helperText={this.getErrorText('secretKey')}
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
                <SelectAutocompleteField
                    suggestions={ AWS_REGIONS_SUGGESTION }
                    name="region"
                    label="Region"
                    helperText=""
                    value={this.state.data.region}
                    error={Boolean(regionError) ? regionError : ''}
                    onChange={this.handleChange}
                    placeholder="Choose one"
                />
          </React.Fragment>
      )
    }
}

const validationRules = {
    name: {
        presence: {
            allowEmpty: false
        }
    },
    accessKey: {
        presence: {
            allowEmpty: false
        }
    },
    secretKey: {
        presence: {
            allowEmpty: false
        },
    },
    region: {
        presence: {
            allowEmpty: false
        },
    }
};

const fields = {
    name: '',
    secretKey: '',
    accessKey: '',
    region: '',
};

export default connect(null, {
    createAccount,
    updateAccount
})(FormHOC(AccountForm, fields, validationRules));

AccountForm.propTypes = {
    createAccount: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onCancel: PropTypes.func,
};

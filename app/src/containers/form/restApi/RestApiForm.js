import React from 'react';
import BaseFormContainer from '../BaseFormContainer';
import { forIn } from 'lodash';
import { createRestApiRequest, updateRestApiRequest } from '../../../store/actions/apiActions';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import RestApiEndpointType from '../../../enum/restApiEndpointType';
import SelectField from '../fields/SelectField';

/**
 *
 */
class RestApiForm extends BaseFormContainer
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state.data = this.initData({
            name: '',
            description: '',
            type: ''
        });

        this.setValidationRules({
            name: {
                presence: {
                    allowEmpty: false
                },
                length: {
                    minimum: 3,
                    maximum: 40
                },
            },
            description:{
                presence: {
                    allowEmpty: false
                },
                length: {
                    maximum: 200
                },
            },
            type: {
                presence: {
                    allowEmpty: false,
                },
            }
        });
    }

    /**
     *
     */
    onRequestSuccess = (response) => {
        this.setState({isProcessing: false});
        this.props.onSuccess();
    };

    /**
     *
     * @param err
     */
    onRequestError = (err) => {
        this.setState({isProcessing: false});
        //@todo handle 422 errors
    };

    /**
     *
     */
    onSubmitValid = () => {
        if (this.props.isUpdateAction) {
            if (!this.props.entityId) {
                throw new Error('Please provide an entityId property!');
            }

            this.setState({isProcessing: true});
            this.props.actions.updateRestAPi(this.props.accountId, this.props.entityId, this.state.data, this.props.initialData, this.onRequestSuccess, this.onRequestError);
        } else {
            this.setState({isProcessing: true});
            this.props.actions.createRestApi(this.props.accountId, this.state.data, this.onRequestSuccess, this.onRequestError);
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return this.renderForm(
            <React.Fragment>
                <TextField
                    id="standard-full-width"
                    label="Rest API name"
                    name="name"
                    placeholder="Name"
                    helperText={Boolean(this.state.errors.name) ? this.state.errors.name[0] : ''}
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
                    label="Description"
                    name="description"
                    placeholder="Description"
                    helperText={Boolean(this.state.errors.description) ? this.state.errors.description[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.description)}
                    multiline={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.description}
                />

                <SelectField
                    options={RestApiEndpointType}
                    name="type"
                    label="Endpoint Type"
                    value={this.state.data.type}
                    error={Boolean(this.state.errors.type) ? this.state.errors.type[0] : ''}
                    onChange={this.handleChange}
                />

            </React.Fragment>
        );
    };
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            createRestApi: (accountId, data, onSuccess = null, onError = null) => dispatch(createRestApiRequest(accountId, data, onSuccess, onError)),
            updateRestAPi: (accountId, apiId, data, oldData, onSuccess = null, onError = null) => dispatch(updateRestApiRequest(accountId, apiId, data, oldData, onSuccess, onError))
        }
    }
};

export default connect(null, mapDispatchToProps)(RestApiForm);

RestApiForm.propTypes = {
    accountId: PropTypes.any.isRequired,
    initialData: PropTypes.object,
    isUpdateAction: PropTypes.bool.isRequired,
    entityId: PropTypes.any
};

import React from 'react';

import BaseFormContainer from '../BaseFormContainer';
import { createResourceApiRequest } from '../../../store/actions/entriesActions';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

/**
 *
 */
class RestApiResourceForm extends BaseFormContainer {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state.data = this.initData({
            path: '',
        });

        this.setValidationRules({
            path: {
                presence: {
                    allowEmpty: false
                },
                length: {
                    maximum: 100
                },
                format: {
                    pattern: "^{?[a-z0-9._-]+}?",
                    flags: "i",
                    message: "can only contain a-zA-Z0-9._- and curly braces at the beginning and the end"
                }
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
        let data = this.state.data;
        data.parentId = this.props.parentResourceId;


        this.setState({isProcessing: true});
        this.props.actions.createRestApiResource(this.props.accountId, this.props.restApiId, data, this.onRequestSuccess, this.onRequestError);
    };

    render() {
        return this.renderForm(
            <React.Fragment>
                <TextField
                    required
                    label="Path"
                    name="path"
                    placeholder="Path"
                    helperText={Boolean(this.state.errors.path) ? this.state.errors.path[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.path)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{this.props.basePath}</InputAdornment>,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.path}
                />
            </React.Fragment>
        );
    }
}

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            createRestApiResource: (accountId, restApiId, data, onSuccess = null, onError = null) => dispatch(createResourceApiRequest(accountId, restApiId, data, onSuccess, onError)),
        }
    }
};

export default connect(null, mapDispatchToProps)(RestApiResourceForm);

RestApiResourceForm.propTypes = {
    basePath: PropTypes.string.isRequired,
    accountId: PropTypes.any.isRequired,
    restApiId: PropTypes.any.isRequired,
    parentResourceId: PropTypes.any.isRequired,
    initialData: PropTypes.object,
    isUpdateAction: PropTypes.bool.isRequired,
    entityId: PropTypes.any,
    onSuccess: PropTypes.func.isRequired
};
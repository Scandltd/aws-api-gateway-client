import React, { Component } from 'react';
import HttpMethodEnum from "../../../enum/httpMethodTypeEnum";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { putMethodResponseApiRequest } from "../../../store/actions/entriesActions";
import FormHOC from '../../hoc/FormHOC';

/**
 *
 */
class ResponseForm extends Component {
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
    };

    /**
     *
     */
    onSubmitValid = () => {
        let data = this.state.data;
        data.constData = {
            restApiId: this.props.restApiId,
            resourceId: this.props.resourceId,
            httpMethod: this.props.httpMethod,
        };

        this.setState({isProcessing: true});
        this.props.actions.putMethodResponseApiRequest(this.props.accountId, data, this.onRequestSuccess, this.onRequestError);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <React.Fragment>
                <TextField
                    label="Status code"
                    name="status"
                    placeholder="200"
                    helperText={Boolean(this.state.errors.status) ? this.state.errors.status[0] : 'The method response\'s status code.'}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.status)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.status}
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
            putMethodResponseApiRequest: (accountId, data, onSuccess = null, onError = null) => dispatch(putMethodResponseApiRequest(accountId, data, onSuccess, onError)),
        }
    }
};

/**
 *
 * @type {{status: string}}
 */
const fields = {
    status: ''
};

/**
 *
 * @type {{status: {presence: {allowEmpty: boolean}, numericality: {onlyInteger: boolean, greaterThanOrEqualTo: number, lessThan: number}}}}
 */
const validationRules = {
    status: {
        presence: {
            allowEmpty: false
        },
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 100,
            lessThan: 600
        }
    }
};

export default connect(null, mapDispatchToProps)(FormHOC(ResponseForm, fields, validationRules));

ResponseForm.propTypes = {
    httpMethod: PropTypes.oneOf(Object.values(HttpMethodEnum)).isRequired,
    restApiId: PropTypes.string.isRequired,
    resourceId: PropTypes.string.isRequired,
    accountId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};
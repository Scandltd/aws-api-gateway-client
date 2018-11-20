import React from 'react';
import BaseFormContainer from '../BaseFormContainer';
import { forIn } from 'lodash';
import { createApi } from '../../../store/actions/apiActions';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import RestApiEndpointType from '../../../enum/restApiEndpointType';

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
        this.state.data = {
            name: '',
            description: '',
            type: ''
        };

        this.setValidationRules({
            name: {
                presence: {allowEmpty: false},
                length: {
                    minimum: 3,
                    maximum: 40
                },
            },
            description:{
                length: {
                    maximum: 200
                }
            },
            type: {
                presence: {allowEmpty: false},
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
        this.setState({isProcessing: true});
        this.props.actions.createRestApi(this.props.accountId, this.state.data, this.onRequestSuccess, this.onRequestError);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const menuOptions = [];
        forIn(RestApiEndpointType, (value, key) => {
            menuOptions.push(<MenuItem value={value} key={key}>{value}</MenuItem>);
        });

        return this.renderForm(
            <React.Fragment>
                <TextField
                    id="standard-full-width"
                    label="Rest API name"
                    name="name"
                    style={{ margin: 8 }}
                    placeholder="Name"
                    helperText="Enter name of REST API"
                    fullWidth
                    margin="normal"
                    multiline={true}
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
                    style={{ margin: 8 }}
                    placeholder="Description"
                    helperText="Enter description"
                    fullWidth
                    margin="normal"
                    multiline={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.description}
                />

                <FormControl fullWidth className="form-control">
                    <InputLabel htmlFor="name-error">Endpoint Type</InputLabel>
                    <Select
                        value={this.state.data.type}
                        onChange={this.handleChange}
                        name="type"
                    >
                        <MenuItem value="" default className="select-empty">
                            <em>None</em>
                        </MenuItem>
                        {menuOptions}
                    </Select>
                </FormControl>
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
            createRestApi: (accountId, data, onSuccess = null, onError = null) => dispatch(createApi(accountId, data, onSuccess, onError))
        }
    }
};

export default connect(null, mapDispatchToProps)(RestApiForm);

RestApiForm.propTypes = {
    accountId: PropTypes.any.isRequired,
    initialData: PropTypes.object
};

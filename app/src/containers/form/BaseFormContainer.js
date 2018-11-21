import React, { Component } from 'react';

import { mapValues } from 'lodash';
import validate from "validate.js";
import Button from '@material-ui/core/Button';
import './baseFormContainer.scss';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 *
 */
class BaseFormContainer extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {},
            isProcessing: false
        };

        this.validationRules = {};
    }

    populateWithInitialData() {
        if (this.props.initialData) {
            
        }
    }

    /**
     *
     * @param event
     */
    handleOnSubmit = (event) => {
        event.preventDefault();
        if (!this.validateForm()) {
            this.onSubmitInvalid();

            return;
        }

        this.onSubmitValid();
    };

    /**
     *
     * @param rules
     */
    setValidationRules(rules = {}) {
        this.validationRules = rules;
    }

    /**
     *
     */
    onSubmitValid = () => {
        console.log('form is valid', this.state.data);
    };

    /**
     *
     */
    onSubmitInvalid = () => {
        console.log('form is invalid', this.state.data);
    };

    /**
     *
     * @returns {boolean}
     */
    validateForm = () => {
        const validationErrors = validate(this.state.data, this.validationRules);

        if (validationErrors) {
            this.setState({errors: validationErrors});

            return false;
        }

        return true;
    };

    /**
     *
     * @param name
     *
     * @param value
     */
    validateField = (name, value) => {
        if (this.validationRules[name]) {
            const errors = validate.single(value, this.validationRules[name]);
            if (errors) {
                this.setState({errors: {...this.state.errors, [name]: errors[0]}});
            } else {
                this.setState({errors: {...this.state.errors, [name]: null}});
            }
        }
    };

    /**
     *
     * @param event
     */
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            data: {...this.state.data, [name]: value}
        });

        this.validateField(name, value);
    };

    /**
     *
     * @param e
     */
    handleClearForm = (e) => {
        e.preventDefault();

        let data = this.state.data;
        data = mapValues(data, (value) => {
            return '';
        });

        this.setState({data: data, errors: {}});
    };

    /**
     *
     * @param e
     */
    handleCancel = (e) => {
        this.handleClearForm(e);
        if (typeof this.props.onCancel === "function") {
            this.props.onCancel(e);
        }
    };

    /**
     *
     * @param formBody
     * @param formButtons
     *
     * @returns {*}
     */
    renderForm = (formBody, formButtons = null) => {
        let buttons = null;
        if (formButtons) {
            buttons = formButtons;
        } else {
            buttons = (
                <div className="form-buttons">
                    <Button variant="contained" color="default" disabled={this.state.isProcessing} onClick={this.handleCancel}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={this.state.isProcessing} color="primary">Submit {this.state.isProcessing && <CircularProgress size={25} />}</Button>
                </div>
            );
        }

        return (
            <form autoComplete="off" onSubmit={this.handleOnSubmit} className="base-form-container">
                <div className="form-body">
                    { formBody }
                </div>
                { buttons }
            </form>
        );
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return this.renderForm('empty form');
    };
}

export default BaseFormContainer;

BaseFormContainer.propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    initialData: PropTypes.object
};
import React from 'react';
import { mapValues, merge } from 'lodash';
import validate from "validate.js";
import Button from '@material-ui/core/Button';
import './FormHOC.scss';
//import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';


/**
 *
 * @param WrappedComponent
 * @param fields
 * @param validationRules
 * @returns {{new(*=): Form, prototype: Form}}
 * @constructor
 */
function FormHOC(WrappedComponent, fields, validationRules) {
    return class Form extends WrappedComponent {
        /**
         *
         * @param props
         */
        constructor(props) {
            super(props);
            const hocState = {
                isProcessing:false,
                data: this.initData(fields),
                errors: {}
            };
            if (this.state) {
                merge(this.state, hocState);
            } else {
                this.state = hocState;
            }

            this.validationRules = validationRules;
        }

        /**
         *
         * @returns {{}|*}
         */
        getValidationRules () {
            if (super.getValidationRules) {
                const func = super.getValidationRules;
                return super.getValidationRules();
            }

            return this.validationRules;
        };

        /**
         *
         * @returns {boolean}
         */
        validateForm = () => {
            const validationErrors = validate(this.state.data, this.getValidationRules(), {fullMessages: false});

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
            const validationRules = this.getValidationRules();

            if (validationRules[name]) {
                const errors = validate.single(value, validationRules[name], {fullMessages: false});
                if (errors) {
                    this.setState({errors: {...this.state.errors, [name]: errors}});
                } else {
                    this.setState({errors: {...this.state.errors, [name]: null}});
                }
            }
        };

        /**
         *
         * @param e
         */
        handleClearForm = (e) => {
            e.preventDefault();
            this.setState(function(state, props) {
                return {
                    data: mapValues(state.data, function(value){
                        return '';
                    })
                };
            });
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
         * @param params
         * @returns {*}
         */
        initData = (params) => {
            if (this.props.initialData) {
                const initialData = this.props.initialData;
                return mapValues(params, (item, key) => {
                    return initialData[key] !== undefined ? initialData[key] : item;
                });
            }

            return params;
        };

        /**
         *
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
         * @param event
         */
        handleOnSubmit = (event) => {
            event.preventDefault();
            if (!this.validateForm()) {
                if (this.onSubmitInvalid) {
                    this.onSubmitInvalid();
                }

                return;
            }

            this.onSubmitValid();
        };

        /**
         *
         * @returns {*}
         */
        renderButtons() {
            const childrenBtn = super.renderButtons;
            if (childrenBtn) {
                return childrenBtn();
            }

            return (
                <div className="form-buttons">
                    <Button variant="contained" color="default" disabled={this.state.isProcessing} onClick={this.handleCancel}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={this.state.isProcessing} color="primary">Submit {this.state.isProcessing && <CircularProgress size={25} />}</Button>
                </div>
            );
        };

        /**
         *
         * @returns {*}
         */
        render() {
            return (
                <form autoComplete="off" onSubmit={this.handleOnSubmit} className="base-form-container">
                    <div className="form-body">
                        { super.render() }
                    </div>
                    { this.renderButtons() }
                </form>
            );
        }
    }
}

export default FormHOC;
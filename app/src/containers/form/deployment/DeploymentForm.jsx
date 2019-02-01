import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormHOC from '../../hoc/FormHOC';
import TextField from '@material-ui/core/TextField';
import SelectAutocompleteField from '../../../components/form/fields/SelectAutocompleteField';

/**
 *
 */
class DeploymentForm extends Component {
    static defaultProps = {
        stages: [],
    };

    /**
     *
     */
    onSubmitValid = () => {
        this.props.onSubmit(this.state.data).catch(err => {
            if (err.errors) {
                this.setState({errors: err.errors});
            }
        });
    };

    render() {
        const { stages } = this.props;
        const { data, errors } = this.state;

        return (
            <React.Fragment>
                <SelectAutocompleteField
                    required={ true }
                    suggestions={ stages }
                    name="stage"
                    label="Stage"
                    value={ data.stage }
                    error={ Boolean(errors.stage) ? errors.stage[0] : '' }
                    onChange={ this.handleChange }
                    helperText=""
                />

                <TextField
                    label="Description"
                    required
                    name="description"
                    placeholder="Description"
                    helperText={ Boolean(errors.description) ? errors.description[0] : '' }
                    fullWidth
                    margin="normal"
                    multiline={ true }
                    error={ Boolean(errors.description) }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={ this.handleChange }
                    value={ data.description }
                />
            </React.Fragment>
        );
    }
}

/**
 *
 * @type {{stage: string}}
 */
const fields = {
    stage: ''
};

/**
 *
 * @type {{stage: {presence: {allowEmpty: boolean}}, description: {presence: {allowEmpty: boolean}, length: {maximum: number}}}}
 */
const validationRules = {
    stage: {
        presence: {
            allowEmpty: false
        },
    },
    description: {
        presence: {
            allowEmpty: false
        },
        length: {
            maximum: 120,
        }
    }
};

export default FormHOC(DeploymentForm, fields, validationRules);

DeploymentForm.propTypes = {
    stages: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

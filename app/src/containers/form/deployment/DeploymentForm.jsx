import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormHOC from '../../hoc/FormHOC';
import TextField from '@material-ui/core/TextField';
import SelectAutocompleteField from '../../../components/form/fields/SelectAutocompleteField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

/**
 *
 */
class DeploymentForm extends Component {
    static defaultProps = {
        stages: [],
    };

    state = {
        type: 0
    };

    /**
     *
     */
    onSubmitValid = () => {
        const { data } = this.state;
        data.type = this.state.type;

        this.props.onSubmit(data).catch(err => {
            if (err.errors) {
                this.setState({errors: err.errors});
            }
        });
    };

    /**
     *
     * @param event
     * @param value
     */
    handleChangeType = (event, value) => {
        this.setState({ type: value });
    };

    /**
     *
     * @returns {*|{}}
     */
    getValidationRules  ()  {
        const rules = this.validationRules;

        return rules[this.state.type] || {};
    };

    render() {
        const { stages } = this.props;
        const { data, errors, type } = this.state;

        return (
            <React.Fragment>
                <Tabs
                    value={ type }
                    onChange={ this.handleChangeType }
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Exist stage" />
                    <Tab label="New stage" />
                </Tabs>
                {type === 0 && <TabContainer>
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
                </TabContainer>}
                {type === 1 && <TabContainer>
                    <TextField
                        label="Stage name"
                        required
                        name="newStageName"
                        placeholder="Stage name"
                        helperText={ Boolean(errors.newStageName) ? errors.newStageName[0] : '' }
                        fullWidth
                        margin="normal"
                        multiline={ false }
                        error={ Boolean(errors.newStageName) }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={ this.handleChange }
                        value={ data.newStageName }
                    />
                    <TextField
                        label="Stage description"
                        required
                        name="newStageDescription"
                        placeholder="Stage description"
                        helperText={ Boolean(errors.newStageDescription) ? errors.newStageDescription[0] : '' }
                        fullWidth
                        margin="normal"
                        multiline={ true }
                        error={ Boolean(errors.newStageDescription) }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={ this.handleChange }
                        value={ data.newStageDescription }
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
                </TabContainer>}
            </React.Fragment>
        );
    }
}

/**
 *
 * @type {{stage: string}}
 */
const fields = {
    stage: '',
    description: '',
    newStageDescription: '',
    newStageName: '',
};


const validationRules = {
    0: {
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
    },
    1: {
        description: {
            presence: {
                allowEmpty: false
            },
            length: {
                maximum: 120,
            }
        },
        newStageName: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: "[A-Za-z0-9-_]+",
                flags: "i",
                message: "Can only contain A-Za-z0-9-_"
            },
            length: {
                maximum: 120,
            }
        },
        newStageDescription: {
            presence: {
                allowEmpty: false
            },
            length: {
                maximum: 120,
            }
        },
    }
};

export default FormHOC(DeploymentForm, fields, validationRules);

DeploymentForm.propTypes = {
    stages: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RestApiMethodForm from './RestApiMethodForm';
import IntegrationForm from './IntegrationForm';
import ResponseForm from './ResponseForm';

/**
 *
 * @param theme
 * @returns {{root: {width: string}, button: {marginTop: *, marginRight: *}, actionsContainer: {marginBottom: number}, resetContainer: {padding: number}}}
 */
const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

/**
 *
 * @type {string[]}
 */
const STEPS = ['HTTP method', 'Response configuration', 'Integration'];

/**
 *
 */
class StepperRestApiMethodForm extends Component {
    state = {
        activeStep: 0,
        httpMethod: ''
    };

    /**
     *
     */
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    /**
     *
     */
    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    /**
     *
     */
    handleCancel = () => {
        this.handleReset();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    };

    /**
     *
     * @param httpMethod
     */
    handleOnSuccessMethodCreate = (httpMethod) => {
        this.setState({httpMethod: httpMethod});
        this.handleNext();
    };

    /**
     *
     * @param index
     *
     * @returns {*}
     */
    getStepContent = (index) => {
        if(index === this.state.activeStep) {
            switch (this.state.activeStep) {
                case 0:
                    return <RestApiMethodForm
                        accountId={this.props.accountId}
                        restApiId={this.props.restApiId}
                        resource={this.props.resource}
                        isUpdateAction={false}
                        onSuccess={this.handleOnSuccessMethodCreate}
                        onCancel={this.handleCancel}
                    />;

                case 1:
                    return <ResponseForm
                        accountId={this.props.accountId}
                        restApiId={this.props.restApiId}
                        resourceId={this.props.resource.id}
                        isUpdateAction={false}
                        onSuccess={this.handleNext}
                        onCancel={this.handleCancel}
                        httpMethod = {this.state.httpMethod}
                    />;

                case 2:
                    return <IntegrationForm
                        accountId={this.props.accountId}
                        restApiId={this.props.restApiId}
                        resourceId={this.props.resource.id}
                        isUpdateAction={false}
                        onSuccess={this.handleNext}
                        onCancel={this.handleCancel}
                        httpMethod = {this.state.httpMethod}
                    />;

                default:
                    break;
            }
        }

        return null;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {STEPS.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {this.getStepContent(index)}
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === STEPS.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                    </Paper>
                )}
            </div>
        );
    }
}

StepperRestApiMethodForm.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(StepperRestApiMethodForm);

StepperRestApiMethodForm.propTypes = {
    accountId: PropTypes.any.isRequired,
    restApiId: PropTypes.string.isRequired,
    resource: PropTypes.object.isRequired,
    onCancel: PropTypes.func
};
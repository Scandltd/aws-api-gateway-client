import React from 'react';
import BaseFormContainer from '../BaseFormContainer';
import { connect } from "react-redux";
import RadioButtonsGroupField from '../../../components/form/fields/RadioButtonsGroupField';
import IntegrationTypeEnum, { INTEGRATION_TYPE_OPTIONS_LIST } from '../../../enum/integrationTypeEnum';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography'
import SelectField from '../../../components/form/fields/SelectField';
import HttpMethodEnum from '../../../enum/httpMethodTypeEnum';
import ContentHandlingTypeEnum, { CONTENT_HANDLING_OPTIONS_LIST } from '../../../enum/contentHandlingTypeEnum';
import ServiceActionTypeEnum, { SERVICE_ACTION_TYPE_LIST } from '../../../enum/serviceActionTypeEnum';

/**
 *
 */
class IntegrationForm extends BaseFormContainer {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state.data = this.initData({
            type: IntegrationTypeEnum.LambdaFunction,
            defaultTimeout: true,
            customTimeout: 0,
            lambdaProxyIntegration: false,
            lambdaFunctionName: '',
            lambdaFunctionRegion: '',
            httpProxyIntegration: false,
            httpMethod: '',
            httpEndpointUrl: '',
            httpContentHandling: ContentHandlingTypeEnum.PASSTHROUGH,
            serviceRegion: '',
            serviceName: '',
            serviceSubdomain: '',
            serviceHttpMethod: '',
            serviceActionType: ServiceActionTypeEnum.ACTION_NAME,
            serviceAction: '',
            serviceExecutionRole: '',
            serviceContentHandling: ContentHandlingTypeEnum.PASSTHROUGH,
            vpcProxyIntegration: false,
            vpcHttpMethod: '',
            vpcEndpointUrl: ''
        });

        this.setValidationRules({

        });
    }

    /**
     *
     * @returns {*}
     */
    getFormFragmentLambdaFunction = () => {
        return (
            <React.Fragment>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="lambdaProxyIntegration"
                                checked={this.state.data.lambdaProxyIntegration}
                                onChange={this.handleChange}
                                value="true"
                                color="primary"
                            />
                        }
                        label="Use Lambda Proxy integration"
                    />
                </FormGroup>

                <SelectField
                    options={{}}
                    name="lambdaFunctionRegion"
                    label="Lambda Region"
                    helperText=""
                    value={this.state.data.lambdaFunctionRegion}
                    error={this.state.errors.lambdaFunctionRegion}
                    onChange={this.handleChange}
                />

                <TextField
                    label="Lambda Function"
                    name="lambdaFunctionName"
                    placeholder=""
                    helperText={Boolean(this.state.errors.lambdaFunctionName) ? this.state.errors.lambdaFunctionName[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.lambdaFunctionName)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.lambdaFunctionName}
                />
            </React.Fragment>
        );
    };

    /**
     *
     * @returns {*}
     */
    getFormFragmentHttp = () => {
        return (
            <React.Fragment>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="httpProxyIntegration"
                                checked={this.state.data.httpProxyIntegration}
                                onChange={this.handleChange}
                                value="true"
                                color="primary"
                            />
                        }
                        label="Use HTTP Proxy integration"
                    />
                </FormGroup>
                <SelectField
                    required
                    options={HttpMethodEnum}
                    name="httpMethod"
                    label="HTTP method"
                    value={this.state.data.httpMethod}
                    error={Boolean(this.state.errors.httpMethod) ? this.state.errors.httpMethod[0] : ''}
                    onChange={this.handleChange}
                    helperText=""
                />
                <TextField
                    label="Endpoint URL"
                    name="httpEndpointUrl"
                    placeholder=""
                    helperText={Boolean(this.state.errors.httpEndpointUrl) ? this.state.errors.httpEndpointUrl[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.httpEndpointUrl)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.httpEndpointUrl}
                />

                <SelectField
                    required
                    options={CONTENT_HANDLING_OPTIONS_LIST}
                    name="httpContentHandling"
                    label="Content Handling"
                    value={this.state.data.httpContentHandling}
                    error={Boolean(this.state.errors.httpContentHandling) ? this.state.errors.httpContentHandling[0] : ''}
                    onChange={this.handleChange}
                    helperText='Specifies how to handle request payload content type conversions'
                />
            </React.Fragment>);
    };

    /**
     *
     * @returns {*}
     */
    getFormFragmentAwsService = () => {
        return (
            <React.Fragment>
                <SelectField
                    options={{}}
                    name="serviceRegion"
                    label="Service Region"
                    helperText=""
                    value={this.state.data.serviceRegion}
                    error={this.state.errors.serviceRegion}
                    onChange={this.handleChange}
                />

                <SelectField
                    options={{}}
                    name="serviceName"
                    label="Service"
                    helperText=""
                    value={this.state.data.serviceName}
                    error={this.state.errors.serviceName}
                    onChange={this.handleChange}
                />

                <TextField
                    label="AWS subdomain"
                    name="serviceSubdomain"
                    placeholder=""
                    helperText={Boolean(this.state.errors.serviceSubdomain) ? this.state.errors.serviceSubdomain[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.serviceSubdomain)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.serviceSubdomain}
                />

                <SelectField
                    required
                    options={HttpMethodEnum}
                    name="serviceHttpMethod"
                    label="HTTP method"
                    value={this.state.data.serviceHttpMethod}
                    error={Boolean(this.state.errors.serviceHttpMethod) ? this.state.errors.serviceHttpMethod[0] : ''}
                    onChange={this.handleChange}
                    helperText=""
                />

                <RadioButtonsGroupField
                    options={SERVICE_ACTION_TYPE_LIST}
                    value={this.state.data.serviceActionType}
                    onChange={this.handleChange}
                    label="Action type"
                    name="serviceActionType"
                    error={Boolean(this.state.errors.serviceActionType) ? this.state.errors.serviceActionType[0] : ''}
                    helperText=""
                />

                <TextField
                    label="Action"
                    name="serviceAction"
                    placeholder=""
                    helperText={Boolean(this.state.errors.serviceAction) ? this.state.errors.serviceAction[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.serviceAction)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.serviceAction}
                />

                <TextField
                    label="Execution Role"
                    name="serviceExecutionRole"
                    placeholder=""
                    helperText={Boolean(this.state.errors.serviceExecutionRole) ? this.state.errors.serviceExecutionRole[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.serviceExecutionRole)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.serviceExecutionRole}
                />

                <SelectField
                    required
                    options={CONTENT_HANDLING_OPTIONS_LIST}
                    name="serviceContentHandling"
                    label="Content Handling"
                    value={this.state.data.serviceContentHandling}
                    error={Boolean(this.state.errors.serviceContentHandling) ? this.state.errors.serviceContentHandling[0] : ''}
                    onChange={this.handleChange}
                    helperText='Specifies how to handle request payload content type conversions'
                />

            </React.Fragment>
        );
    };

    /**
     *
     * @returns {*}
     */
    getFormFragmentVPCLink = () => {
        return (
            <React.Fragment>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="vpcProxyIntegration"
                                checked={this.state.data.vpcProxyIntegration}
                                onChange={this.handleChange}
                                value="true"
                                color="primary"
                            />
                        }
                        label="Use Proxy Integration"
                    />
                </FormGroup>

                <SelectField
                    required
                    options={HttpMethodEnum}
                    name="vpcHttpMethod"
                    label="HTTP method"
                    value={this.state.data.vpcHttpMethod}
                    error={Boolean(this.state.errors.vpcHttpMethod) ? this.state.errors.vpcHttpMethod[0] : ''}
                    onChange={this.handleChange}
                    helperText=""
                />

                <TextField
                    label="Endpoint URL"
                    name="vpcEndpointUrl"
                    placeholder=""
                    helperText={Boolean(this.state.errors.vpcEndpointUrl) ? this.state.errors.vpcEndpointUrl[0] : ''}
                    fullWidth
                    margin="normal"
                    error={Boolean(this.state.errors.vpcEndpointUrl)}
                    multiline={false}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange}
                    value={this.state.data.vpcEndpointUrl}
                />
            </React.Fragment>
        );
    };

    /**
     *
     * @returns {*}
     */
    renderFormFragmentByType = () => {
        switch (this.state.data.type) {
            case IntegrationTypeEnum.LambdaFunction:
                return this.getFormFragmentLambdaFunction();

            case IntegrationTypeEnum.HTTP:
                return this.getFormFragmentHttp();

            case IntegrationTypeEnum.Mock:
                return <Typography>Mock type does not have any special parameters</Typography>;

            case IntegrationTypeEnum.AWSService:
                return this.getFormFragmentAwsService();

            case IntegrationTypeEnum.VPCLink:
                return this.getFormFragmentVPCLink();

            default:
                return '';
        }
    };

    /**
     *
     * @returns {*}
     */
    renderCustomTimeoutBlock = () => {
        if (IntegrationTypeEnum.Mock === this.state.data.type) {
            return null;
        }

        const customTimeoutField = this.state.data.defaultTimeout ? '' : (<TextField
            label="Custom Timeout"
            name="customTimeout"
            placeholder="3600"
            helperText={Boolean(this.state.errors.customTimeout) ? this.state.errors.customTimeout[0] : 'Custom Timeout in milliseconds. The value must between 50-29000'}
            fullWidth
            margin="normal"
            error={Boolean(this.state.errors.customTimeout)}
            multiline={false}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={this.handleChange}
            value={this.state.data.customTimeout}
        />);

        return (
            <React.Fragment>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="defaultTimeout"
                                checked={this.state.data.defaultTimeout}
                                onChange={this.handleChange}
                                value="true"
                                color="primary"
                            />
                        }
                        label="Use default timeout"
                    />
                </FormGroup>
                { customTimeoutField }
            </React.Fragment>
        );
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return this.renderForm(
            <React.Fragment>
                <RadioButtonsGroupField
                    options={INTEGRATION_TYPE_OPTIONS_LIST}
                    value={this.state.data.type}
                    onChange={this.handleChange}
                    label="Integration type"
                    name="type"
                    error={Boolean(this.state.errors.type) ? this.state.errors.type[0] : ''}
                    helperText="Integration point for HTTP method"
                />

                { this.renderFormFragmentByType() }
                { this.renderCustomTimeoutBlock() }
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
            //createHttpMethod: (accountId, restApiId, resourceId, data, onSuccess = null, onError = null) => dispatch(createMethodApiRequest(accountId, restApiId, resourceId, data, onSuccess, onError)),
        }
    }
};

export default connect(null, mapDispatchToProps)(IntegrationForm);

IntegrationForm.propTypes = {};
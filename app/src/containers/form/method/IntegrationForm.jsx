import React, { Component } from 'react';
import { connect } from "react-redux";
import RadioButtonsGroupField from '../../../components/form/fields/RadioButtonsGroupField';
import IntegrationTypeEnum, { INTEGRATION_TYPE_OPTIONS_LIST } from '../../../enum/integrationTypeEnum';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography'
import SelectField from '../../../components/form/fields/SelectField';
import SelectAutocompleteField from '../../../components/form/fields/SelectAutocompleteField';
import HttpMethodEnum from '../../../enum/httpMethodTypeEnum';
import ContentHandlingTypeEnum from '../../../enum/contentHandlingTypeEnum';
import ServiceActionTypeEnum, { SERVICE_ACTION_TYPE_LIST } from '../../../enum/serviceActionTypeEnum';
import PropTypes from 'prop-types';
import { putMethodIntegrationApiRequest, loadVpsLinksApiRequest } from '../../../store/actions/entriesActions';
import { getAwsRegionSuggestionList, getAwsRegionsOptionsList } from '../../../enum/awsRegions';
import AWS_SERVICES_ENUM, { getServiceSuggestionList } from '../../../enum/awsServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHOC from '../../hoc/FormHOC';
import { getLambdaFunctions } from '../../../store/actions/listActions';
import getLambdaFunctionList from '../../../store/selectors/lambdaFunnctionListSelector';
import getVpcLinksSuggestion from '../../../store/selectors/vpsLinksSuggestionSelector';

const AWS_REGIONS_SUGGESTION = getAwsRegionSuggestionList();
const AWS_REGIONS = getAwsRegionsOptionsList();
const AWS_SERVICE_SUGGESTION = getServiceSuggestionList();

/**
 *
 */
class IntegrationForm extends Component {
    /**
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.data.type !== this.state.data.type && IntegrationTypeEnum.LambdaFunction === this.state.data.type) {
            if (!this.props.lambdaFunctionList) {
                this.props.actions.getLambdaFunctions(this.props.accountId);
            }
        }
    }

    /**
     *
     */
    componentDidMount() {
        if (IntegrationTypeEnum.LambdaFunction === this.state.data.type) {
            if (!this.props.lambdaFunctionList) {
                this.props.actions.getLambdaFunctions(this.props.accountId);
            }
        }
    }

    /**
     *
     */
    setLoadingTrue() {
        this.setState({isLoading: true});
    };

    /**
     *
     */
    setLoadingFalse() {
        this.setState({isLoading: false});
    };

    /**
     *
     * @returns {*|{}}
     */
    getValidationRules  ()  {
        const rules = this.validationRules;
        let dynamicRules = rules[this.state.data.type] || {};

        if (IntegrationTypeEnum.Mock !== this.state.data.type && !this.state.data.defaultTimeout) {
            dynamicRules.customTimeout = rules.common.customTimeout;
        }

        return dynamicRules;
    };

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
        this.setState({isProcessing: true});
        let data = this.state.data;
        data.constData = {
            restApiId: this.props.restApiId,
            resourceId: this.props.resourceId,
            httpMethod: this.props.httpMethod,
        };

        this.props.actions.putMethodIntegration(this.props.accountId, data, this.onRequestSuccess, this.onRequestError);
    };

    /**
     *
     */
    checkAndLoadVpsLinksOptions = (value) => {
        if (IntegrationTypeEnum.VPCLink !== value) {

            return ;
        }

        if (!this.props.vpcLinks) {
            this.setLoadingTrue();
            this.props.actions.loadVpsLinksApiRequest(this.props.accountId,
                (response) => {
                    this.setLoadingFalse();
                },
                (err) => {
                    this.setLoadingFalse();
                });
        }
    };

    /**
     *
     * @returns {*}
     */
    getFormFragmentLambdaFunction = () => {
        if (this.props.isLambdaFunctionLoading) {
            return ( <FormGroup>
                <CircularProgress />
            </FormGroup>);
        }

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

                <SelectAutocompleteField
                    suggestions={ AWS_REGIONS_SUGGESTION }
                    name="lambdaFunctionRegion"
                    label="Lambda Region"
                    helperText=""
                    value={this.state.data.lambdaFunctionRegion}
                    error={Boolean(this.state.errors.lambdaFunctionRegion) ? this.state.errors.lambdaFunctionRegion[0] : ''}
                    onChange={this.handleChange}
                    placeholder="Choose one"
                />

                <SelectAutocompleteField
                    suggestions={ this.props.lambdaFunctionList || [] }
                    name="lambdaFunctionName"
                    label="Lambda Function NAME(ARN)"
                    value={this.state.data.lambdaFunctionName}
                    error={Boolean(this.state.errors.lambdaFunctionName) ? this.state.errors.lambdaFunctionName[0] : ''}
                    onChange={this.handleChange}
                    placeholder="Choose one"
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
                    options={ContentHandlingTypeEnum}
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
                <SelectAutocompleteField
                    suggestions={ AWS_REGIONS_SUGGESTION }
                    name="serviceRegion"
                    label="Service Region"
                    helperText=""
                    value={this.state.data.serviceRegion}
                    error={Boolean(this.state.errors.serviceRegion) ? this.state.errors.serviceRegion[0] : ''}
                    onChange={this.handleChange}
                    placeholder="Choose one"
                />

                <SelectAutocompleteField
                    suggestions={ AWS_SERVICE_SUGGESTION }
                    name="serviceName"
                    label="Service"
                    helperText=""
                    value={this.state.data.serviceName}
                    error={Boolean(this.state.errors.serviceName) ? this.state.errors.serviceName[0] : ''}
                    onChange={this.handleChange}
                    placeholder="Choose one"
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
                    options={ContentHandlingTypeEnum}
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
        if (this.state.isLoading) {
            return ( <FormGroup>
                <CircularProgress />
            </FormGroup>);
        }

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

                <SelectAutocompleteField
                    suggestions={ this.props.vpcLinks }
                    name="vpcConnectId"
                    label="VPC link"
                    value={this.state.data.vpcConnectId}
                    error={Boolean(this.state.errors.vpcConnectId) ? this.state.errors.vpcConnectId[0] : ''}
                    onChange={this.handleChange}
                    placeholder="Choose one"
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
        return (
            <React.Fragment>
                <RadioButtonsGroupField
                    options={INTEGRATION_TYPE_OPTIONS_LIST}
                    value={this.state.data.type}
                    onChange={(event) => {
                            this.handleChange(event);
                            this.checkAndLoadVpsLinksOptions(event.target.value);
                        }
                    }
                    label="Integration type"
                    name="type"
                    error={Boolean(this.state.errors.type) ? this.state.errors.type[0] : ''}
                    helperText="Integration point for HTTP method"
                    disabled={ this.state.isLoading || this.props.isLambdaFunctionLoading }
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
            putMethodIntegration: (accountId, data, onSuccess = null, onError = null) => dispatch(putMethodIntegrationApiRequest(accountId, data, onSuccess, onError)),
            loadVpsLinksApiRequest: (accountId, onSuccess = null, onError = null) => dispatch(loadVpsLinksApiRequest(accountId, onSuccess, onError)),
            getLambdaFunctions: (accountId) => dispatch(getLambdaFunctions(accountId)),
        }
    }
};

/**
 *
 * @param state
 * @param props
 *
 * @returns {{vpcLinks: ({}|defaultState.vpcLinks)}}
 */
const mapStateToProps = (state, props) => {
    const { loadingLambdaFunction } = state.list;

    return {
        lambdaFunctionList: getLambdaFunctionList(state, props),
        isLambdaFunctionLoading: loadingLambdaFunction,
        vpcLinks: getVpcLinksSuggestion(state, props),
    }
};

const validationRules = {
    [IntegrationTypeEnum.LambdaFunction]: {
        lambdaFunctionName: {
            presence: {
                allowEmpty: false
            }
        },
        lambdaFunctionRegion: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(AWS_REGIONS)
        }
    },
    [IntegrationTypeEnum.HTTP]: {
        httpMethod: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(HttpMethodEnum)
        },
        httpEndpointUrl: {
            presence: {
                allowEmpty: false
            },
            url: {
                allowLocal: true
            }
        },
        httpContentHandling: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(ContentHandlingTypeEnum)
        }
    },
    [IntegrationTypeEnum.AWSService]: {
        serviceRegion: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(AWS_REGIONS)
        },
        serviceName: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(AWS_SERVICES_ENUM)
        },
        serviceSubdomain: {},
        serviceHttpMethod: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(HttpMethodEnum)
        },
        serviceActionType: {
            inclusion: Object.values(ServiceActionTypeEnum)
        },
        serviceAction: {},
        serviceExecutionRole: {},
        serviceContentHandling: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(ContentHandlingTypeEnum)
        }
    },
    [IntegrationTypeEnum.VPCLink]: {
        vpcProxyIntegration: {},
        vpcHttpMethod: {
            presence: {
                allowEmpty: false
            },
            inclusion: Object.values(HttpMethodEnum)
        },
        vpcConnectId: {
            presence: {
                allowEmpty: false
            },
        },
        vpcEndpointUrl: {
            presence: {
                allowEmpty: false
            },
            url: {
                allowLocal: true
            }
        }
    },
    common: {
        customTimeout: {
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 50,
                lessThanOrEqualTo: 29000
            }
        },
    }
};

const fields = {
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
    vpcEndpointUrl: '',
    vpcConnectId: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(FormHOC(IntegrationForm, fields, validationRules));

IntegrationForm.propTypes = {
    httpMethod: PropTypes.oneOf(Object.values(HttpMethodEnum)).isRequired,
    restApiId: PropTypes.string.isRequired,
    resourceId: PropTypes.string.isRequired,
    accountId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    getLambdaFunctions: PropTypes.func,
    isLambdaFunctionLoading: PropTypes.bool,
};

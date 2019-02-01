import React, { Component } from 'react';
import { createSelector } from 'reselect'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    loadStages,
    setDefault
} from '../../store/actions/stagesActions';
import {
    createDeploymentRequest,
} from '../../store/actions/deploymentActions';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';
import DeploymentForm from '../form/deployment/DeploymentForm';
import Typography from '@material-ui/core/Typography';

/**
 *
 */
class ApiDeploy extends Component {
    /**
     *
     */
    componentDidMount() {
        const { accountId, apiId } = this.props.match.params;

        this.props.loadStages(accountId, apiId);
    }

    /**
     *
     */
    componentWillUnmount() {
        this.props.setDefault();
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const { stages, loadingStaging, createRequestLoading } = this.props;

        return (
            <DialogFormComponent
                open={ true }
                title="Deploy API"
                onClose={ this.handleCancel }
                maxWidth="sm"
            >
                <Typography variant="subtitle2" >
                    Choose a stage where your API will be deployed.
                </Typography>
                { loadingStaging ?
                    <CircularProgress />
                    :
                    <DeploymentForm
                        stages={ stages }
                        onSubmit={ this.handleSubmit }
                        onCancel={ this.handleCancel }
                        disabled={ createRequestLoading }
                    />
                }
            </DialogFormComponent>
        );
    }

    /**
     *
     * @param data
     *
     * @returns {*}
     */
    handleSubmit = (data) => {
        const { accountId, apiId } = this.props.match.params;
        const stage = this.props.stages.find(item => item.value === data.stage);
        if (!stage) {
            return Promise.reject({errors: {
                stage: 'Unable to find stage',
            }});
        }

        const params = {
            stageName: stage.label || null,
            description: data.description,
        };

        return this.props.createDeploymentRequest(accountId, apiId, params).then(data => {
            this.props.history.replace(`/account/${accountId}/api`);

            return data;
        });
    };

    /**
     *
     */
    handleCancel = () => {
        const { accountId } = this.props.match.params;

        this.props.history.replace(`/account/${accountId}/api`);
    };
}

const getStages = (state) => state.stages.stages;

const getStagesNames = createSelector(
    [getStages],
    (stages) => {
        if (!stages) {
            return [];
        }

        return stages.map((item) => {
            return {
                label: item.stageName,
                value: item.deploymentId,
            };
        });
    }
);

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        stages: getStagesNames(state),
        loadingStaging: state.stages.loading,
        createRequestLoading: state.deployment.loading,
    }
};

export default connect(mapStateToProps, {
    loadStages,
    setDefault,
    createDeploymentRequest,
})(ApiDeploy);

ApiDeploy.propTypes = {
    stages: PropTypes.array.isRequired,
    loadingStaging: PropTypes.bool.isRequired,
    createRequestLoading: PropTypes.bool.isRequired,
};

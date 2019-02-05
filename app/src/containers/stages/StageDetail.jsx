import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { orderBy } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/ArrowBack';
import TabsWrapper from '../../components/tabsWrapper/TabsWrapper';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';
import StageSettings from '../../components/stages/stageSettings/StageSettings';
import StageVariables from '../../components/stages/stageVariables/StageVariables';
import StageDeployHistory from '../../components/stages/stageDeployHistory/StageDeployHistory';
import {
    setDefault,
    loadStage,
    loadDeployments,
} from '../../store/actions/stageDetailAction';

const styles = theme => ({
    contentWrapper: {
        padding: 0,
    },
});

/**
 *
 */
class StageDetail extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.tabs = [
            'Settings',
            'Stage variables',
            'Deployment history',
        ];
        this.state = {
            tabValue: 0,
        };
    }

    /**
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevState.tabValue !== this.state.tabValue) {
            this.requestData(this.state.tabValue);
        }
    }

    /**
     *
     */
    componentDidMount() {
        this.requestData(this.state.tabValue);
    }

    /**
     *
     */
    componentWillUnmount() {
        this.props.setDefault();
    }

    /**
     *
     * @param value
     */
    handleChangeTab = (value) => {
        this.setState({tabValue: value});
    };

    /**
     *
     * @param type
     */
    requestData = (type) => {
        const { accountId, apiId, stageName } = this.props.match.params;
        const { stage } = this.props;

        if (!stage) {
            this.props.loadStage(accountId, apiId, stageName);
        }

        switch (type) {
            case 2:
                const { deployments } = this.props;
                if (!deployments || 0 === deployments.length) {
                    this.props.loadDeployments(accountId, apiId, null);
                }

                break;

            default:
                break;
        }
    };

    /**
     *
     * @param position
     */
    handleLoadMoreDeployments = (position) => {
        const { accountId, apiId } = this.props.match.params;

        this.props.loadDeployments(accountId, apiId, position);
    };

    /**
     *
     * @returns {*}
     */
    renderTabContent(){
        const { tabValue } = this.state;
        const {stage, stageLoading} = this.props;

        switch (tabValue) {
            case 0:
                return <StageSettings
                    entity={ stage }
                    loading={ stageLoading }
                />;

            case 1:

                return <StageVariables />;

            case 2:
                const {
                    deployments,
                    deploymentsLoading,
                    deploymentPosition
                } = this.props;

                return <StageDeployHistory
                    items={ deployments }
                    activeDeployId={ stage ? stage.deploymentId : null }
                    position={ deploymentPosition }
                    loading={ deploymentsLoading || stageLoading }
                    onLoadMore={ this.handleLoadMoreDeployments }
                />;

            default:
                return null;
        }
    }

    /**
     *
     */
    handleBackAction = () => {
        const { accountId, apiId } = this.props.match.params;

        this.props.history.push(`/account/${accountId}/api/${apiId}/stage`);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {classes, stage} = this.props;

        return (
            <InnerPageWrapper
                title={`Stage: ${stage ? stage.stageName : null}`}
                contentClass={classes.contentWrapper}
                actions={
                    <Tooltip title="To REST APIs">
                        <IconButton aria-label="To REST APIs" onClick={ this.handleBackAction }>
                            <BackIcon/>
                        </IconButton>
                    </Tooltip>
                }
            >
                <TabsWrapper
                    labels={this.tabs}
                    onChangeTab={this.handleChangeTab}
                >
                    { this.renderTabContent() }
                </TabsWrapper>
            </InnerPageWrapper>
        );
    }
}

const getDeployments = (state) => state.stageDetail.deployments;

const getSortedDeployments = createSelector(
    [getDeployments],
    (deployments) => {
        if (!deployments) {
            return [];
        }

        return orderBy(deployments, 'createdDate', 'desc');
    }
);

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        stage: state.stageDetail.stage,
        stageLoading: state.stageDetail.stageLoading,
        deployments: getSortedDeployments(state),
        deploymentsLoading: state.stageDetail.deploymentsLoading,
        deploymentPosition: state.stageDetail.deploymentPosition,
    }
};

export default connect(mapStateToProps, {
    setDefault,
    loadStage,
    loadDeployments,
})(withStyles(styles)(StageDetail));

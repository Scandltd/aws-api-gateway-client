import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadStages, setDefault, deleteStage } from '../../store/actions/stagesActions';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/ArrowBack';
import StagesTable  from '../../components/stages/stagesTable/StagesTable';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 *
 */
class Stages extends Component {
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
     * @param name
     * @param deployId
     */
    handleOnSettings = (name, deployId) => {
        console.log('on settings', name, deployId);
    };

    /**
     *
     * @param name
     * @param deployId
     */
    handleDelete = (name, deployId) => {
        const { accountId, apiId } = this.props.match.params;

        this.props.deleteStage(accountId, apiId, name);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { stages, loading, deleteRequestLoading } = this.props;

        return (
            <InnerPageWrapper
                title="Stages"
                actions={
                    <Tooltip title="To REST APIs">
                        <IconButton aria-label="To REST APIs" onClick={ this.handleBackAction }>
                            <BackIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                { (loading || deleteRequestLoading) ?
                    <CircularProgress />
                    :
                    <StagesTable
                        items={ stages }
                        onSettings={ this.handleOnSettings }
                        onDelete={ this.handleDelete }
                    />}
            </InnerPageWrapper>
        );
    }

    /**
     *
     */
    handleBackAction = () => {
        const { accountId } = this.props.match.params;

        this.props.history.push(`/account/${accountId}/api`);
    };
}

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        stages: state.stages.stages,
        loading: state.stages.loading,
        deleteRequestLoading: state.stages.deleteRequestLoading,
    }
};

export default connect(mapStateToProps, {
    loadStages,
    setDefault,
    deleteStage,
})(Stages);

Stages.propTypes = {};

import React, { Component } from 'react';
import InnerPageWrapper from '../../components/innerPageWrapper/InnerPageWrapper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackIcon from '@material-ui/icons/ArrowBack';

class Stages extends Component {
    render() {
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
                <div>Component goes here</div>
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

export default Stages;

Stages.propTypes = {};

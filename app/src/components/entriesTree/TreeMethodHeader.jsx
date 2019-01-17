import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/**
 *
 */
class TreeMethodHeader extends Component
{
    render() {
        return (
            <React.Fragment>
                <div className="method-head-first">
                    <Typography >{this.props.httpMethod}</Typography>
                </div>
                <div className="method-head-second">
                    <Typography >{this.props.path}</Typography>
                </div>
            </React.Fragment>
        );
    };
}

export default TreeMethodHeader;

TreeMethodHeader.propTypes = {
    httpMethod: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

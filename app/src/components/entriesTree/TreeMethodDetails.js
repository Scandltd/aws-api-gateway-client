import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
class TreeMethodDetails extends Component {
    render() {
        return (<div>Component TreeMethodDetails {this.props.entity.httpMethod}</div>)
    }
}

export default TreeMethodDetails;

TreeMethodDetails.propTypes = {
    entity: PropTypes.object.isRequired,
};

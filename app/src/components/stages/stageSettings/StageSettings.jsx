import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StageSettings extends Component {
  render() {
    return (<div>Component StageSettings</div>)
  }
}

export default StageSettings;

StageSettings.propTypes = {
    entity: PropTypes.object,   //@todo check for null
    loading: PropTypes.bool,
};

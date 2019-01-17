import React, { Component } from 'react';

class SettingsAccountEdit extends Component {
  render() {
    const { id } = this.props.match.params;

    return (
        <div>
            Component SettingsAccountEdit id:{ id }
        </div>
    );
  }
}

export default SettingsAccountEdit;

SettingsAccountEdit.propTypes = {};
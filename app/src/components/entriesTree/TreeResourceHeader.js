import React, { Component } from 'react';

/**
 *
 */
class TreeResourceHeader extends Component
{
    render() {
        return (
            <div className="tree-resource-header">
                {this.props.path}
            </div>
        );
    };

}

export default TreeResourceHeader;

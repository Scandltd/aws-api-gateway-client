import React, { Component } from 'react';

/**
 *
 */
class TreeMethodHeader extends Component
{
    render() {
        return (
            <div className="tree-method-header">
                <div className="method-type">{this.props.name}</div>
                <div className="method-actions">method actions</div>
            </div>
        );
    };
}

export default TreeMethodHeader;

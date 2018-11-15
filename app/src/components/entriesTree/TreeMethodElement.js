import React, { Component } from 'react';
import TreeMethodHeader from './TreeMethodHeader';
import TreeMethodBody from './TreeMethodBody';

/**
 *
 */
class TreeMethodElement extends Component
{
    render() {
        return (
            <div className="tree-method">
                <TreeMethodHeader name={this.props.name}/>
                <TreeMethodBody />
            </div>
        );
    }
}

export default  TreeMethodElement;

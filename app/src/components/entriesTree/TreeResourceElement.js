import React, { Component } from 'react';
import TreeResourceHeader from './TreeResourceHeader';
import TreeMethodElement from './TreeMethodElement';
import { mapKeys } from 'lodash';

/**
 *
 */
class TreeResourceElement extends Component
{
    /**
     *
     * @returns {*}
     */
    renderMethodElements = () => {
        let i = 0;
        let elements = [];
        mapKeys(this.props.resourceMethods, (value, key) => {
            elements.push(<TreeMethodElement name={key} key={i++}/>);
        });

        return elements;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="tree-resource">
                <TreeResourceHeader path={this.props.path} id={this.props.id} parentId={this.props.parentId}/>
                {this.renderMethodElements()}
                {this.props.nested}
            </div>
        );
    }
}

export default TreeResourceElement;
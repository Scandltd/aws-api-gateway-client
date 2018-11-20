import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TreeResourceElement from './TreeResourceElement';
import './entriesTree.scss';

/**
 *
 */
class EntriesTree extends Component
{
    /**
     *
     * @param resource
     * @param level         -- used to open first tab
     *
     * @returns {*}
     */
    renderTreeElements(resource, level = 0) {
        return resource.map((item, idx) => {
            let nested = '';
            if (item.children && 0 !== item.children.length) {
                nested = this.renderTreeElements(item.children, level + 1);
            }

            return <TreeResourceElement
                key={item.id}
                id={item.id}
                path={item.path}
                parentId={item.parentId}
                resourceMethods={item.resourceMethods ? item.resourceMethods : {}}
                nested={nested}
                expanded={0 === level}
            />
        });
    }

    /**
     *
     * @returns {*}
     */
    renderTree() {
        return this.renderTreeElements(this.props.treeEntries);
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div className="entries-tree">
                {this.renderTree()}
            </div>
        );
    };
}

export default EntriesTree;

EntriesTree.propsTypes = {
    treeEntries: PropTypes.array.isRequired
};
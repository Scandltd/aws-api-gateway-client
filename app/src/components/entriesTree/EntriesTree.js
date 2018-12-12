import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TreeResourceElement from './TreeResourceElement';
import './entriesTree.scss';
import arrayToTree from 'array-to-tree';
import { remove, indexOf } from 'lodash';

/**
 *
 */
class EntriesTree extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            treeEntries: [],
            expanded: []
        };
    }

    /**
     *
     * @returns {Array}
     */
    buildTree() {
        return arrayToTree(this.props.entries, {
            parentProperty: 'parentId',
            customID: 'id'
        });
    }

    /**
     *
     * @param itemId
     * @param expanded
     */
    onExpand = (itemId, expanded) => {
        this.setState(function(state, props) {
            const expandedList = state.expanded;

            if (expanded) {
                expandedList.push(itemId);
            } else {
                remove(expandedList, function(element){
                    return element === itemId;
                });
            }

            return {
                expanded: expandedList
            };
        });
    };

    /**
     *
     * @param resource
     * @param level
     *
     * @returns {*}
     */
    renderTreeElements(resource, level = 0) {
        return resource.map((item, idx) => {
            const extended = 0 === level || -1 !== indexOf(this.state.expanded, item.id);
            let nested = '';
            if (item.children && 0 !== item.children.length && extended) {
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
                onExpand={this.onExpand}
                handleInitResourceAction={this.props.handleInitResourceAction}
                handleInitHttpMethodAction={this.props.handleInitHttpMethodAction}
            />
        });
    }

    /**
     *
     * @returns {*}
     */
    renderTree() {
        return this.renderTreeElements(this.buildTree());
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
    entries: PropTypes.array.isRequired,
    handleInitResourceAction: PropTypes.func.isRequired,
    handleInitHttpMethodAction: PropTypes.func.isRequired
};
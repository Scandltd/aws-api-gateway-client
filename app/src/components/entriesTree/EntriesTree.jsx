import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TreeResourceElement from './TreeResourceElement';
import './entriesTree.scss';
import { remove, indexOf, forEach, pullAll, map } from 'lodash';
import { getToggleIds } from '../../utils/treeHelper';

/**
 *
 * @param entries
 *
 * @returns {*}
 */
const getInitialExpandedElement = function(entries) {
    return map(entries, (item) => {
        return item.id;
    });
};

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
            expanded: getInitialExpandedElement(props.entries),
        };
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
     * @param resourceId
     * @param action
     */
    handleMassToggleAction = (resourceId, action) => {
        const { entries } = this.props;

        const ids = getToggleIds(entries, resourceId);

        if (0 !== ids.length) {
            this.setState((state, props) => {
                const { expanded } = state;
                if (action === 'show') {
                    forEach(ids, (item) => {
                        if (-1 === indexOf(expanded, item)) {
                            expanded.push(item);
                        }
                    });
                } else {
                    pullAll(expanded, ids);
                }

                return {
                    expanded
                };
            });
        }
    };

    /**
     *
     * @param resource
     *
     * @returns {*}
     */
    renderTreeElements(resource) {
        return resource.map((item, idx) => {
            const extended = -1 !== indexOf(this.state.expanded, item.id);
            let nested = '';
            if (item.children && 0 !== item.children.length && extended) {
                nested = this.renderTreeElements(item.children);
            }

            return <TreeResourceElement
                key={item.id}
                id={item.id}
                path={item.path}
                parentId={item.parentId}
                resourceMethods={item.resourceMethods ? item.resourceMethods : {}}
                matchToFilter={ undefined === item.matchToFilter ? true : item.matchToFilter }
                nested={nested}
                expanded={ extended }
                onExpand={this.onExpand}
                handleInitResourceAction={this.props.handleInitResourceAction}
                handleInitHttpMethodAction={this.props.handleInitHttpMethodAction}
                onMassToggleAction={this.handleMassToggleAction}
            />
        });
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const { entries } = this.props;

        return (
            <div className="entries-tree">
                { this.renderTreeElements(entries) }
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

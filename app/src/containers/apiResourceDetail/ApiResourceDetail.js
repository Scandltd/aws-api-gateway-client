import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadResources } from '../../store/actions/entriesActions';
import EntriesTree from '../../components/entriesTree/EntriesTree';
import arrayToTree from 'array-to-tree';

/**
 * 
 */
class ApiResourceDetail extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            accountId: props.match.params.accountId,
            apiId: props.match.params.apiId
        };
    }

    /**
     *
     */
    componentDidMount() {
        if (!this.props.entries[this.state.apiId]) {
            this.props.actions.loadResources(this.state.accountId, this.state.apiId);
        }
    }

    /**
     *
     * @returns {Array}
     */
    getEntries = () => {
        return this.props.entries && Array.isArray(this.props.entries[this.state.apiId]) ? this.props.entries[this.state.apiId] : [];
    };

    /**
     *
     * @returns {Array}
     */
    buildTree = () => {
        return arrayToTree(this.getEntries(), {
            parentProperty: 'parentId',
            customID: 'id'
        });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <div>
                API detail page. Account id: {this.props.match.params.accountId} | Api id: {this.props.match.params.apiId}
                <EntriesTree treeEntries={this.buildTree()} />
            </div>
        );
    }
}

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state) => {
    return {
        entries: state.entries.entries,
        loaded: false
    }
};

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadResources: (accountId, apiId) => dispatch(loadResources(accountId, apiId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiResourceDetail);
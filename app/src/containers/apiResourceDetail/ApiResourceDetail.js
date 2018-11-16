import React, {Component} from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { loadResorces } from '../../store/actions/entriesActions';
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
            apiId: props.match.params.apiId,
            loadedResources : false,
        };
    }

    /**
     *
     */
    componentDidMount() {
        let account = this.getAccount();
        if (account) {
            this.loadResources(account);
        }
    }

    /**
     *
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.loadedResources) {
            let account = this.getAccount();
            if (account) {
                this.loadResources(account);
            }
        }
    }

    /**
     *
     * @param account
     */
    loadResources(account) {
        this.setState({loadedResources: true});
        this.props.actions.loadResources(this.state.apiId, this.getAccount().credentials);
    }


    /**
     *
     * @returns {*}
     */
    getAccount = () => {
       return find(this.props.accounts, {id: this.state.accountId});
    };

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

    render() {

        const tree = this.buildTree();
        console.log(tree);

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
        accounts: state.account.accounts,
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
            loadResources: (apiId, credentials) => dispatch(loadResorces(apiId, credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiResourceDetail);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from "lodash";
import {loadApiList} from "../../store/actions/apiActions";
import { connect } from "react-redux";
import ApiListComponent from '../../components/account/ApiList';
import Button from '@material-ui/core/Button';
import './accoutApiContainer.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogFormComponent from '../../components/dialog/DialogFormComponent';

/**
 *
 */
class AccountApi extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            open:false
        };
    }

    /**
     *
     */
    componentDidMount() {
        this.fetchApiList();
    }

    /**
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        //this.fetchApiList();
    };

    /**
     *
     */
    fetchApiList = () => {
        this.props.accountActions.fetchApiList(this.props.accountId);
    };

    /**
     *
     */
    getAccount = (id) => {
        return find(this.props.accounts, {id: id});
    };

    /**
     *
     */
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    /**
     *
     */
    handleSaveForm = () => {
      this.setState({ open: false });
    };

    /**
     *
     */
    handleCancel = () => {
        this.setState({ open: false });
    };

    /**
     *
     * @returns {*}
     */
    render() {
        let apiList = this.props.apiList && Array.isArray(this.props.apiList[this.props.accountId]) ? this.props.apiList[this.props.accountId] : [];

        console.log('open state', this.state);

        return (
            <div className="account-api-container">
                <AppBar position="static" className="app-bar-account-api" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className="text-grow">
                            APIs
                        </Typography>
                        <Button color="inherit" onClick={this.handleClickOpen}>Add</Button>
                    </Toolbar>
                </AppBar>

                <ApiListComponent items={apiList} accountId={this.props.accountId} />

                <DialogFormComponent onSave={this.handleSaveForm} onClose={this.handleCancel} open={this.state.open} title="Add a new API">
                    form goes here
                </DialogFormComponent>

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
        accounts: state.account.accounts,
        apiList: state.api.apiList,
        loaded: state.account.loaded
    }
};

/**
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        accountActions: {
            fetchApiList: (accountId, credentials) => dispatch(loadApiList(accountId, credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (AccountApi);

AccountApi.propTypes = {
    accountId: PropTypes.any.isRequired,
    accounts: PropTypes.array.isRequired,
    apiList: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired
};

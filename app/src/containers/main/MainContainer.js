import React, {Component} from 'react';
import './MainContainer.scss';
import AccountItem from '../../components/account/AccountItem';
import { connect } from 'react-redux';
import { loadRestApiListRequest } from '../../store/actions/apiActions';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

/**
 * 
 */
class MainContainer extends Component
{
    /**
     * 
     */
    handleLoadApiList = (id) => {
        const account = this.getAccount(id);
        if (!account) {
            console.error('account not found');

            return ;
        }
        
        this.props.actions.fetchApiList(id, account.credentials);
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
    handleConnectAccount = () => {
        this.props.history.push('/authenticate');
    };

    /**
     * 
     */
    render() {
        const { classes } = this.props;

        const items = this.props.accounts.map((item, idx) => {
            let ApiList = this.props.apiList && Array.isArray(this.props.apiList[item.id]) ? this.props.apiList[item.id] : [];
            return <AccountItem 
                accountTitle={item.name} 
                accountId={item.id} 
                key={item.id} 
                apiList={ApiList}
                onLoadApiList={this.handleLoadApiList}
                loaded={item.loaded}
            />;
        });

        return (
            <div className="main-page">
                <Typography variant="h2">
                    Accounts
                </Typography>
                <Button variant="contained" color="default" className={classes.button} onClick={this.handleConnectAccount}>
                    Connect account
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>
                <Divider className="main-page-divider" />
                {items}
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
        actions: {
            fetchApiList: (accountId, credentials) => dispatch(loadRestApiListRequest(accountId, credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainContainer));

MainContainer.propTypes = {
    accounts: PropTypes.array.isRequired,
    apiList: PropTypes.object.isRequired,
    loaded: PropTypes.bool.isRequired
};
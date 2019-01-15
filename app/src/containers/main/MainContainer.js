import React, {Component} from 'react';
import './MainContainer.scss';
import AccountItem from '../../components/account/AccountItem';
import { connect } from 'react-redux';
import { loadRestApiListRequest } from '../../store/actions/apiActions';
import { loadAccountList } from '../../store/actions/accountActions';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    progress: {
        margin: theme.spacing.unit * 2,
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

    componentDidMount() {
        this.props.loadAccountList();
    };

    /**
     * 
     */
    render() {
        const { classes, loading } = this.props;

        const items = loading ?
            <div>
                <CircularProgress className={classes.progress} />
            </div>
            :
            this.props.accounts.map((item, idx) => {
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

            console.log(process);
            console.log(global);
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
        loading: state.account.loading
    }
};

export default connect(mapStateToProps, {
    loadRestApiListRequest,
    loadAccountList,
})(withStyles(styles)(MainContainer));

MainContainer.propTypes = {
    accounts: PropTypes.array.isRequired,
    apiList: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    loadRestApiListRequest: PropTypes.func.isRequired,
    loadAccountList: PropTypes.func.isRequired,
};
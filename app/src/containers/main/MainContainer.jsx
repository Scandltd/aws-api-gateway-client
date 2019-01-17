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
import { withStyles } from '@material-ui/core/styles';
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
        
        this.props.loadRestApiListRequest(id);
    };

    /**
     * 
     */
    getAccount = (id) => {
        return find(this.props.accounts, {_id: id});
    };

    /**
     * 
     */
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
                let ApiList = this.props.apiList && Array.isArray(this.props.apiList[item._id]) ? this.props.apiList[item._id] : [];

                return <AccountItem
                    accountTitle={item.name}
                    accountId={item._id}
                    key={item._id}
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

import React, {Component} from 'react';
import AccountList from './ApiList';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

/**
 * 
 */
class AccountItem extends Component
{
    /**
     * 
     */
    handleLoadApi = () => {
        if (!this.props.loaded) {
            this.props.onLoadApiList(this.props.accountId);
        }
    };

    handleAccountBtn = (e) => {

        e.preventDefault();
        e.stopPropagation();
        console.log('clicked');
    };

    /**
     * 
     */
    render() {
        return (
            <ExpansionPanel onChange={this.handleLoadApi}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <Button onClick={this.handleAccountBtn}>{this.props.accountTitle}</Button>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <AccountList items={this.props.apiList} accountId={this.props.accountId}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ) ;
    }
}

export default AccountItem;

AccountItem.propTypes = {
    accountId: PropTypes.any.isRequired,
    accountTitle: PropTypes.string.isRequired,
    apiList: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    onLoadApiList: PropTypes.func.isRequired
};

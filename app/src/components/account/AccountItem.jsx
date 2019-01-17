import React, {Component} from 'react';
import AccountList from './ApiList';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';

/**
 * 
 */
class AccountItem extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }


    /**
     * 
     */
    handleLoadApi = () => {
        if (!this.props.loaded) {
            this.props.onLoadApiList(this.props.accountId);
        }
    };

    /**
     *
     * @param e
     */
    handleAccountBtn = (e) => {
        e.stopPropagation();
        this.setState({redirect:true});
    };

    /**
     * 
     */
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/account/${this.props.accountId}/api`} />;
        }

        return (
            <ExpansionPanel onChange={this.handleLoadApi}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <Button onClick={this.handleAccountBtn} variant="outlined" color="primary" >{this.props.accountTitle} <SettingsIcon className="rightBtnIcon"/></Button>
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

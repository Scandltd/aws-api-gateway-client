import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import AlertDialogComponent from '../dialog/AlertDialogComponent';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/**
 * 
 */
class ApiItem extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isDeleteDialogOpened: false,
        };
    }

    /**
     *
     */
    handleMangeBtn = () => {
        this.setState({
            redirect: true
        });
    };

    /**
     *
     */
    handleDeleteBtn = () => {
        this.setState({isDeleteDialogOpened: true});
    };

    /**
     *
     */
    handleDeleteDialogCancel = () => {
        this.setState({isDeleteDialogOpened: false});
    };

    /**
     *
     */
    handleDeleteDialogAgree = () => {
        this.setState({isDeleteDialogOpened: false});
        if (this.props.onDelete) {
            this.props.onDelete(this.props.apiId);
        }
    };

    /**
     *
     * @returns {*}
     */
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/account/${this.props.accountId}/api/${this.props.apiId}/resource`} />;
        }

        const deleteBtn = this.props.onDelete ?
            <React.Fragment>
                <Button size="small" color="primary" onClick={this.handleDeleteBtn}>
                    Delete
                </Button>
                <AlertDialogComponent
                    title={`You are trying to delete REST API: ${this.props.name}`}
                    description="delete description goes here"
                    open={this.state.isDeleteDialogOpened}
                    handleCancel={this.handleDeleteDialogCancel}
                    handleAgree={this.handleDeleteDialogAgree}

                />
            </React.Fragment>
            : null;

        return (
            <Grid item sm={6} md={4} lg={4}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.name}
                        </Typography>
                        <Typography>
                            {this.props.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleMangeBtn}>
                            Resources
                        </Button>
                        { deleteBtn }
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default ApiItem;

ApiItem.propTypes = {
    accountId: PropTypes.any.isRequired,
    apiId: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    onDelete: PropTypes.func
};

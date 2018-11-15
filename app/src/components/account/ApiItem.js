import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
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
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    handleMangeBtn = () => {
        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/${this.props.accountId}/api/${this.props.apiId}`} />;
        }

        return (
            <Grid item sm={6} md={4} lg={3}>
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
                            Edit
                        </Button>
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
    description: PropTypes.string
};
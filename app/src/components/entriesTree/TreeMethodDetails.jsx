import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MethodDetailIntegration from './parts/MethodDetailIntegration';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MethodDetailResponse from './parts/MethodDetailResponse';

/**
 *
 */
class TreeMethodDetails extends Component {

    /**
     *
     */
    handleCreateIntegration = () => {
        this.props.onCreateHttpIntegration();
    };

    /**
     *
     */
    handleCreateResponse = () => {
        this.props.onCreateHttpResponse();
    };

    /**
     *
     * @returns {*}
     */
    renderMethodIntegration(){
        if (this.props.entity.methodIntegration) {
            return <MethodDetailIntegration entity={this.props.entity.methodIntegration} />
        }

        return (<Typography component="p">None</Typography>);
    };

    /**
     *
     * @returns {*}
     */
    renderMethodResponse(){
        if (this.props.entity.methodResponses) {
            return <MethodDetailResponse entity={this.props.entity.methodResponses} />
        }

        return (<Typography component="p">None</Typography>);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (<div className="tree-method-detail">
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h3">
                        Integration {!this.props.entity.methodIntegration && <IconButton color="primary" component="span" size="small" onClick={this.handleCreateIntegration}>
                                    <AddIcon fontSize="small"/>
                                </IconButton>}
                    </Typography>
                    <Divider />
                    { this.renderMethodIntegration() }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h3">
                        Response {!this.props.entity.methodResponses && <IconButton color="primary" component="span" size="small" onClick={this.handleCreateResponse}>
                            <AddIcon fontSize="small"/>
                        </IconButton>}
                    </Typography>
                    <Divider />
                    { this.renderMethodResponse () }
                </Grid>
            </Grid>
        </div>)
    }
}

export default TreeMethodDetails;

TreeMethodDetails.propTypes = {
    entity: PropTypes.object.isRequired,
    onCreateHttpIntegration: PropTypes.func,
    onCreateHttpResponse: PropTypes.func
};

import React, {Component} from 'react';
import ApiItem from './ApiItem';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

/**
 * 
 */
class ApiList extends Component
{
    render() {
        const {
            items,
            accountId,
            onDeleteApi,
            onUpdateApi,
            onDeploy
        } = this.props;

        return (
            <Grid container spacing={40}>
                { items.map((u, idx) => {
                    return <ApiItem
                        name={ u.name }
                        key={ u.id }
                        description={ u.description }
                        apiId={ u.id }
                        accountId={ accountId }
                        onDelete={ onDeleteApi }
                        onUpdate={ onUpdateApi }
                        onDeploy={ onDeploy }
                    />;
                }) }
            </Grid>
        );
    }
}

export default ApiList;

ApiList.propTypes = {
    accountId: PropTypes.any.isRequired,
    onDeleteApi: PropTypes.func,
    onUpdateApi: PropTypes.func,
    onDeploy: PropTypes.func,
};
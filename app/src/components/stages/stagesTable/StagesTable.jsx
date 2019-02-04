import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StageTableRow from './child/StageTableRow';
import AlertDialogComponent from '../../dialog/AlertDialogComponent';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

/**
 *
 */
class StagesTable extends Component {
    static defaultProps = {
        items: [],
    };

    state = {
        stageForDelete: null,
    };

    /**
     *
     */
    closeDeleteDialog = () => {
        this.setState({
            stageForDelete: null
        });
    };

    /**
     *
     * @param name
     * @param deployId
     */
    handleDelete = (name, deployId) => {
        this.setState({
            stageForDelete: {
                name: name,
                deployId: deployId,
            }
        })
    };

    /**
     *
     */
    handleDeleteDialogAgree = () => {
        const { name, deployId } = this.state.stageForDelete;
        this.closeDeleteDialog();
        this.props.onDelete(name, deployId);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { classes, items, onSettings } = this.props;
        const { stageForDelete } = this.state;

        const deleteDialog = stageForDelete ?
            <AlertDialogComponent
                title={`You are trying to delete stage: ${stageForDelete.name}`}
                description={ `Stage name: ${stageForDelete.name}. Deployment ID: ${stageForDelete.deployId}` }
                open={ true }
                handleCancel={ this.closeDeleteDialog }
                handleAgree={ this.handleDeleteDialogAgree }
            />
            : null;

        return (
            <div className={ classes.root }>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Deployment ID</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Last updated date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { items.map(row => (
                            <StageTableRow
                                key={ row.stageName }
                                name={ row.stageName }
                                deploymentId={ row.deploymentId }
                                description={ row.description }
                                lastUpdatedDate ={ row.lastUpdatedDate || row.createdDate }
                                onSettings={ onSettings }
                                onDelete={ this.handleDelete }
                            />
                        ))}
                    </TableBody>
                </Table>
                { deleteDialog }
            </div>
        );
    }
}

export default withStyles(styles)(StagesTable);

StagesTable.propTypes = {
    items: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired,
};

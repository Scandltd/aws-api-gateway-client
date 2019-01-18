import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AlertDialogComponent from '../../dialog/AlertDialogComponent';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class SettingsAccountTable extends Component {
    state = {
        accountIdForDelete: null,
        accountNameForDelete: '',
    };

    /**
     *
     */
    handleDeleteDialogCancel = () => {
        this.setState({
            accountIdForDelete: null,
            accountNameForDelete: '',
        });
    };

    /**
     *
     */
    handleDeleteDialogAgree = () => {
        this.props.onDelete(this.state.accountIdForDelete);
        this.setState({
            accountIdForDelete: null,
            accountNameForDelete: '',
        });
    };

    /**
     *
     * @param id
     * @param name
     */
    handleDeleteAction = (id, name) => {
        this.setState({
            accountIdForDelete: id,
            accountNameForDelete: name,
        });
    };

    render() {
        const { classes, onEdit, accounts } = this.props;
        const { accountIdForDelete, accountNameForDelete } = this.state;

        const deleteDialog = accountIdForDelete ?
            <AlertDialogComponent
                title={`You are trying to delete account: ${accountNameForDelete}`}
                description="delete description goes here"
                open={ true }
                handleCancel={ this.handleDeleteDialogCancel }
                handleAgree={ this.handleDeleteDialogAgree }
            />
            : null;

        return (
            <div className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Access key</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {accounts.map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.accessKey}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => { return onEdit(row._id); }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => { return this.handleDeleteAction(row._id, row.name); }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                { deleteDialog }
            </div>
        )
    }
}

export default withStyles(styles)(SettingsAccountTable);

SettingsAccountTable.propTypes = {
    accounts: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

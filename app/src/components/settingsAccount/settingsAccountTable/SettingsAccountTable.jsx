import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rootToolbar: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class SettingsAccountTable extends Component {
  render() {
      const { classes, onEdit, onDelete, accounts, onAdd } = this.props;

      return (
          <Paper className={classes.root}>
              <Toolbar>
                  <div className={classes.title}>
                      <Typography variant="h6" id="tableTitle">
                          Accounts
                      </Typography>
                  </div>
                  <div className={classes.spacer} />
                  <div className={classes.actions}>
                      <Tooltip title="Add">
                          <IconButton aria-label="Add" onClick={ onAdd }>
                              <AddIcon />
                          </IconButton>
                      </Tooltip>
                  </div>
              </Toolbar>
              <div className={classes.tableWrapper}>
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
                                        onClick={() => { return onDelete(row._id); }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </div>
          </Paper>
      )
  }
}

export default withStyles(styles)(SettingsAccountTable);

SettingsAccountTable.propTypes = {
    accounts: PropTypes.array.required,
    onEdit: PropTypes.func.required,
    onDelete: PropTypes.func.required,
    onAdd: PropTypes.func.required,
};

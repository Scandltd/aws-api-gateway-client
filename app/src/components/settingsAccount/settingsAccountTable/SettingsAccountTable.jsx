import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
  render() {
      const { classes, onEdit, onDelete, accounts} = this.props;

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
      )
  }
}

export default withStyles(styles)(SettingsAccountTable);

SettingsAccountTable.propTypes = {
    accounts: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

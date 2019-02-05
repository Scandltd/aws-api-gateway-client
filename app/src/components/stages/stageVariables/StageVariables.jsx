import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import StageVariablesTableRow from './child/stageVariablesTableRow/StageVariablesTableRow';
import { map } from 'lodash';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }
});

/**
 *
 */
class StageVariables extends Component {
    render() {
        const { classes, variables, isLoading } = this.props;

        if (isLoading) {
            return <CircularProgress />;
        }
console.log('varibales', variables);
        return (
            <div className={ classes.root }>
                <Table className={ classes.table }>
                    <TableHead>
                        <TableRow>
                            <TableCell>Variable</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {map(variables, (value, key) => {
                            return <StageVariablesTableRow
                                key={ key }
                                name={ key }
                                value={ value }
                            />;
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell align="left" colSpan={3} className={ classes.footerContent } >
                                <Button
                                    variant="outlined"
                                    size="medium"
                                    color="primary"
                                    className={ classes.margin }
                                >
                                    Load more
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(StageVariables);

StageVariables.propTypes = {
    variables: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
};

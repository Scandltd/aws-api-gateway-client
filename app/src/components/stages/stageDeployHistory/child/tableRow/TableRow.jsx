import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import moment from "moment/moment";
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
    activeAvatar: {
        width: theme.spacing.unit * 3,
        height: theme.spacing.unit * 3,
    },
    activeIcon: {
        width: theme.spacing.unit * 2,
        height: theme.spacing.unit * 2,
        color: theme.palette.primary.dark,
    },
});

/**
 *
 */
class tableRow extends Component {
    render() {
        const { deploymentDate, description, isActive, classes } = this.props;

        const date = moment(deploymentDate);

        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    { date.format('DD-MM-YYYY HH:mm:ss') }
                </TableCell>
                <TableCell>
                    {isActive &&
                        <Avatar className={ classes.activeAvatar }>
                            <CheckIcon className={ classes.activeIcon }/>
                        </Avatar>
                    }
                </TableCell>
                <TableCell>{ description }</TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(tableRow);

tableRow.propTypes = {
    deploymentDate: PropTypes.string.isRequired,
    description: PropTypes.string,
    isActive: PropTypes.bool,
};

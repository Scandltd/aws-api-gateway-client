import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import moment from 'moment';

/**
 *
 */
class StageTableRow extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {
                label: 'Delete',
                icon: <DeleteIcon fontSize="small" />,
                handler: this.handleDelete
            },
            {
                label: 'Settings',
                icon: <SettingsIcon fontSize="small" />,
                handler: this.handleSettings
            },
        ];
    }

    handleDelete = () => {
        const { name, deploymentId } = this.props;

        this.props.onDelete(name, deploymentId);
    };

    handleSettings = () => {
        const { name, deploymentId } = this.props;

        this.props.onSettings(name, deploymentId);
    };

    render() {
        const { name, deploymentId, description, lastUpdatedDate } = this.props;
        const date = moment(lastUpdatedDate);

        return (
            <TableRow>
                <TableCell component="th" scope="row" onClick={ this.handleSettings } >
                    { name }
                </TableCell>
                <TableCell align="right">{ deploymentId }</TableCell>
                <TableCell align="right">{ description }</TableCell>
                <TableCell align="right">{ date.format('DD-MM-YYYY HH:mm:ss') }</TableCell>
                <TableCell align="right">
                    {this.buttons.map((button) => {
                        return (
                            <IconButton
                                key={ button.label }
                                aria-label={ button.label }
                                onClick={ button.handler }
                            >
                                { button.icon }
                            </IconButton>
                        );
                    })}
                </TableCell>
            </TableRow>
        );
    }
}

export default StageTableRow;

StageTableRow.propTypes = {
    name: PropTypes.string.isRequired,
    deploymentId: PropTypes.string.isRequired,
    description: PropTypes.string,
    lastUpdatedDate: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired,
};

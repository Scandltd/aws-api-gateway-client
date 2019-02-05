import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import isEmpty from 'lodash';

/**
 *
 */
class StageVariablesTableRow extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.value,
            isEditMode: false
        };
    }

    /**
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { nameProps, valueProps } =  this.props;
        const { nameState, valueState } = this.props;

        const updateFields = {};
        if (prevProps.name !== nameProps && nameProps !== nameState) {
            updateFields.name = nameProps;
        }

        if (prevProps.value !== valueProps && valueProps !== valueState) {
            updateFields.value = valueProps;
        }

        if (!isEmpty(updateFields)) {
            this.setState(updateFields);
        }
    }

    /**
     *
     * @returns {*}
     */
    render() {
        const { isEditMode, name, value } = this.state;


        return (
            <TableRow>
                <TableCell component="th" scope="row" onClick={ this.handleSettings } >
                    { name }
                </TableCell>
                <TableCell align="right">
                    { value }
                </TableCell>
                <TableCell align="right">

                </TableCell>
            </TableRow>
        );
    }
}

export default StageVariablesTableRow;

StageVariablesTableRow.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
};

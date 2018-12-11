import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { forIn } from 'lodash';

/**
 *
 */
class MethodDetailResponse extends Component {

    /**
     *
     * @returns {Array}
     */
    renderResponses() {
        const rows = [];
        forIn(this.props.entity, function(value, key) {
            rows.push(
                <TableRow key={key}>
                    <TableCell>
                        Status code
                    </TableCell>
                    <TableCell>
                        {value.statusCode}
                    </TableCell>
                </TableRow>
            );
        });

        return rows;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <Table>
                <TableBody>
                    { this.renderResponses() }
                </TableBody>
            </Table>
        );
    }
}

export default MethodDetailResponse;

MethodDetailResponse.propTypes = {
    entity: PropTypes.object.isRequired,
};

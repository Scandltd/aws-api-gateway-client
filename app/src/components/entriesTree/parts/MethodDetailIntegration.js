import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

/**
 *
 */
class MethodDetailIntegration extends Component {
    render() {
        const entity = this.props.entity;

        return (
            <Table>
                <TableBody>
                    <TableRow >
                        <TableCell>
                            Type
                        </TableCell>
                        <TableCell>
                            {entity.type}
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>
                            Timeout (in millis)
                        </TableCell>
                        <TableCell>
                            {entity.timeoutInMillis}
                        </TableCell>
                    </TableRow>
                    {entity.httpMethod && <TableRow >
                        <TableCell>
                            HTTP method
                        </TableCell>
                        <TableCell>
                            {entity.httpMethod}
                        </TableCell>
                    </TableRow>}
                    {entity.uri && <TableRow >
                        <TableCell>
                            URI
                        </TableCell>
                        <TableCell>
                            {entity.uri}
                        </TableCell>
                    </TableRow>}
                    {entity.credentials && <TableRow >
                        <TableCell>
                            Credentials
                        </TableCell>
                        <TableCell>
                            {entity.credentials}
                        </TableCell>
                    </TableRow>}
                    {entity.passthroughBehavior && <TableRow >
                        <TableCell>
                            Passthrough Behavior
                        </TableCell>
                        <TableCell>
                            {entity.passthroughBehavior}
                        </TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        );
    }
}

export default MethodDetailIntegration;

MethodDetailIntegration.propTypes = {
    entity: PropTypes.object.isRequired,
};

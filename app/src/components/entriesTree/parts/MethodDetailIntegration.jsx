import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { withStyles } from '@material-ui/core/styles';

const regExLambdaName = /^arn:aws:apigateway:.*:lambda:path\/\d{4}-\d{2}-\d{2}\/functions\/arn:aws:lambda:.*:\d*:function:(.*)\/invocations$/;

const styles = theme => ({
    iconHelperSmall: {
        fontSize: 16,
        marginLeft: theme.spacing.unit,
    },
});

/**
 *
 */
class MethodDetailIntegration extends Component {

    /**
     *
     * @returns {*}
     */
    getLambdaName(){
        const { type, uri } = this.props.entity;
        if (type !== 'AWS_PROXY' && type !== 'AWS') {
            return null;
        }

        const match = uri.match(regExLambdaName);

        if (match && match[1]) {
            return `Lambda name: ${ match[1] }`;
        }

        return null;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { classes, entity } = this.props;

        const lambdaName = this.getLambdaName();

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
                            <Typography>{entity.uri}
                            { lambdaName ?
                                <Tooltip title={ lambdaName } placement="right-start">
                                    <HelpIcon fontSize="small" className={ classes.iconHelperSmall }/>
                                </Tooltip>
                                :
                                null
                            }
                            </Typography>
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
                    {entity.connectionType && <TableRow >
                        <TableCell>
                            Connection Type
                        </TableCell>
                        <TableCell>
                            {entity.connectionType}
                        </TableCell>
                    </TableRow>}
                    {entity.contentHandling && <TableRow >
                        <TableCell>
                            Content Handling
                        </TableCell>
                        <TableCell>
                            {entity.contentHandling}
                        </TableCell>
                    </TableRow>}
                    <TableRow >
                        <TableCell>
                            Timeout (in millis)
                        </TableCell>
                        <TableCell>
                            {entity.timeoutInMillis}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(MethodDetailIntegration);

MethodDetailIntegration.propTypes = {
    entity: PropTypes.object.isRequired,
};

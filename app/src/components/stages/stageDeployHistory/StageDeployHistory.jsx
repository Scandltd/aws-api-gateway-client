import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StageTableRow from './child/tableRow/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    footerContent: {
        textAlign: 'center',
    }
});

class StageDeployHistory extends Component {

    /**
     *
     */
    handleLoadMore = () => {
        this.props.onLoadMore(this.props.position);
    };

    render() {
        const { classes, items, activeDeployId, loading, position } = this.props;

        if (loading) {
            return <CircularProgress />;
        }

        return (
            <div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Deployment date</TableCell>
                            <TableCell>Current stage</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {
                            return <StageTableRow
                                key={ item.id }
                                deploymentDate={ item.createdDate }
                                description={ item.description }
                                isActive={ item.id === activeDeployId }
                            />
                        })}
                    </TableBody>
                    <TableFooter>
                        { position &&
                            <TableRow>
                                <TableCell align="center" colSpan={3} className={ classes.footerContent } >
                                    <Button
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        className={ classes.margin }
                                        onClick={ this.handleLoadMore }
                                    >
                                        Load more
                                    </Button>
                                </TableCell>
                            </TableRow>
                        }
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(StageDeployHistory);

StageDeployHistory.propTypes = {
    items: PropTypes.array.isRequired,
    activeDeployId: PropTypes.string,
    position: PropTypes.string,
    loading: PropTypes.bool,
    onLoadMore: PropTypes.func.isRequired,
};

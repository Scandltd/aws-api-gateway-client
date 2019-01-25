import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

/**
 *
 */
class SearchBar extends Component {
    state = {
        value: ''
    };

    /**
     *
     * @param event
     */
    handelChange = (event) => {
        this.setState({
            value: event.target.value,
        })

    };

    /**
     *
     */
    handleBlur = () => {
        this.props.onBlur(this.state.value);
    };

    render() {
        const {classes, disabled} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.search} onBlur={this.handleBlur}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    disabled={disabled}
                    onChange={this.handelChange}
                    value={value}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SearchBar);

SearchBar.propTypes = {
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
};

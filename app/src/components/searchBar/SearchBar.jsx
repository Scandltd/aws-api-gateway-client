import React, { Component } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import httpMethodsEnum from '../../enum/httpMethodTypeEnum';
import { map } from 'lodash';

const styles = theme => ({
    root: {
        width: 'auto',
        display: 'flex',
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.background.default, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.background.default, 0.25),
        },
        marginLeft: theme.spacing.unit * 2,
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        paddingTop: theme.spacing.unit,
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
         [theme.breakpoints.up('sm')]: {
            width: 200,
         },
    },
    selectRow: {
        margin: theme.spacing.unit,
        minWidth: 60,
    },
    selectWrapper: {
        borderRight: `1px solid ${theme.palette.grey[100]}`,
    },
    textInputWrapper: {
        borderRight: `1px solid ${theme.palette.grey[100]}`,
    },
    iconWrapper: {
        backgroundColor: fade(theme.palette.grey[300], 0.15),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: fade(theme.palette.grey[300], 0.25),
        },
    }
});

/**
 *
 */
class SearchBar extends Component {
    state = {
        qString: '',
        httpMethod: '',
    };

    /**
     *
     * @param event
     */
    handelChange = (event) => {
        const { target } = event;
        this.setState({
            [target.name]: target.value,
        });
    };

    /**
     *
     */
    handleClickSearch = () => {
        this.props.onSearch(this.state.httpMethod, this.state.qString);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { classes, disabled } = this.props;
        const { qString, httpMethod} = this.state;

        return (
            <div className={ classes.root } >
                <div className={ classes.selectWrapper }>
                    <Select
                        className={ classes.selectRow }
                        value={ httpMethod }
                        name="httpMethod"
                        onChange={ this.handelChange }
                        inputProps={{
                            name: 'httpMethod',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        { map(httpMethodsEnum, (value, key) => {
                            return <MenuItem value={key} key={key}>{value}</MenuItem>;
                        })}
                    </Select>
                </div>
                <div className={ classes.textInputWrapper }>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        disabled={ disabled }
                        onChange={ this.handelChange }
                        value={ qString }
                        name="qString"
                    />
                </div>
                <div className={ classes.iconWrapper } onClick={ this.handleClickSearch }>
                    <div className={ classes.searchIcon }>
                        <SearchIcon/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SearchBar);

SearchBar.propTypes = {
    disabled: PropTypes.bool,
    onSearch: PropTypes.func,
};

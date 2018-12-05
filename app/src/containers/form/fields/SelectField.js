import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { forIn } from 'lodash';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import RestApiEndpointType from "../../../enum/restApiEndpointType";

class SelectField extends Component {
    render() {
        const menuOptions = [];
        forIn(RestApiEndpointType, (value, key) => {
            menuOptions.push(<MenuItem value={value} key={key}>{value}</MenuItem>);
        });

        return (
            <FormControl fullWidth error={Boolean(this.props.error)} className="form-control">
                <InputLabel htmlFor={`${this.props.name}`}>{this.props.label}</InputLabel>
                <Select
                    value={this.props.value}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    error={Boolean(this.props.error)}
                >
                    <MenuItem value="" default className="select-empty">
                        <em>None</em>
                    </MenuItem>

                    {menuOptions}
                </Select>
                <FormHelperText>{Boolean(this.props.error) ? this.props.error : ''}</FormHelperText>
            </FormControl>
        );
    }
}

export default SelectField;

SelectField.propTypes = {
    options: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
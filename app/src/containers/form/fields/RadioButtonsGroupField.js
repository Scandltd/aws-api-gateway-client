import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { forIn } from "lodash";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

/**
 *
 */
class RadioButtonsGroupField extends Component {

    /**
     *
     * @returns {Array}
     */
    renderOptions = () => {
        const options = [];
        forIn(this.props.options, (value, key) => {
            options.push(<FormControlLabel
                value={key}
                control={<Radio color="primary" />}
                label={value}
                labelPlacement="start"
            />);
        });

        return options;
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const { classes } = this.props;
        return (
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">{this.props.label}</FormLabel>
                    <RadioGroup
                        aria-label={this.props.name}
                        name={this.props.name}
                        className={classes.group}
                        value={this.props.value}
                        onChange={this.handleChange}
                    >
                        {this.renderOptions()}
                    </RadioGroup>
                    <FormHelperText>{this.props.error ? this.props.error : this.props.helperText}</FormHelperText>
                </FormControl>
        );
    }
}

export default withStyles(styles)(RadioButtonsGroupField);

RadioButtonsGroupField.propTypes = {
    options: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    helperText: PropTypes.string
};

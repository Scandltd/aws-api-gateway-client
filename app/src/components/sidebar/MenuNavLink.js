import React, {Component} from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *
 */
class MenuNavLink extends Component {
    render() {
        return (
            <NavLink to={this.props.path} exact activeClassName="active-menu-item">
                <MenuItem>
                    {this.props.icon &&
                        <ListItemIcon>
                            {this.props.icon}
                        </ListItemIcon>
                    }

                    <ListItemText  inset primary={this.props.title} />
                </MenuItem>
            </NavLink>
        );
    }
}

export default MenuNavLink;

MenuNavLink.propTypes = {
    path: PropTypes.string.isRequired,
    icon: PropTypes.node,
    title: PropTypes.string.isRequired
};

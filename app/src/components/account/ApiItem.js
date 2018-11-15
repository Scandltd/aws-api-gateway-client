import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

/**
 * 
 */
class ApiItem extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    handleMangeBtn = () => {
        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/${this.props.accountId}/api/${this.props.apiId}`} />;
        }

        return (
            <div className="api-item">
                <div className="api-item-wrapper">
                    <div className="api-item-header">{this.props.name}</div>
                    <div className="api-item-info">{this.props.description}</div>
                    <button onClick={this.handleMangeBtn}>Manage</button>
                </div>
            </div>
        );
    }
}

export default ApiItem;

ApiItem.propTypes = {
    accountId: PropTypes.any.isRequired,
    apiId: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
};

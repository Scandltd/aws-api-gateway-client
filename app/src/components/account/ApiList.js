import React, {Component} from 'react';
import ApiItem from './ApiItem';
import PropTypes from 'prop-types';

/**
 * 
 */
class ApiList extends Component
{
    render() {
        const items = this.props.items.map((u, idx) => {
            return <ApiItem 
                name={u.name} 
                key={u.id} 
                description={u.description}
                apiId={u.id}
                accountId={this.props.accountId}
                
                />;
        });

        return (
            <div className="row">
                {items}
            </div>
        );
    }
}

export default ApiList;

ApiList.propTypes = {
    accountId: PropTypes.any.isRequired
};
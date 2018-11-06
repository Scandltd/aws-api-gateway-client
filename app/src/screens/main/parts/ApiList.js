import React, {Component} from 'react';
import ApiItem from './ApiItem';

/**
 * 
 */
class ApiList extends Component
{
    render() {
        const items = this.props.items.map((u, idx) => {
            return <ApiItem name={u.name} />;
        });

        return (
            <div className="row">
                {items}
            </div>
        );
    }
}

export default ApiList;
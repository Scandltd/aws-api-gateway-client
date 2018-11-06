import React, {Component} from 'react';

/**
 * 
 */
class ApiItem extends Component
{
    render() {
        return (
            <div className="api-item">
                <div className="api-item-wrapper">
                    <div className="name">{this.props.name}</div>
                    <button>Manage</button>
                </div>
            </div>
        );
    }
}

export default ApiItem;
import React, {Component} from 'react';

/**
 * 
 */
class ApiDetail extends Component
{
    render() {
        return (
            <div>
                API detail page. Account id: {this.props.match.params.accountId} | Api id: {this.props.match.params.apiId}
            </div>
        );
    }
}

export default ApiDetail;
import React, { Component } from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 *
 */
class TreeMethodElement extends Component
{
    render() {
        return (
            <div className={`tree-method tree-method-type-${this.props.type}`}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={`tree-method-header tree-method-header-type-${this.props.type}`}>
                        <div className="method-head-first">
                            <Typography >{this.props.type}</Typography>
                        </div>
                        <div className="method-head-second">
                            <Typography >{this.props.path}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails >
                        details goes here
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default  TreeMethodElement;

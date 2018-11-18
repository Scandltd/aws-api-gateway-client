import React, { Component } from 'react';
import TreeMethodHeader from './TreeMethodHeader';
import TreeMethodBody from './TreeMethodBody';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


/**
 *
 */
class TreeMethodElement extends Component
{
    render() {
        return (
            <div className="tree-method">
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
                    <div  />
                    <div >
                        <Chip label="Barbados"  onDelete={() => {}} />
                    </div>
                    <div>
                        <Typography variant="caption">
                        Select your destination of choice
                        <br />
                        <a href="#sub-labels-and-columns">
                            Learn more
                        </a>
                        </Typography>
                    </div>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
        );
    }
}

export default  TreeMethodElement;

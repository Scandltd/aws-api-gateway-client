import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContent from './child/tabContent/TabContent';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
});

class TabsWrapper extends Component {
    state = {
        active: 0
    };

    render() {
        const { children, labels, disabled, classes } = this.props;
        const { active } = this.state;

        return (
            <div className={ classes.root }>
                <Tabs
                    value={ active }
                    onChange={ this.handleChangeType }
                    indicatorColor="primary"
                    textColor="primary"
                    className={ classes.tabsRoot }
                >
                    {labels.map(item => {
                        return <Tab
                            label={ item }
                            disabled={ disabled }
                            key={ item }
                        />;
                    })}
                </Tabs>

                <TabContent>{ children }</TabContent>
            </div>
        );
    }

    /**
     *
     * @param event
     * @param value
     */
    handleChangeType = (event, value) => {
        this.setState({active: value}, () => {
            this.props.onChangeTab(value);
        })
    }
}

export default withStyles(styles)(TabsWrapper);

TabsWrapper.propTypes = {
    labels: PropTypes.array.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

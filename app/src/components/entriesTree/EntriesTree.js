import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListToTree from 'list-to-tree';

/**
 *
 */
class EntriesTree extends Component
{
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            entriesTree: []
        };
    }

    buildTree = () => {
        console.log();
        const ltt = new ListToTree(this.props.entries, {
            key_id: 'id',
            key_parent: 'parentId'
        });

       this.setState({entriesTree: ltt.GetTree()});
    };

    componentDidMount() {
        this.buildTree();
    }

    render() {
        console.log(this.state);



        return (
            <div >
                entries tree
            </div>
        );
    };

}

export default EntriesTree;

EntriesTree.propsTypes = {
    entries: PropTypes.array.isRequired
};
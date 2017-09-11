import React from 'react';

/**
 * Class representing the snapshotTableCell component of the snapshot area of a card.
 *
 * This area has a select height so that it will line up with cells in neighboring columns.
 */
export default class SnapshotTableCell extends React.Component {
    /**
     * Renders the SnapshotTableCell component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="b2bCent-snapshotTableCell">
                {this.props.children}
            </div>
        );
    }
}

/**
 * SnapshotTableCell proptypes provide type validation on props.
 */
SnapshotTableCell.propTypes = {
    children: React.PropTypes.node,
};

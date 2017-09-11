import React from 'react';

/**
 * Class representing the snapshotLabel component of the snapshot area of a card.
 *
 * This area should contain a label for the snapshot area data.
 */
export default class SnapshotLabel extends React.Component {
    /**
     * Renders the SnapshotLabel component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className={`b2bCent-snapshotLabel${(this.props.cssClass ? ` ${this.props.cssClass}` : '')}`}>
                {this.props.children}
            </div>
        );
    }
}

/**
 * SnapshotLabel proptypes provide type validation on props.
 */
SnapshotLabel.propTypes = {
    children: React.PropTypes.node,
    cssClass: React.PropTypes.string,
};

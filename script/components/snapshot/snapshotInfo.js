import React from 'react';

/**
 * Class representing the snapshotInfo component of the snapshot area of a card.
 *
 * This area is for supplementary information corresponding to data in the
 * snapshot area of the card.
 */
export default class SnapshotInfo extends React.Component {
    /**
     * Renders the SnapshotInfo component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className={`b2bCent-snapshotInfo${(this.props.cssClass ? `-${this.props.cssClass}` : '')}`}>
                {this.props.children}
            </div>
        );
    }
}

/**
 * SnapshotInfo proptypes provide type validation on props.
 */
SnapshotInfo.propTypes = {
    children: React.PropTypes.node,
    cssClass: React.PropTypes.string,
};

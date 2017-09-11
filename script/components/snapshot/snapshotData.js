import React from 'react';

/**
 * Class representing the snapshotData component of the snapshot area of a card.
 *
 * This area is for data shown in the snapshot area of a card.
 * It will have styles to emphasize the text.
 */
export default class SnapshotData extends React.Component {
    /**
     * Renders the SnapshotData component.
     *
     * @returns {XML}
     */
    render() {
        const unavailableData = '-';
        return (
            <div className={`b2bCent-snapshotData${(this.props.cssClass ? `-${this.props.cssClass}` : '')}`}>
                {this.props.children === null || this.props.children === undefined ?
                    unavailableData : this.props.children}
            </div>
        );
    }
}

/**
 * SnapshotData proptypes provide type validation on props.
 */
SnapshotData.propTypes = {
    children: React.PropTypes.node,
    cssClass: React.PropTypes.string,
};

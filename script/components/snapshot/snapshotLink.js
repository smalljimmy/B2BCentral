import React from 'react';

/**
 * Class representing the snapshotLink component of the snapshot area of a card.
 *
 * This area is for supplementary information corresponding to data in the
 * snapshot area of the card.
 */
export default class snapshotLink extends React.Component {
    /**
     * Renders the snapshotLink component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className={`b2bCent-snapshotLink${(this.props.cssClass ? ` ${this.props.cssClass}` : '')}`}>
                {this.props.children}
            </div>
        );
    }
}

/**
 * snapshotLink proptypes provide type validation on props.
 */
snapshotLink.propTypes = {
    children: React.PropTypes.node,
    cssClass: React.PropTypes.string,
};

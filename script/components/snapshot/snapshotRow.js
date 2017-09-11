import React from 'react';
import {GridRow} from 'amazonui-react-elements/elements';

/**
 * Class representing a row in the snapshot view section of a card.
 *
 * Contains information about the specific card, displaying data passed from parent.
 */
export default class SnapshotRow extends React.Component {
    /**
     * Renders the SnapshotRow component.
     *
     * @returns {XML}
     */
    render() {
        let cssClass = '';
        if (this.props.position) {
            cssClass += ` snapshotRow-${this.props.position}`;
        }
        if (this.props.border) {
            cssClass += ` snapshotRow-border-${this.props.border}`;
        }
        if (this.props.cssClass) {
            cssClass += ` ${this.props.cssClass}`;
        }

        return (
            <GridRow cssClass={cssClass}>
                {this.props.children}
            </GridRow>
        );
    }
}

/**
 * SnapshotRow proptypes provide type validation on props.
 */
SnapshotRow.propTypes = {
    border: React.PropTypes.string,
    children: React.PropTypes.node,
    cssClass: React.PropTypes.string,
    position: React.PropTypes.string,
};

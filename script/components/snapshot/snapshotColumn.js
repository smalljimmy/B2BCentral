import React from 'react';
import {GridColumn} from 'amazonui-react-elements/elements';

/**
 * Class representing a column in the snapshot view section of a card.
 *
 * Contains information about the specific card, displaying data passed from parent.
 */
export default class SnapshotColumn extends React.Component {
    /**
     * Renders the SnapshotColumn component.
     *
     * @returns {XML}
     */
    render() {
        let cssClass = 'b2bCent-snapshotColumn';
        if (this.props.position) {
            cssClass += ` snapshotColumn-${this.props.position}`;
        }
        if (this.props.border) {
            cssClass += ` snapshotColumn-border-${this.props.border}`;
        }
        if (this.props.cssClass) {
            cssClass += ` ${this.props.cssClass}`;
        }

        return (
                <GridColumn 
                    cssClass={cssClass} 
                    widescreenGridUnits={this.props.widescreenGridUnits} 
                    gridUnits={this.props.gridUnits} 
                    position={this.props.position}
                >
                    {this.props.children}
                </GridColumn>
        );
    }
}

/**
 * SnapshotColumn proptypes provide type validation on props.
 *
 *  gridUnits: the number of columns that this component spans out of 12
 *  position: "first" or "last" to apply special CSS to the first or last column in the row
 *  border: "none" or "heavy" to have no border or a heavy border (defaults to a light border)
 */
SnapshotColumn.propTypes = {
    children: React.PropTypes.node,
    cssClass: React.PropTypes.string,
    gridUnits: React.PropTypes.number.isRequired,
    position: React.PropTypes.string,
    border: React.PropTypes.string,
};

import React from 'react';
import {GridRow, GridColumn} from 'amazonui-react-elements/elements';
import ContentPanel from './contentPanel';

/**
 * A component which contains the Subject Area Card panels.
 */
export default class DataSection extends React.Component {
    /**
     * Renders the DataSection component.
     * @returns {XML}
     */
    render() {
        return (
            <GridRow id="b2bCent-dataSection">
                <GridColumn gridUnits={8} ref="contentPanelContainer" widescreenGridUnits={8}>
                    <ContentPanel cards={this.props.leftCards} {...this.props.contentPanel} />
                </GridColumn>
                <GridColumn gridUnits={8} ref="contentPanelContainer" position="last" widescreenGridUnits={4}>
                    <ContentPanel cards={this.props.rightCards} {...this.props.contentPanel} />
                </GridColumn>
            </GridRow>
        );
    }
}
/**
 * DataSection proptypes provide type validation on props.
 * @type {
 *     leftContentPanel: props for the leftContentPanel,
 *     rightContentPanel: props for the rightContentPanel,
 * }}
 */
DataSection.propTypes = {
    contentPanel: React.PropTypes.object,
    leftCards: React.PropTypes.array,
    rightCards: React.PropTypes.array,
};

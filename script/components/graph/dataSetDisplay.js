import React from 'react';
import Section from 'amazonui-react-elements/elements/section';
import GridColumn from 'amazonui-react-elements/elements/grid-column';
import GridRow from 'amazonui-react-elements/elements/grid-row';
import Checkbox from 'amazonui-react-elements/elements/checkbox';
import Immutable from 'immutable';

/**
 * Class representing the part of a graph containing information about the different things plotted.
 *
 *  Contains information about the plotLines and checkboxes to toggle them visible/hidden.
 */
export default class dataSetDisplay extends React.Component {
    /**
     * Renders the dataSetDisplay component.
     *
     * @returns {XML}
     */
    render() {
        // Create a section for each optional plotLine
        let currentNum = 0;
        const gridUnits = 2;

        const checkboxes = this.props.plotLines
        	.filter((plotLine) => {
        		return plotLine.get('isShown');
        	})        		
        	.map((plotLine) => {
        		const onChangeCallback = () => {
                this.props.onChange(plotLine);
            };
            const checkbox = (
                <GridColumn
                    key={plotLine.get('id')}
                    gridUnits={gridUnits}
                    widescreenGridUnits={gridUnits}
                    data-id={plotLine.get('id')}
                >
                    <Checkbox
                        cssClass={`sales-legend graph-color-${(1 + currentNum)}`}
                        name="check"
                        inputId={plotLine.get('id')}
                        value={plotLine.get('id')}
                        onClick={onChangeCallback}
                        checked={plotLine.get('isActive')}
                    >
                        {plotLine.get('title')}
                    </Checkbox>
                </GridColumn>
            );

            ++currentNum;

            return checkbox;
        });

        return (
            <Section>
                <GridRow>
                    {checkboxes}
                </GridRow>
            </Section>
        );
    }
}

/**
 * dataSetDisplay proptypes provide type validation on props.
 * @type {{
 *     onChange: callback when checkbox changes and gives the affected plotLine,
 *     onMouseEnter: callback when mouse enters checkbox and gives the affected plotLine,
 *     onMouseLeave: callback when mouse leaves checkbox and gives the affected plotLine,
 *     plotLines: Immutable.List of plotLines to show checkboxes for: {
 *         id: React.PropTypes.string,
 *         title: React.PropTypes.string,
 *         isActive: React.PropTypes.bool,
 *     }
 * }}
 */
dataSetDisplay.propTypes = {
    onChange: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    plotLines: React.PropTypes.instanceOf(Immutable.List),
};

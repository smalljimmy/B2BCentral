import React from 'react';
import ButtonGroup from 'amazonui-react-elements/elements/button-group';
import Button from 'amazonui-react-elements/elements/button';

/**
 * Class representing the portion of a card graph component that will switch between numerous graphs.
 *
 */
export default class graphSelectorButtonGroup extends React.Component {
    /**
     * Provides a list of all the buttons that will be added to the graph
     */
    _getButtons() {
        if (this.props.graphNames.length <= 1) {
            return null;
        }

        return this.props.graphNames.map((graphName) => {
            const status = this.props.selectedGraphName === graphName ? 'selected' : 'normal';
            const onClickHandler = () => {
                this.props.onClick(graphName);
            };

            return (
                <Button
                    key={graphName}
                    onClick={onClickHandler}
                    value={graphName}
                    status={status}
                    cssClass={`button-${status}`}
                >
                    {graphName}
                </Button>);
        });
    }

    /**
     * Renders the cardSelectorButtonGroup component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <ButtonGroup>
                {this._getButtons()}
            </ButtonGroup>
        );
    }
}

/**
 * cardSelectorButtonGroup proptypes provide type validation on props.
 * @type {{
 *     graphNames: names of all graphs
 *     selectedGraphName: selected graph
 *     onClick: callback, expecting the selectedGraphName
 * }}
 */
graphSelectorButtonGroup.propTypes = {
    graphNames: React.PropTypes.array,
    selectedGraphName: React.PropTypes.string,
    onClick: React.PropTypes.func,
};

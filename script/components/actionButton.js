import React from 'react';
import {Button, DropdownOption, SplitDropdown} from 'amazonui-react-elements/elements';
import Immutable from 'immutable';

/**
 * Class representing the buttons that will display in the action panel.
 *
 */
export default class menuButton extends React.Component {

    /**
     * Returns the main button component
     */
    _getMainButton() {
        return (
            <Button
                key={this.props.mainAction.get('title')}
                onClick={this.props.mainAction.get('onClick')}
                value={this.props.mainAction.get('title')}
                cssClass="menuButton"
            >
                {this.props.mainAction.get('title')}
            </Button>);
    }

    /**
     * Returns the dropdown options for the dropdown button
     */
    _getDropdownOptions() {
        const dropdownOptions = this.props.dropdownActions.map((option) => {
            const title = option.get('title');

            return (
               <DropdownOption value={title}>
                   {title}
               </DropdownOption>
           );
        });

        return dropdownOptions;
    }

    /**
     * Returns the dropdown button with corresponding options
     */
    _getDropdownButton() {
        return (
            <SplitDropdown cssClass="menuButton" labelText={this.props.mainAction.get('title')}>
                {this._getDropdownOptions()}
            </SplitDropdown>
        );
    }

    /**
     * Renders the menuButton component.
     *
     * @returns {XML}
     */
    render() {
        let button;

        if (this.props.dropdownActions) {
            button = this._getDropdownButton();
        }
        else {
            button = this._getMainButton();
        }

        return (
            <div className="menuButtonGroup">
                {button}
            </div>
        );
    }
}

/**
 * menuButton proptypes provide type validation on props.
 * @type {{
 *      mainAction: {
 *          title: title of the action in the dropdown,
 *          onClick: function to call when action is clicked,
 *      },
 *      dropdownActions: Immutable.List of dropdown actions
 *      {
 *          title: title of the action in the dropdown,
 *          onClick: function to call when action is clicked,
 *      },
 * }}
 */
menuButton.propTypes = {
    mainAction: React.PropTypes.instanceOf(Immutable.Map),
    dropdownActions: React.PropTypes.instanceOf(Immutable.List),
};

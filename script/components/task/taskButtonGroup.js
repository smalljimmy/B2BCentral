import React from 'react';
import ButtonGroup from 'amazonui-react-elements/elements/button-group';
import Button from 'amazonui-react-elements/elements/button';
import {TaskConstants} from './taskConstants';

/**
 * Class representing the button group for task items in the
 * action center
 */
export default class taskButtonGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    
    /**
     * Produces the correct onClick handler for the given action 
     * @private
     * @param action
     * @return function
     */
    _getOnClickHandler(action) {
        if(action === TaskConstants.ACTION_ACTION) {
            return () => {
                this.props.actionOnClick();
            }
        }
        return () => {
            alert(action);
        }
    }
    
    /**
     * Creates a button for every given action
     * @private
     * @return {XML}
     */
    _getButtons() {
        return this.props.actions.map((action) => {
            const onClickHandler = this._getOnClickHandler(action);

            if (action === TaskConstants.REDIRECT_ACTION) {
                return (
                        <Button key={action} value={action} onClick={onClickHandler}>
                            {action}
                        </Button>);
            }
        });
    }

    /**
     * Renders the TaskButtonGroup object
     * @return {XML}
     */
    render() {
        return (
            <ButtonGroup>
                {this._getButtons()}
            </ButtonGroup>
        );
    }
}

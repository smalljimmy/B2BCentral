import React from 'react';
import ReactToolTip from 'react-tooltip';
import {findDOMNode} from 'react-dom';
import {KeyConstants} from '../constants/keyConstants';
import {Link, Form} from 'amazonui-react-elements/elements';

/**
 * Class which displays inline edit functionality.
 */
export default class InlineEdit extends React.Component {
    /**
     * Constructs an instance of the InlineEdit component.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            currentValue: props.currentValue,
            editedValue: '',
            errorMessage: false,
        };

        this._setIsEditing = this._setIsEditing.bind(this);
        this._handleEditClick = this._handleEditClick.bind(this);
        this._handleFormCancel = this._handleFormCancel.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._handleFormKeyDown = this._handleFormKeyDown.bind(this);
        this._handleValueChange = this._handleValueChange.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentValue) {
            this.setState({
                currentValue: newProps.currentValue,
                editedValue: newProps.currentValue,
            });
        }
    }

    /**
     * Sets the current state of this component's isEditing flag.
     * @param isEditing Whether the component is currently editing the value
     * @private
     */
    _setIsEditing(isEditing) {
        const wasEditing = this.state.isEditing;
        this.setState({isEditing});
        this._invokeEditAction(wasEditing, isEditing);
    }

    /**
     * Fires the proper exit/enter edit action, based on given before and after states.
     * @param wasEditing Whether editing was taking place before the change
     * @param isEditing Whether editing is taking place after the change
     * @private
     */
    _invokeEditAction(wasEditing, isEditing) {
        if (wasEditing && !isEditing && this.props.exitEditAction) {
            this.props.exitEditAction();
        }
        else if (!wasEditing && isEditing && this.props.enterEditAction) {
            this.props.enterEditAction();
        }
    }

    /**
     * Handler for clicking the edit button.
     * @private
     */
    _handleEditClick() {
        this._setIsEditing(true);
    }

    /**
     * Handler for clicking the cancel button.
     * @private
     */
    _handleFormCancel() {
        this._setIsEditing(false);
        this.setState({currentValue: this.state.editedValue});
    }

    /**
     * Handler for clicking the save button.
     * @private
     */
    _handleFormSubmit() {
        const oldValue = this.props.currentValue;
        const newValue = this.state.currentValue;
        if (oldValue !== newValue && this.props.valueChangedAction) {
            this.props.valueChangedAction(newValue);
        }
        this.setState({editedValue: this.state.currentValue});
        this._setIsEditing(false);
    }

    /**
     * Handle key presses in the form.
     * @param e the event fired for each key press
     * @private
     */
    _handleFormKeyDown(e) {
        if (e.keyCode === KeyConstants.ESC) {
            this._handleFormCancel();
        }
    }

    /**
     * Handler for the input text being changed on the form.
     * @param e The event fired from the input.
     * @private
     */
    _handleValueChange(e) {
        this.setState({currentValue: e.target.value});

        if (this.props.validateAction) {
            this.state.errorMessage = this.props.validateAction(e.target.value);
            if (this.state.errorMessage) {
                ReactToolTip.show(findDOMNode(this.refs.textInput));
            }
            else {
                ReactToolTip.hide(findDOMNode(this.refs.textInput));
            }
        }
    }

    /**
     * Handles the form gaining focus.
     * @param e The event args.
     * @private
     */
    _handleFormFocus(e) {
        e.target.select();
    }

    /**
     * Renders the InlineEdit component.
     * @returns {XML}
     */
    render() {
        const readOnlyContent = this.state.currentValue ?
            (<div>
                <span>{this.state.currentValue}</span>
                <div>
                    <Link cssClass="inline-link" onClick={this._handleEditClick}>
                        {this.props.editButtonText || 'Update'}
                    </Link>
                </div>
            </div>) : null;
        const inlineEdit = this.state.isEditing ?
            (
                <div>
                    <Form onSubmit={this._handleFormSubmit} onKeyDown={this._handleFormKeyDown}>
                        <input
                            data-tip
                            type="text"
                            value={this.state.currentValue}
                            onChange={this._handleValueChange}
                            autoFocus
                            onFocus={this._handleFormFocus}
                            className={this.state.errorMessage ? 'a-form-error' : 'a-form-normal'}
                            data-for={this.props.elementId}
                            ref="textInput"
                            data-event="change"
                        />
                        <ReactToolTip
                            id={this.props.elementId}
                            place="top"
                            effect="solid"
                            getContent={[() => { return this.state.errorMessage; }, 50]}
                        />
                        <div>
                            <span>
                                <Link onClick={this._handleFormCancel} cssClass="inline-link cancel">
                                    {this.props.cancelButtonText || 'Cancel'}
                                </Link>
                            </span>
                            <span>
                                <Link onClick={this._handleFormSubmit}
                                    cssClass={`inline-link${(this.state.errorMessage ? ' disabled' : '')}`}
                                >
                                    {this.props.saveButtonText || 'Save'}
                                </Link>
                            </span>
                        </div>
                    </Form>
                </div>
            ) : readOnlyContent;
        return inlineEdit;
    }
}

/**
 * InlineEdit propTypes provide type validation on props
 * @type {{
 *  editButtonText : The text content for Update button.
 *  saveButtonText: The text content for Save button.
 *  cancelButtonText: The text content for Cancel button.
 *  elementId: The exclusive element ID to be tagged to the inline edit component.
 *  currentValue: The value of the element.
 *  enterEditAction: The action that will be invoked when edit is triggered.
 *  exitEditAction: The action that will be invoked when edit is ended.
 *  valueChangedAction:  The action that will be invoked when valid value is saved.
 *  validateAction: The action that validates the input and shows error tooltip for invalid data.
 * }}
 */
InlineEdit.propTypes = {
    editButtonText: React.PropTypes.string,
    saveButtonText: React.PropTypes.string,
    cancelButtonText: React.PropTypes.string,
    elementId: React.PropTypes.string.isRequired,
    currentValue: React.PropTypes.string.isRequired,
    enterEditAction: React.PropTypes.func,
    exitEditAction: React.PropTypes.func,
    valueChangedAction: React.PropTypes.func,
    validateAction: React.PropTypes.func,
};

import React from 'react';
import GridColumn from 'amazonui-react-elements/elements/grid-column';
import GridRow from 'amazonui-react-elements/elements/grid-row';
import TaskButtonGroup from './taskButtonGroup';
import Box from 'amazonui-react-elements/elements/box';
import Divider from 'amazonui-react-elements/elements/divider';
import {TaskConstants} from './taskConstants';
import TaskIcon from './taskIcon';

export default class TaskItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iconClass: '',
            taskAttributes: this._buildTaskAttributes(this.props.task.taskType),
        }
    }

    _buildTaskAttributes(taskType) {
        let attributes = null;
        switch (taskType) {
            case TaskConstants.GENERAL_REDIRECT:
                attributes = {
                    badgeString: "WELCOME SERIES",
                    iconClass: "email_fill",
                }
                break;
            case TaskConstants.PROFILE_REDIRECT:
                attributes = {
                    badgeString: "BUSINESS PROFILE",
                    iconClass: "person",
                }
                break;
            case TaskConstants.ACCOUNT_REDIRECT:
                attributes = {
                    badgeString: "CREDENTIALS",
                    iconClass: "book",
                }
                break;
            default:
                attributes = {
                    badgeString: "GENERIC",
                    iconClass: null,
                }
        }

        return attributes;
    }

    /**
     * Create a unique element id for task
     * @private
     * @param taskId
     * @return taskInputGroupElem
     */
    _getTaskInputGroupId(taskId) {
        const taskInputGroupElem = `task-input-group-${taskId}`;
        return taskInputGroupElem;
    }

    _getTaskElem(taskId) {
        const taskBoxElem = `task-box-${taskId}`;
        return taskBoxElem;
    }

    /**
     * Toggle the visibility of the a task form
     * @private
     */
    _actionCallback() {
        console.log("You clicked an action button " + this.props.task.type);
    }

    _dismissCallback() {
        console.log("You dismissed the following task: " + this.props.task.id);
    }

    /**
     * Build onclick handler for actions that require input
     * @private
     * @return {function}
     */
    _buildActionOnClickHandler() {
        return () => {
            const elem = `#${this._getTaskInputGroupId(this.props.task.id)}`;
            this.props.actionOnClick(elem, this._actionCallback());
        }
    }

    _buildDismissOnClickHandler() {
        return () => {
            const elem = `#${this._getTaskElem(this.props.task.id)}`;
            this.props.dismissOnClick(elem, this._dismissCallback());
        }
    }

    _buildTaskBadge() {
        return (
                <text className="task-badge a-padding-mini a-size-small">{this.state.taskAttributes.badgeString}</text>
        );
    }

    /**
     * Renders the TaskItem component
     * @return {XML}
     */
    render() {
        return (
            <Box cssClass="action-center-task" id={this._getTaskElem(this.props.task.id)}>
                <GridRow>
                    <GridColumn gridUnits={11}>
                        {this._buildTaskBadge()}
                    </GridColumn>
                    <GridColumn gridUnits={1}>
                        <i className="icon close action-close"
                            ref="close"
                            onClick={this._buildDismissOnClickHandler()}>
                        </i>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <p className="a-color-base a-size-base a-spacing-micro a-spacing-top-micro">
                        {this.props.task.taskProperties.messageStringId}
                    </p>
                </GridRow>
                <GridRow>
                    <GridColumn gridUnits={2}>
                        <TaskIcon
                            imgURL={"http://i0.kym-cdn.com/entries/icons/facebook/000/021/557/conceit.jpg"}
                            iconClass={this.state.taskAttributes.iconClass} />
                    </GridColumn>
                    <GridColumn gridUnits={10}>
                        <p className="action-data-text a-size-medium a-color-base a-spacing-micro">
                            Data driven section
                        </p>
                        <p className="a-spacing-micro">Oouuuuu, we testing in this mud</p>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <Divider />
                </GridRow>
                <GridRow>
                    <GridColumn gridUnits={3} position="last">
                        <TaskButtonGroup
                            actions={this.props.task.availableActions}
                            actionOnClick={this._buildActionOnClickHandler()}
                        />
                    </GridColumn>
                </GridRow>
            </Box>
        );
    }
}

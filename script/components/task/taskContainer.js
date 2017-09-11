import React from 'react';
import Container from 'amazonui-react-elements/elements/container';
import Scroller from 'amazonui-react-elements/elements/scroller';
import TaskItem from './taskItem';
import GridColumn from 'amazonui-react-elements/elements/grid-column';
import GridRow from 'amazonui-react-elements/elements/grid-row';
import TaskDropDown from './taskDropdown';

/**
 * Class representing the scrollable list of tasks in the
 * action center card
 */
export default class TaskContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: this.props.data.tasks.tasks || [],
            count: Object.keys(this.props.tasks).length,
            sortByOptions: [
                {
                    sortBy: "Time Recieved",
                },
                {
                    sortBy: "Time left",
                },
            ],
        }
    }

    /**
     * Creates taskItems
     * @private
     * @param tasks array of task objects
     * @return {XML}
     */
    _createTasksItems() {
        return this.state.tasks.map((task) => {
            return (
                <TaskItem key={task.id} value={task.url}
                    task={task}
                    actionOnClick={this.props.actionOnClick}
                    dismissOnClick={this.props.dismissAnimation}
                />
            );
        });
    }

    /**
     * Renders TaskContainer component
     * @returns {XML}
     */
    render() {
        return (
            <Container id="action-no-padding">
                <div className="action-filter">
                    <GridRow cssClass="action-center-spacing" >
                        <GridColumn gridUnits={5}>
                            <GridRow cssClass="a-spacing-top-base a-spacing-top-base">
                                <text className="action-count-text">{this.state.count} tasks</text>
                            </GridRow>
                            <GridRow cssClass="a-spacing-base a-spacing-top-micro">
                                <TaskDropDown
                                    options={this.state.sortByOptions}
                                    taskDropdownCallback={this.props.sortByOnChange}
                                    isTaskFilter={false}
                                    label="Sort By"
                                    name="sortByFilter"
                                />
                            </GridRow>
                        </GridColumn>
                        <GridColumn cssClass="a-spacing-top-base a-spacing-top-base" gridUnits={7} position="last" >
                            <TaskDropDown
                                options={this.state.tasks}
                                taskDropdownCallback={this.props.filterOnChange}
                                isTaskFilter={true}
                                label="Showing"
                                name="taskFilter"
                            />
                        </GridColumn>
                    </GridRow>
                </div>
                <Scroller cssClass="task-scroller-wrapper" id="action-no-padding">
                    {this._createTasksItems()}
                </Scroller>
            </Container>
        );
    }
}

TaskContainer.propTypes = {
    data: React.PropTypes.object,
};

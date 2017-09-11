import React from 'react';
import GridColumn from 'amazonui-react-elements/elements/grid-column';
import GridRow from 'amazonui-react-elements/elements/grid-row';


export default class TaskDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "All Tasks",
        }

        this._taskTypes = [];
        this._getDropdownOptions = this._getDropdownOptions.bind(this);
        this._dropdownChangeEvent = this._dropdownChangeEvent.bind(this);
    }

    _getDropdownOptions() {
        if (this.props.isTaskFilter) {
            return this.props.options.map((option) => {
                return (
                        <option key={option.type} value={option.type}>
                           {option.type}
                        </option>
                    );
            });
        }

        return this.props.options.map((option) => {
            return (
                    <option key={option.sortBy} value={option.sortBy}>
                       {option.sortBy}
                    </option>
                );
        });
    }

    _dropdownChangeEvent(e) {
        this.setState({selected: e.target.value});
        this.props.taskDropdownCallback(e.target.value);
    }

    render() {
        return (
            <GridRow>
                <GridColumn gridUnits={4}>
                    <text>{this.props.label}: </text>
                </GridColumn>
                <GridColumn gridUnits={8}>
                    <select name={this.props.name} value={this.state.selected} onChange={this._dropdownChangeEvent}>
                        {this._getDropdownOptions()}
                    </select>
                </GridColumn>
            </GridRow>
        );
    }
}

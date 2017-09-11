import React from 'react';

export default class TaskIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    _buildTaskIcon() {
        if (this.props.iconClass === null) {
            return (
                <img src = {this.props.imgURL} className="action-img" height = "48" width = "48" />
            );
        }

        const icon = `icon ${this.props.iconClass} action-center-icon`;

        return (
            <i className = {icon} ></i>
        );
    }

    render() {
        const icon = this._buildTaskIcon();

        return (
            <div>
                {icon}
            </div>
        );
    }
}

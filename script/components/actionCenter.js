import React from 'react';
import TaskContainer from './task/taskContainer';
import {slideUp} from '../util/animate.js';

/**
 * Action Center card
 */
export default class ActionCenter extends React.Component {

    /**
     * Toggle the task action input form
     * @private
     */
    _actionOnClick(taskElem, callBack) {
        if (typeof callBack === 'function') {
            callback();
        }
    }
    
    _dismissSlide(taskElem, callback) {
        const slideMillis = 250;
        slideUp(taskElem, slideMillis, 'ease-out', () => {
            if (typeof callBack === 'function') {
                callback();
            }
        });
    }
    
    _filterOnChange(taskType) {
        alert("Task Type: " + taskType);
    }
    
    _sortByOnChange(sortBy) {
        alert("Sort by: " + sortBy); 
    }
    
    /**
     * Renders the Card component.
     * @returns {XML}
     */
    render() {
        if (!this.props.data.tasks.requestStatus && this.props.data.tasks.requestStatus !== 'success') {
            return (<div/>)
        }

        return (
            <TaskContainer {...this.props}
                tasks={this.props.data.tasks} 
                actionOnClick={this._actionOnClick}
                dismissAnimation={this._dismissSlide} 
                filterOnChange={this._filterOnChange} 
                sortByOnChange={this._sortByOnChange}/> 
        );
    }
}

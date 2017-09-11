import React from 'react';
import ReactDOM from 'react-dom'
import {Calendar} from 'amazonui-react-elements/elements';
import {DeclarativeAction, PopoverTrigger, PopoverPreloadContent, Button} from 'amazonui-react-elements/elements';
import Immutable from 'immutable';
import Moment from 'moment';
import StringUtil from "../../util/stringUtil";

/**
 * Converts a MomentJs object into an AUI date object.
 * AUI expects months to be 1-12, moment uses 0-11.
 * @param moment the date to convert
 * @returns {{year, month, day}}
 * @private
 */
function _formatDateForAui(moment) {
    return {
        year: moment.year(),
        month: moment.month() + 1,
        day: moment.date(),
    };
}

function _buildAuiCalendarAttributes(minDate, maxDate, selectedDate) {
    const auiCalendarAttributes = {};

    if (minDate) {
        auiCalendarAttributes.minDate = _formatDateForAui(minDate);
    }
    if (maxDate) {
        auiCalendarAttributes.maxDate = _formatDateForAui(maxDate);
    }
    if (selectedDate) {
        auiCalendarAttributes.selectedDate = _formatDateForAui(selectedDate);
    }

    return auiCalendarAttributes;
}

/**
 * Class to change the domain (range of x-axis values) using calendars.
 */
export default class DateRangeCalendar extends React.Component {
	
	 constructor(props) {
	        super(props);
	        this._getSelectedDateRange =  this._getSelectedDateRange.bind(this);
	 }
	 
    
	 componentDidMount() {
		 let self = this;
		 
		 P.when("A","a-modal", "ready").execute(function(A, modal) {
			    var $ = A.$;
			    A.declarative("a-popover-close", 'click', function() {
			    	self.props.onSelectedDateRangeChanged(self._getSelectedDateRange());
			    });
			});
     } 

	//this  method is extremely hacky and depends strongly on the inner html of generated Calendar. Don't feel afraid if you can't figure WTF happening here.
	_getSelectedDateRange(event) {
		const from = ReactDOM.findDOMNode(this.refs.calendarFrom).getElementsByClassName('a-cal-select')[0].dataset.timestamp;
		const to = ReactDOM.findDOMNode(this.refs.calendarTo).getElementsByClassName('a-cal-select')[0].dataset.timestamp;
		
        return Immutable.fromJS({
            from: Moment.unix(from/1000),
            to: Moment.unix(to/1000),
        });

	}
	
    render() {
        const popoverParams = {
            name: 'Popover',
            width: '750',
            activate: 'onclick',
            closeButton: true,
            position: 'triggerBottom',
        };

        // convert to AUI expected date format
        const fromDate = this.props.selectedDateRange ? this.props.selectedDateRange.get('from') : null;
        const toDate = this.props.selectedDateRange ? this.props.selectedDateRange.get('to') : null;

        const fromCalendarAttributes = _buildAuiCalendarAttributes(this.props.minDate, this.props.maxDate, fromDate);
        const toCalendarAttributes = _buildAuiCalendarAttributes(this.props.minDate, this.props.maxDate, toDate);

        const fromDateCalendarTitle = StringUtil.getString('b2bcentral_desktop_calender_from');
        const toDateCalendarTitle = StringUtil.getString('b2bcentral_desktop_calender_to');
        const dateRangeText = StringUtil.getString('b2bcentral_desktop_calender_daterange');

        return (
            <span className="dateRangeContainer">
                <DeclarativeAction actionName="a-popover" actionParams={popoverParams}>
                    <PopoverTrigger>
                        <i className="icon date_range"></i>
                        <span className="dateRangeText">{dateRangeText}</span>
                    </PopoverTrigger>
                </DeclarativeAction>

                <PopoverPreloadContent popoverName={popoverParams.name}>
                    <div className="calendarOuter">
                        <div className="calendarInner">
                            <div className="calendarFrom">
                                <div className="calendarTitle">{fromDateCalendarTitle}</div>
                                <Calendar
                                    inlineCalendar
                                    calendarAttributes={fromCalendarAttributes}
                                	ref="calendarFrom"
                                />
                            </div>
                            <div className="calendarTo">
                                <div className="calendarTitle">{toDateCalendarTitle}</div>
                                <Calendar
                                    inlineCalendar
                                    calendarAttributes={toCalendarAttributes}
                                	ref="calendarTo"
                                />
                            </div>                
                        </div>
                    </div>
                </PopoverPreloadContent>
            </span>
        );
    }
}

/**
 * DateRangeCalendar proptypes provide type validation on props.
 * @type {{
 *     minDate: Moment the lowest date to show,
 *     maxDate: Moment the highest date to show,
 *     selectedDateRange: the custom date range to show, of shape:
 *         from: time to start showing data,
 *         to: time to stop showing data,
 * }}
 */
DateRangeCalendar.propTypes = {
    minDate: React.PropTypes.instanceOf(Moment).isRequired,
    maxDate: React.PropTypes.instanceOf(Moment).isRequired,
    selectedDateRange: React.PropTypes.instanceOf(Immutable.Map),
};

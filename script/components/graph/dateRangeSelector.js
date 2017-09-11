import React from 'react';
import DateRangeCalendar from './dateRangeCalendar';
import DateRangeTimeLine from './dateRangeTimeLine';
import Immutable from 'immutable';
import Moment from 'moment';

/**
 * Finds the matching preset, if any.
 * Null if no match.
 * @param startDate the starting date of the current date range
 * @param endDate the ending date of the current date range
 * @param presetDateRanges the list of presets to match against
 * @returns {*} the matching preset, or null
 * @private
 */
function _tryParseMatchingPreset(startDate, endDate, presetDateRanges) {
    const timeRangeHours = endDate.diff(startDate, 'hours', true);
    const timeRangeDays = endDate.diff(startDate, 'days', true);
    const timeRangeMonths = endDate.diff(startDate, 'months', true);
    const timeRangeYears = endDate.diff(startDate, 'years', true);

    return presetDateRanges.reduce((current, presetRange) => {
        const offset = presetRange.get('offset');
        const presetHours = offset.asHours();
        const presetDays = offset.asDays();
        const presetMonths = offset.asMonths();
        const presetYears = offset.asYears();

        if (presetHours === timeRangeHours ||
            presetDays === timeRangeDays ||
            presetMonths === timeRangeMonths ||
            presetYears === timeRangeYears) {
            return presetRange;
        }

        return current;
    }, null);
}

/**
 * Class representing the part of a graph to change the domain (range of x-axis values).
 */
export default class DateRangeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPresetDateRange: null,
        };

        this._handlePresetDateChanged = this._handlePresetDateChanged.bind(this);
        this._handleDateChanged = this._handleDateChanged.bind(this);
    }

    componentWillMount() {
        const dateRange = this.props.selectedDateRange;
        if (dateRange.get('to').isSame(this.props.maxDate)) {
            const selectedPresetDateRange =
                _tryParseMatchingPreset(dateRange.get('from'), dateRange.get('to'), this.props.presetDateRanges);

            this.setState({selectedPresetDateRange});
        }
    }

    componentWillReceiveProps(nextProps) {
        const newDateRange = nextProps.selectedDateRange;
        const newPresetDateRanges = nextProps.presetDateRanges;
        if (newDateRange !== this.props.selectedDateRange || newPresetDateRanges !== this.props.presetDateRanges) {
            let selectedPresetDateRange = null;
            if (newDateRange.get('to').isSame(nextProps.maxDate)) {
                selectedPresetDateRange =
                    _tryParseMatchingPreset(newDateRange.get('from'), newDateRange.get('to'), newPresetDateRanges);
            }

            this.setState({selectedPresetDateRange});
        }
    }

    /**
     * Handles the preset date changing from the timeline.
     * @param range the new preset date range
     * @private
     */
    _handlePresetDateChanged(range) {
        const dateRange = Immutable.fromJS({
            from: this.props.maxDate.clone().subtract(range.get('offset')),
            to: this.props.maxDate,
        });

        this.props.onDateChange(dateRange);
    }

    /**
     * Handles the date changing from the calendar.
     * @param range the new date range
     * @private
     */
    _handleDateChanged(range) {
        this.props.onDateChange(range);
    }

    /**
     * Renders the DateRangeSelector component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="graph-date-select-container">
                <DateRangeTimeLine
                    presetDateRanges={this.props.presetDateRanges}
                    selectedPresetDateRange={this.state.selectedPresetDateRange}
                    onSelectedDateRangeChanged={this._handlePresetDateChanged}
                />

                <DateRangeCalendar
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    selectedDateRange={this.props.selectedDateRange}
                    onSelectedDateRangeChanged={this._handleDateChanged}
                />
            </div>
        );
    }
}

/**
 * DateRangeSelector proptypes provide type validation on props.
 * @type {{
 *     minDate: the lowest date to show,
 *     maxDate: the highest date to show
 *     presetDateRanges: list of date ranges to show, of shape:
 *         title: title of the range,
 *         offset: the duration of the range,
 *     selectedDateRange: the custom date range to show, of shape:
 *         from: time to start showing data,
 *         to: time to stop showing data,
 *     onDateChange: callback, expecting the dataRange id
 * }}
 */
DateRangeSelector.propTypes = {
    minDate: React.PropTypes.instanceOf(Moment).isRequired,
    maxDate: React.PropTypes.instanceOf(Moment).isRequired,
    presetDateRanges: React.PropTypes.instanceOf(Immutable.List).isRequired,
    selectedDateRange: React.PropTypes.instanceOf(Immutable.Map),
    onDateChange: React.PropTypes.func.isRequired,
};

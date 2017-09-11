import React from 'react';
import Immutable from 'immutable';
import StringUtil from "../../util/stringUtil";

/**
 * Class to change the domain (range of x-axis values) using hard-coded date ranges.
 */
export default class DateRangeTimeLine extends React.Component {
    /**
     * Renders the DateRangeTimeLine component.
     *
     * @returns {XML}
     */
    render() {
        const dateRanges = this.props.presetDateRanges.map((dateRange) => {
            const isSelectedCss = this.props.selectedPresetDateRange === dateRange ? 'selected' : '';
            const onClickHandler = () => {
                if (this.props.selectedPresetDateRange !== dateRange) {
                    this.props.onSelectedDateRangeChanged(dateRange);
                }
            };

            return (
                <span
                    key={dateRange.get('title')}
                    className={`date-select ${isSelectedCss}`}
                    onClick={onClickHandler}
                >
                    {dateRange.get('title')}
                </span>);
        });
        
        const labelStyle = {
        		float: 'left',
        		fontWeight: 'normal',
        };

        return (
    		<div className='inline-block'> 
    			<label style={labelStyle}>{StringUtil.getString('b2bcentral_desktop_dateRange_1')}</label> <span>{dateRanges}</span>
    		</div>
        );
    }
}

/**
 * DateRangeTimeLine proptypes provide type validation on props.
 * @type {{
 *     presetDateRanges: list of date ranges to show, of shape:
 *         title: title of the range,
 *         offset: the duration of the range,
 *     selectedPresetDateRange: the selected date range, or null or undefined if nothing selected
 *     onSelectedDateRangeChanged: callback, expecting the dataRange id
 * }}
 */
DateRangeTimeLine.propTypes = {
    presetDateRanges: React.PropTypes.instanceOf(Immutable.List).isRequired,
    selectedPresetDateRange: React.PropTypes.instanceOf(Immutable.Map),
    onSelectedDateRangeChanged: React.PropTypes.func,
};

import {assert, expect} from 'chai';
import sinon from 'sinon';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import Immutable from 'immutable';
import Moment from 'moment';
import DateRangeSelector from '../../../script/components/graph/dateRangeSelector';
import DateRangeTimeLine from '../../../script/components/graph/dateRangeTimeLine';
import DateRangeCalendar from '../../../script/components/graph/dateRangeCalendar';

const maxDate = Moment();
const minDate = maxDate.clone().subtract(1, 'years');
const presetDateRanges = Immutable.fromJS([
    {title: '1 DAY', offset: Moment.duration(1, 'days')},
    {title: '7 DAYS', offset: Moment.duration(7, 'days')},
    {title: '30 DAYS', offset: Moment.duration(30, 'days')},
    {title: '6 MONTHS', offset: Moment.duration(6, 'months')},
    {title: '1 YEAR', offset: Moment.duration(1, 'years')},
]);

describe('DateRangeSelector', function () {
    beforeEach(function () {
        this.spy = sinon.spy();
        this.selector = mount(
            <DateRangeSelector
                minDate={minDate}
                maxDate={maxDate}
                presetDateRanges={presetDateRanges}
                selectedDateRange={Immutable.fromJS({from: minDate, to: maxDate})}
                onDateChange={this.spy}
            />);
    });

    it('should set date ranges on the timeline', function () {
        assert(this.selector.find(DateRangeTimeLine).props().presetDateRanges.equals(presetDateRanges));
    });

    it('should set selected date range on the timeline', function () {
        assert(this.selector.find(DateRangeTimeLine).props().selectedPresetDateRange.equals(presetDateRanges.get(4)));
    });

    it('should set min/max on calendar', function () {
        expect(this.selector.find(DateRangeCalendar).props().minDate).to.be.equal(minDate);
        expect(this.selector.find(DateRangeCalendar).props().maxDate).to.be.equal(maxDate);
    });

    it('should set selected range on calendar', function () {
        assert(this.selector.find(DateRangeCalendar).props().selectedDateRange.equals(Immutable.fromJS({
            from: minDate,
            to: maxDate,
        })));
    });

    it('should respond to changes from the timeline', function () {
        this.selector.find(DateRangeTimeLine).props().onSelectedDateRangeChanged(Immutable.fromJS({
            to: maxDate,
            from: maxDate.clone().subtract(1, 'months'),
        }));

        expect(this.spy.calledOnce).to.be.true;
    });

    it('should respond to changes from the calendar', function () {
        this.selector.find(DateRangeCalendar).props().onSelectedDateRangeChanged(Immutable.fromJS({
            to: maxDate,
            from: maxDate.clone().subtract(1, 'months'),
        }));

        expect(this.spy.calledOnce).to.be.true;
    });

    [
        {magnitude: 1, unit: 'days', matchingIndex: 0},
        {magnitude: 7, unit: 'days', matchingIndex: 1},
        {magnitude: 30, unit: 'days', matchingIndex: 2},
        {magnitude: 6, unit: 'months', matchingIndex: 3},
        {magnitude: 1, unit: 'years', matchingIndex: 4},
    ].forEach(function (test) {
        it(`should update preset date when the date changes by ${test.magnitude} ${test.unit}`, function () {
            this.selector.setProps({
                selectedDateRange: Immutable.fromJS({
                    from: maxDate.clone().subtract(test.magnitude, test.unit),
                    to: maxDate,
                }),
            });

            const selectedRange = this.selector.find(DateRangeTimeLine).props().selectedPresetDateRange;
            assert(selectedRange.equals(presetDateRanges.get(test.matchingIndex)));
        });
    });
});

import {expect} from "chai";
import sinon from 'sinon';
import React from "react";
import {shallow, mount, render} from 'enzyme';
import Moment from 'moment';
import Immutable from 'immutable';
import DateRangeTimeline from '../../../script/components/graph/dateRangeTimeLine';

describe('DateRangeTimeline', function () {
    const presetDateRanges = Immutable.fromJS([
        {title: '1 DAY', offset: Moment.duration(1, 'days')},
        {title: '7 DAYS', offset: Moment.duration(7, 'days')},
        {title: '30 DAYS', offset: Moment.duration(30, 'days')},
        {title: '6 MONTHS', offset: Moment.duration(6, 'months')},
        {title: '1 YEAR', offset: Moment.duration(1, 'years')},
    ]);

    it('renders all given date ranges', function () {
        const dateRange = shallow(
            <DateRangeTimeline
                presetDateRanges={presetDateRanges}
                onSelectedDateRangeChanged={sinon.spy()}
                selectedPresetDateRange={presetDateRanges.get(2)}
            />);

        const all = dateRange.find('.date-select');

        expect(all.length).to.be.equal(presetDateRanges.count());
    });

    it('displays the given titles', function () {
        const dateRange = shallow(
            <DateRangeTimeline
                presetDateRanges={presetDateRanges}
                onSelectedDateRangeChanged={sinon.spy()}
                selectedPresetDateRange={presetDateRanges.get(2)}
            />);

        const all = dateRange.find('.date-select');
        for (let i = 0; i < presetDateRanges.count(); ++i) {
            const renderedText = all.at(i).text();
            const expectedText = presetDateRanges.get(i).get('title');

            expect(renderedText).to.be.equal(expectedText);
        }
    });

    it('responds to preset date range size change', function () {
        const dateRange = shallow(
            <DateRangeTimeline
                presetDateRanges={presetDateRanges}
                onSelectedDateRangeChanged={sinon.spy()}
                selectedPresetDateRange={presetDateRanges.get(2)}
            />);

        let all = dateRange.find('.date-select');
        expect(all.length).to.be.equal(presetDateRanges.count());

        dateRange.setProps({presetDateRanges: presetDateRanges.skipLast(1)});
        all = dateRange.find('.date-select');
        expect(all.length).to.be.equal(4);
    });

    it('changes selection when selected prop changes', function () {
        const dateRange = mount(
            <DateRangeTimeline
                presetDateRanges={presetDateRanges}
                onSelectedDateRangeChanged={sinon.spy()}
                selectedPresetDateRange={presetDateRanges.get(2)}
            />);

        let selected = dateRange.find('.selected');
        expect(selected.text()).to.be.equal(presetDateRanges.get(2).get('title'));

        dateRange.setProps({selectedPresetDateRange: presetDateRanges.get(4)});

        selected = dateRange.find('.selected');
        expect(selected.text()).to.be.equal(presetDateRanges.get(4).get('title'));
    });

    it('fires date change when clicked', function () {
        const onDateChanged = sinon.spy();
        const dateRange = mount(
            <DateRangeTimeline
                presetDateRanges={presetDateRanges}
                onSelectedDateRangeChanged={onDateChanged}
                selectedPresetDateRange={presetDateRanges.get(2)}
            />);

        const all = dateRange.find('.date-select');

        all.at(3).simulate('click');

        expect(onDateChanged.calledOnce).to.be.true;
        expect(onDateChanged.calledWith(presetDateRanges.get(3))).to.be.true;
    });

    it('doesn\'t fire date change when clicking already-selected item', function () {
        const onDateChanged = sinon.spy();
        const dateRange = mount(
            <DateRangeTimeline
                presetDateRanges={presetDateRanges}
                onSelectedDateRangeChanged={onDateChanged}
                selectedPresetDateRange={presetDateRanges.get(2)}
            />);

        const all = dateRange.find('.date-select');

        all.at(2).simulate('click');

        expect(onDateChanged.callCount).to.be.equal(0);
    });
});

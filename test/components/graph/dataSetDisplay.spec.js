import {expect} from "chai";
import sinon from 'sinon';
import React from "react";
import {shallow, mount, render} from 'enzyme';
import Immutable from 'immutable';
import DataSetDisplay from '../../../script/components/graph/dataSetDisplay';
import {Checkbox} from 'amazonui-react-elements/elements';

describe('DataSetDisplay', function () {
    const plotLines = Immutable.fromJS([
        {id: 'b2b', title: 'B2B', isActive: true},
        {id: 'b2c', title: 'B2C', isActive: true},
        {id: 'overall', title: 'Overall', isActive: true},
    ]);

    it('renders all given plotlines', function () {
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={sinon.spy()}
                onMouseLeave={sinon.spy()}
                plotLines={plotLines}
            />);

        const all = dataSet.find('.sales-legend');

        expect(all.length).to.be.equal(plotLines.count());
    });

    it('displays the given titles', function () {
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={sinon.spy()}
                onMouseLeave={sinon.spy()}
                plotLines={plotLines}
            />);

        const all = dataSet.find('.sales-legend');

        for (let i = 0; i < plotLines.count(); ++i) {
            const renderedText = all.at(i).text();
            const expectedText = plotLines.get(i).get('title');

            expect(renderedText).to.be.equal(expectedText);
        }
    });

    it('responds to plotlines size change', function () {
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={sinon.spy()}
                onMouseLeave={sinon.spy()}
                plotLines={plotLines}
            />);

        let all = dataSet.find('.sales-legend');
        expect(all.length).to.be.equal(plotLines.count());

        dataSet.setProps({plotLines: plotLines.skipLast(1)});
        all = dataSet.find('.sales-legend');
        expect(all.length).to.be.equal(2);
    });

    it('fires onChange change when clicked', function () {
        const spy = sinon.spy();
        const dataSet = mount(
            <DataSetDisplay
                onChange={spy}
                onMouseEnter={sinon.spy()}
                onMouseLeave={sinon.spy()}
                plotLines={plotLines}
            />);

        const all = dataSet.find('.sales-legend');

        all.at(2).simulate('click');

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(plotLines.get(2))).to.be.true;
    });

    it('fires onMouseEnter when mouse enters checkbox', function () {
        const spy = sinon.spy();
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={spy}
                onMouseLeave={sinon.spy()}
                plotLines={plotLines}
            />);

        const all = dataSet.find('.sales-legend');

        all.at(2).simulate('mouseEnter');

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(plotLines.get(2))).to.be.true;
    });

    it('fires onMouseLeave when mouse leaves checkbox', function () {
        const spy = sinon.spy();
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={sinon.spy()}
                onMouseLeave={spy}
                plotLines={plotLines}
            />);

        const all = dataSet.find('.sales-legend');

        all.at(2).simulate('mouseLeave');

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(plotLines.get(2))).to.be.true;
    });

    it('checks all active plotlines', function () {
        const updatedPlotLines = plotLines.setIn([0, 'isActive'], false);
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={sinon.spy()}
                onMouseLeave={sinon.spy()}
                plotLines={updatedPlotLines}
            />);

        const all = dataSet.find(Checkbox);

        expect(all.at(0).props().checked).to.be.false;

        for (let i = 1; i < updatedPlotLines.count(); ++i) {
            expect(all.at(i).props().checked).to.be.true;
        }
    });

    it('checks respond to active plotline changes', function () {
        const dataSet = mount(
            <DataSetDisplay
                onChange={sinon.spy()}
                onMouseEnter={sinon.spy()}
                onMouseLeave={sinon.spy()}
                plotLines={plotLines}
            />);

        let all = dataSet.find(Checkbox);
        for (let i = 1; i < plotLines.count(); ++i) {
            expect(all.at(i).props().checked).to.be.true;
        }

        const updatedPlotLines = plotLines.setIn([0, 'isActive'], false);
        dataSet.setProps({plotLines: updatedPlotLines});

        all = dataSet.find(Checkbox);
        expect(all.at(0).props().checked).to.be.false;

        for (let i = 1; i < updatedPlotLines.count(); ++i) {
            expect(all.at(i).props().checked).to.be.true;
        }
    });
});

import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

import {expect} from 'chai';
import sinon from 'sinon';
import React from 'react'
import {shallow, mount, render} from 'enzyme';
import Plot from '../../../script/components/graph/plot';
import Moment from 'moment';
import Immutable from 'immutable';
import c3 from 'c3';

const plotLines = Immutable.fromJS([
    {id: 'b2b', title: 'B2B', isActive: true},
    {id: 'b2c', title: 'B2C', isActive: true},
    {id: 'overall', title: 'Overall', isActive: true},
]);
const axisLabels = Immutable.fromJS({y: 'test'});
const date = Moment();
const dateRange = Immutable.fromJS({to: date, from: date.clone().subtract(1, 'years')});

function _getC3Stub() {
    return {
        axis: {
            labels: sinon.spy(),
            range: sinon.spy(),
        },
        data: {
            colors: sinon.spy(),
            names: sinon.spy(),
        },
        destroy: sinon.spy(),
        flush: sinon.spy(),
        focus: sinon.spy(),
        hide: sinon.spy(),
        load: sinon.spy(),
        revert: sinon.spy(),
        show: sinon.spy(),
    };
}

describe('Plot', function () {
    beforeEach(function () {
        this.c3Stub = _getC3Stub();
        this.generate = sinon.stub(c3, 'generate', () => this.c3Stub);
        this.plot = mount(
            <Plot
                type="line"
                plotLines={plotLines}
                focusedPlotLine={null}
                dateRange={dateRange}
                axisLabels={axisLabels}
                data={Immutable.fromJS([])}
            />);
    });

    afterEach(function () {
        this.generate.restore();
    });

    it('generates a c3 plot on mount', function () {
        expect(this.generate.calledOnce).to.be.true;
    });

    it('loads data on mount', function () {
        expect(this.c3Stub.load.calledOnce).to.be.true;
    });

    it('destroys a c3 plot on unmount', function () {
        // this.plot.unmount();
        //
        // expect(this.c3Stub.destroy.calledOnce).to.be.true;
    });

    it('regenerates a c3 plot if type changes', function () {
        this.generate.reset();

        this.plot.setProps({type: 'bar'});

        expect(this.c3Stub.destroy.calledOnce).to.be.true;
        expect(this.generate.calledOnce).to.be.true;
    });

    it('updates plot data when data changes', function () {
        this.c3Stub.load.reset();

        this.plot.setProps({data: Immutable.fromJS(['asdf', 'foo'])});

        expect(this.c3Stub.load.calledOnce).to.be.true;
    });

    it('updates plot range when dateRange changes', function () {
        this.c3Stub.axis.range.reset();

        this.plot.setProps({dateRange: Immutable.fromJS({to: Moment(), from: Moment()})});

        expect(this.c3Stub.axis.range.calledOnce).to.be.true;
    });

    it('updates plot lines when plotlines changes', function () {
        this.c3Stub.show.reset();
        this.c3Stub.hide.reset();
        this.c3Stub.data.colors.reset();
        this.c3Stub.data.names.reset();

        this.plot.setProps({plotLines: plotLines.setIn([0, 'isActive'], false)});

        expect(this.c3Stub.show.calledOnce).to.be.true;
        expect(this.c3Stub.hide.calledOnce).to.be.true;
        expect(this.c3Stub.data.colors.calledOnce).to.be.true;
        expect(this.c3Stub.data.names.calledOnce).to.be.true;
    });

    it('updates plot focus when plotlines changes', function () {
        this.c3Stub.focus.reset();

        this.plot.setProps({focusedPlotLine: plotLines.get(1)});

        expect(this.c3Stub.focus.calledOnce).to.be.true;
        expect(this.c3Stub.revert.called).to.be.false;
    });

    it('reverts plot focus when no focused plotline', function () {
        this.plot.setProps({focusedPlotLine: plotLines.get(1)});
        this.c3Stub.focus.reset();

        this.plot.setProps({focusedPlotLine: null});

        expect(this.c3Stub.revert.calledOnce).to.be.true;
        expect(this.c3Stub.focus.called).to.be.false;
    });


    it('updates plot axis labels when axis labels changes', function () {
        this.c3Stub.axis.labels.reset();

        this.plot.setProps({axisLabels: Immutable.fromJS({})});

        expect(this.c3Stub.axis.labels.calledOnce).to.be.true;
    });
});

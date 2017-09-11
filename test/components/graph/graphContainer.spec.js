import {expect} from "chai";
import React from "react";
import {shallow, mount, render} from 'enzyme';
import GraphContainer from '../../../script/components/graph/graphContainer';

describe('Graph Container', function () {
    describe('Graph Container with multiple graphs', function () {
        before(function () {
            this.graphContainer = shallow(<GraphContainer title="Sales" />);
            expect(this.graphContainer).to.be.ok;
        });

        it('The Graph Selector Button component should be visible', function () {
            // TODO: Not ready for testing
        });
    });

    describe('Graph Container with one graph', function () {
        before(function () {
            this.graphContainer = shallow(<GraphContainer title="Sales" />);
            expect(this.graphContainer).to.be.ok;
        });

        it('The Graph Selector Button component should not be visible', function () {
            // TODO: Not ready for testing
        });
    });

});

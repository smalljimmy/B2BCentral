import {expect} from 'chai';
import * as React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import * as ShallowTestUtils from 'react-shallow-testutils';
import OverviewPanel from '../../script/components/overviewPanel';
import Detail from '../../script/components/detail';
import SparkNav from '../../script/components/sparkNav';

describe('OveriewPanel', function () {
    before(function () {
        let renderer = TestUtils.createRenderer();
        renderer.render(<OverviewPanel/>);
        this.overviewPanel = renderer.getRenderOutput();

        expect(this.overviewPanel).to.be.ok;
    });

    it('Detail component should exist', function () {
        let detail = ShallowTestUtils.findWithType(this.overviewPanel, Detail);
        expect(detail).to.be.ok;
    });

    it('SparkNav component should exist', function () {
        let sparkNav = ShallowTestUtils.findWithType(this.overviewPanel, SparkNav);
        expect(sparkNav).to.be.ok;
    });
});

import {expect, assert, should} from 'chai';
import sinon from 'sinon';
import * as React from 'react';
import * as ShallowTestUtils from 'react-shallow-testutils';
import NavTab from '../../script/components/navTab';
import TestUtils from 'react-addons-test-utils';
import Badge from '../../script/components/badge';

describe('NavTab', function () {
    const title = "someTitle";
    const subTitle = "someSubTitle";
    const status = "someStatus";

    describe('Title', function () {
        beforeEach(function () {
            this.consoleStub = sinon.stub(console, 'error', (error) => {
                throw new Error(error);
            });
        });

        afterEach(function () {
            this.consoleStub.restore();
        });

        it('is required', function () {
            expect(function () {
                return <NavTab/>
            }).to.throw();
        });

        it("should be visible", function () {
            let shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<NavTab title={title} subTitle={subTitle}/>);
            let navTab = shallowRenderer.getRenderOutput();

            let navTabTitle = ShallowTestUtils.findWithClass(navTab, "nav-tab-title");
            expect(navTabTitle.props.children).to.equal(title);
        });
    });

    describe('SubTitle', function () {
        it("should be visible when given", function () {
            let shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<NavTab title={title} subTitle={subTitle}/>);
            let navTab = shallowRenderer.getRenderOutput();

            let navTabSubTitle = ShallowTestUtils.findWithClass(navTab, "nav-tab-sub-title");
            expect(navTabSubTitle.props.children).to.equal(subTitle);
        });

        it("should not be visible when absent", function () {
            let shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<NavTab title={title}/>);
            let navTab = shallowRenderer.getRenderOutput();

            let navTabSubTitle = ShallowTestUtils.findAllWithClass(navTab, "nav-tab-sub-title");
            expect(navTabSubTitle.length).to.equal(0);
        });
    });

    describe('Badge', function () {
        it("should be visible when given", function () {
            let shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<NavTab title={title} subTitle={subTitle} status={status}/>);
            let navTab = shallowRenderer.getRenderOutput();

            let navTabBadge = ShallowTestUtils.findWithType(navTab, Badge);
            expect(navTabBadge.props.content).to.equal(status);
        });

        it("should not be visible when absent", function () {
            let shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<NavTab title={title} subTitle={subTitle}/>);
            let navTab = shallowRenderer.getRenderOutput();

            let badges = ShallowTestUtils.findAllWithType(navTab, Badge);
            expect(badges.length).to.equal(0);
        });
    });
});

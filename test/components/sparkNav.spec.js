import {expect, should} from 'chai';
import sinon from 'sinon';
import * as React from 'react';
import * as ShallowTestUtils from 'react-shallow-testutils';
import NavTab from '../../script/components/navTab';
import SparkNav from '../../script/components/sparkNav';
import TestUtils from 'react-addons-test-utils';
import * as ContentActions from "../../script/actions/contentActions";
import {namespaceCardId} from "../../script/util/util.js";

const fakeCardTitle = "Foo";

describe('SparkNav', function () {
    let tests = [
        {cards: null, tabs: 0},
        {cards: 0, tabs: 0},
        {cards: 1, tabs: 1, clickedTab: 0, scrolledTo: 0},
        {cards: 3, tabs: 3, clickedTab: 1, scrolledTo: 1},
        {cards: 8, tabs: 8, clickedTab: 4, scrolledTo: 4},
        {cards: 500, tabs: 500, clickedTab: 89, scrolledTo: 89},
    ];

    tests.forEach(function (test) {
        describe(`${test.cards} Cards`, function () {
            before(function () {
                let shallowRenderer = TestUtils.createRenderer();
                let cards = [];

                if (test.cards !== null) {
                    // generate fake cards for the given count
                    for (let i = 0; i < test.cards; ++i) {
                        cards.push({
                            baseCardProps: {
                                title: fakeCardTitle + i,
                            },
                            nav: {
                                subTitle: fakeCardTitle + i,
                                status: null,
                            },
                        });
                    }
                }
                shallowRenderer.render(<SparkNav cards={cards}/>);
                this.sparkNav = shallowRenderer.getRenderOutput();

                expect(this.sparkNav).to.be.ok;
            });

            beforeEach(function () {
                this.focusStub = sinon.stub(ContentActions, "focusCard");
            });

            afterEach(function () {
                this.focusStub.restore();
            });

            it(`should have ${test.tabs} tabs`, function () {
                let navTabs = ShallowTestUtils.findAllWithType(this.sparkNav, NavTab);

                expect(navTabs).to.have.length(test.tabs);
            });

            it("the navTab titles should match card titles", () => {
                let navTabs = ShallowTestUtils.findAllWithType(this.sparkNav, NavTab);

                for (let i = 0; i < navTabs.length; ++i) {
                    expect(navTabs[i].props.title).to.equal(fakeCardTitle + i);
                }
            });

            // only test clicks when we actually have cards
            if (test.cards !== null && test.cards > 0) {
                it(`should scroll to card ${test.scrolledTo} when tab ${test.clickedTab} is clicked`, function () {
                    let navTabs = ShallowTestUtils.findAllWithType(this.sparkNav, NavTab);
                    // simulate click (TestUtils.Simulate.click()) doesn't work with shallow rendering
                    navTabs[test.clickedTab].props.onNavRequested();

                    expect(this.focusStub.calledOnce).to.equal(true);
                    expect(this.focusStub.calledWith(namespaceCardId(fakeCardTitle + test.scrolledTo))).to.equal(true);
                });
            }
        });
    });
});

import {expect, should} from 'chai';
import sinon from 'sinon';
import * as React from 'react';
import * as ShallowTestUtils from 'react-shallow-testutils';
import Card from '../../script/components/card';
import ContentPanel from '../../script/components/contentPanel';
import TestUtils from 'react-addons-test-utils';
import * as ContentActions from "../../script/actions/contentActions";
import {namespaceCardId} from "../../script/util/util.js";
import {staticManifest} from "../../script/mocks/manifest";
import {shallow, mount, render} from 'enzyme';

const fakeCardTitle = "Foo";

describe('ContentPanel', function () {
    let tests = [
        {cards: 0},
        {cards: 1},
        {cards: 3},
        {cards: 8},
        {cards: 500},
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
                shallowRenderer.render(<ContentPanel cards={cards} />);
                this.contentPanel = shallowRenderer.getRenderOutput();

                expect(this.contentPanel).to.be.ok;
            });

            it(`should render ${test.cards} cards`, function () {
                let cards = ShallowTestUtils.findAllWithType(this.contentPanel, Card);

                expect(cards).to.have.length(test.cards);
            });
        });
    });
});

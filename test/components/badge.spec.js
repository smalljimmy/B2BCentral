import {expect} from 'chai';
import sinon from 'sinon';
import * as React from 'react';
import TestUtils from 'react-addons-test-utils';
import Badge, {BadgeType} from '../../script/components/badge';

describe('Badge', function () {
    beforeEach(function () {
        this.consoleStub = sinon.stub(console, 'error', (error) => {
            throw new Error(error);
        });
    });

    afterEach(function () {
        this.consoleStub.restore();
    });


    let validTests = [
        {badgeType: "Success"},
        {badgeType: "Warning"},
        {badgeType: "Info"},
        {badgeType: "Neutral"},
    ];
    let invalidTests = [
        {badgeType: "Foo"},
    ];
    let missingContentTests = [
        {badgeType: ""},
    ];

    validTests.forEach(function (test) {
        it(`${test.badgeType} badge is rendered correctly`, function () {
            let _renderer = TestUtils.createRenderer();
            _renderer.render(<Badge type={BadgeType[test.badgeType.toUpperCase().replace(" ", "_")]}
                                    content={test.badgeType}/>);
            let badge = _renderer.getRenderOutput();

            expect(badge).to.be.ok;
            expect(badge.props.children.props.children.toLowerCase()).to.equal(test.badgeType.toLowerCase());
        });
    });

    invalidTests.forEach(function (test) {
        it(`warns ${test.badgeType} badge type is invalid`, function () {
            expect(function () {
                return <Badge type={BadgeType[test.badgeType.toUpperCase().replace(" ", "_")]}
                              content={test.badgeType}/>;
            }).to.throw();
        });
    });

    missingContentTests.forEach(function (test) {
        it(`does not display if no content is passed in`, function () {
            let _renderer = TestUtils.createRenderer();
            _renderer.render(<Badge type={BadgeType[test.badgeType.toUpperCase().replace(" ", "_")]}
            content={test.badgeType}/>);
            let badge = _renderer.getRenderOutput();

            expect(badge).to.be.ok;
            expect(badge.props.children).to.equal(null);
        });
    });
});

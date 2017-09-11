import {expect} from "chai";
import Moment from 'moment';
import React from "react";
import TestUtils from "react-addons-test-utils";
import {Heading} from 'amazonui-react-elements/elements';
import Badge, {BadgeType} from '../../script/components/badge';
import CardHeader from "../../script/components/cardHeader";
import {shallow, mount, render} from 'enzyme';

describe('CardHeader', function () {
    const _updated = {
        label: "Last Updated",
        value: Moment()
    };

    const noop = () => {
    };

    const testCases = [
        {badgeVisible: true,},
        {badgeVisible: false,},
    ];

    testCases.forEach(function (test) {
        describe(`badge ${test.badgeVisible ? '' : 'not '}visible`, function () {
            before(function () {
                const shallowRenderer = TestUtils.createRenderer();

                const badge = {
                    content: "neutral",
                    type: BadgeType.NEUTRAL,
                    visible: test.badgeVisible,
                };

                this.cardHeader = mount(
                    <CardHeader
                        updated={_updated}
                        badge={badge}
                        title={'Test'}
                        refreshCallback={noop}
                        toggleCardBodyCallback={noop}
                        toggleGraphCallback={noop}
                    />);
                expect(this.cardHeader).to.be.ok;
            });

            it('the title should be visible', function () {
                const title = this.cardHeader.find(Heading);

                expect(title).to.be.ok;
            });

            it(`the status badge should ${test.badgeVisible ? '' : 'not '}be visible`, function () {
                const statusBadge = this.cardHeader.find(Badge);

                expect(statusBadge.length).to.equal(test.badgeVisible ? 1 : 0);
            });

            it('the updated label should be visible', function () {
                const updatedLabel = this.cardHeader.find('p');

                expect(updatedLabel).to.be.ok;
                expect(updatedLabel.node.innerHTML).to.include(_updated.label);
            });

            it('the updated date and time should be visible', function () {
                const updatedLabel = this.cardHeader.find('p');

                expect(updatedLabel).to.be.ok;
            });

            it('the action menu icon should be visible', function () {
                const actionMenuIcon = this.cardHeader.find("card-actions");

                expect(actionMenuIcon).to.be.ok;
            });

            it('the refresh icon should be visible', function () {
                const actionMenuIcon = this.cardHeader.ref("refresh-icon");

                expect(actionMenuIcon).to.be.ok;
            });

            it('the toggle card body icon should be visible', function () {
                const actionMenuIcon = this.cardHeader.ref("toggle-card-body-icon");

                expect(actionMenuIcon).to.be.ok;
            });

            it('the graph icon should be visible', function () {
                const actionMenuIcon = this.cardHeader.ref("graph-icon");

                expect(actionMenuIcon).to.be.ok;
            });
        });
    });

    describe('card body toggle icon should toggle', function(){
        before(function () {
            this.badge = {
                content: "neutral",
                type: BadgeType.NEUTRAL,
                visible: true,
            };
        });

        it('the card body toggle icon should be down', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                    cardBodyIsVisible={false}
                />);
            expect(cardHeader).to.be.ok;

            const icon = cardHeader.ref("toggle-card-body-icon");
            const subIcons = icon.find('i');
            expect(subIcons.nodes[1].innerHTML).to.be.equal('arrow_drop_down');
        });

        it('the card body toggle icon should be up', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                    cardBodyIsVisible={true}
                />);
            expect(cardHeader).to.be.ok;

            const icon = cardHeader.ref("toggle-card-body-icon");
            const subIcons = icon.find('i');
            expect(subIcons.nodes[1].innerHTML).to.be.equal('arrow_drop_up');
        });
    });

    describe('selectable menu items should have .selected class when selected', function(){
        before(function () {
            this.badge = {
                content: "neutral",
                type: BadgeType.NEUTRAL,
                visible: true,
            };
        });

        it('card toggle menu item shouldn\'t be selected', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                    cardBodyIsVisible={false}
                />);
            expect(cardHeader).to.be.ok;

            const menuItem = cardHeader.ref("toggle-card-body-menu-item");
            expect(menuItem.prop('className')).to.not.contain('selected');
        });

        it('card toggle menu item should be selected', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                    cardBodyIsVisible={true}
                />);
            expect(cardHeader).to.be.ok;

            const menuItem = cardHeader.ref("toggle-card-body-menu-item");
            expect(menuItem.prop('className')).to.contain('selected');
        });

        it('graph toggle menu item shouldn\'t be selected', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                />);
            expect(cardHeader).to.be.ok;

            const menuItem = cardHeader.ref("toggle-graph-menu-item");
            expect(menuItem.prop('className')).to.not.contain('selected');
        });

        it('graph toggle menu item should be selected', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                />);
            expect(cardHeader).to.be.ok;

            const menuItem = cardHeader.ref("toggle-graph-menu-item");
            expect(menuItem.prop('className')).to.equal('selected');
        });
    });

    describe('graph toggle menu item should be enabled or disabled depending on whether the card body is open or closed', function() {
        before(function () {
            this.badge = {
                content: "neutral",
                type: BadgeType.NEUTRAL,
                visible: true,
            };
        });

        it('graph toggle menu item should not be disabled when the card body is visible', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                    cardBodyIsVisible={true}
                />);
            expect(cardHeader).to.be.ok;

            const menuItem = cardHeader.ref("toggle-graph-menu-item");
            expect(menuItem.prop('disabled')).to.equal(false);
        });

        it('graph toggle menu item should be disabled when the card body is NOT visible', function() {
            const cardHeader = mount(
                <CardHeader
                    updated={_updated}
                    badge={this.badge}
                    title={'Test'}
                    refreshCallback={noop}
                    toggleCardBodyCallback={noop}
                    toggleGraphCallback={noop}
                    cardBodyIsVisible={false}
                />);
            expect(cardHeader).to.be.ok;

            const menuItem = cardHeader.ref("toggle-graph-menu-item");
            expect(menuItem.prop('disabled')).to.equal(true);
        });
    });
});

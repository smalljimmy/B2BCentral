import {expect} from 'chai';
import sinon from 'sinon';
import * as React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import * as ShallowTestUtils from 'react-shallow-testutils';
import Menu from '../../script/components/menu';
import MenuItem from '../../script/components/menuItem';
import jsdom from 'jsdom';
import {shallow, mount, render} from 'enzyme';
import * as mockAnimate from '../../script/util/animate.js';


mockAnimate.slideToggle = (a, b, c, callback) => {
    mockAnimate.slideToggle.calls = mockAnimate.slideToggle.calls ? mockAnimate.slideToggle.calls + 1 : 1;
    callback();
};

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

describe('Menu', function () {
    describe('general', function () {
        beforeEach(function () {
            this.consoleStub = sinon.stub(console, 'error', (error) => {
                throw new Error(error);
            });
        });

        afterEach(function () {
            this.consoleStub.restore();
        });

        it('should warn on non-MenuItem children', function () {
            expect(function () {
                return (
                    <Menu>
                        Foo
                    </Menu>
                );
            }).to.throw();
        });
    });

    describe('menu closed', function () {
        beforeEach(function () {
            let shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<Menu/>);
            this.menu = shallowRenderer.getRenderOutput();

            expect(this.menu).to.be.ok;
        });

        it('menu items should not be visible', function () {
            let menuDropdowns = ShallowTestUtils.findAllWithClass(this.menu, "menu-dropdown");
            menuDropdowns.forEach(menuDropdown => {
                expect(menuDropdown).to.have.deep.property('props.style.display', 'none');
            })
        });

        it('IMPLEMENT ME: should open when button is clicked', function () {

        });
    });

    describe('menu open', function () {
        beforeEach(function () {
            this.menu = mount(<Menu><MenuItem action={() => {}}>Foo</MenuItem></Menu>);
            this.menu.setState({isOpen: true});

            expect(this.menu).to.be.ok;
        });

        it('IMPLEMENT ME: menu items should be visible', function () {

        });

        it('IMPLEMENT ME: should close when focus is lost', function () {

        });

        it('IMPLEMENT ME: should close when a menu item is clicked', function () {

        });
    });
});
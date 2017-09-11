import {expect} from 'chai';
import * as React from 'react';
import sinon from 'sinon';
import TestUtils from 'react/lib/ReactTestUtils';
import MenuItem from '../../script/components/menuItem';
import {shallow, mount, render} from 'enzyme';

function noop() {
}

describe('MenuItem', function () {
    describe('content', function () {
        beforeEach(function () {
            this.consoleStub = sinon.stub(console, 'error', (error) => {
                throw new Error(error);
            });
        });

        afterEach(function () {
            this.consoleStub.restore();
        });

        it('should not have less than 1 child', function () {
            expect(function () {
                return (
                    <MenuItem action={noop}/>
                );
            }).to.throw();
        });

        it('should support 1 child', function () {
            expect(function () {
                return (
                    <MenuItem action={noop}>
                        <div></div>
                    </MenuItem>
                );
            }).to.not.throw();
        });

        it('should support more than 1 child', function () {
            expect(function () {
                return (
                    <MenuItem action={noop}>
                        <div></div>
                        <div></div>
                        Foo
                        <div></div>
                    </MenuItem>
                );
            }).to.not.throw();
        });

        it('should pass through className', function() {
            const menuItem = mount(<MenuItem action={noop} className="className">Foo</MenuItem>);
            const content = menuItem.find('.className');

            expect(content.length).to.be.ok;
        });

        it('should not have disabled class', function() {
            const menuItem = mount(<MenuItem action={noop} className="className" disabled={false}>Foo</MenuItem>);

            expect(menuItem.find('div').prop('className')).to.not.contain('disabled');
        });

        it('should have disabled class', function() {
            const menuItem = mount(<MenuItem action={noop} className="className" disabled={true}>Foo</MenuItem>);

            expect(menuItem.find('div').prop('className')).to.contain('disabled');
        });
    });

    describe('function', function () {
        beforeEach(function () {
            this.action = sinon.spy();
        });


        it('should fire the given "action" when clicked', function () {
            this.menuItem = mount(<MenuItem action={this.action}>Foo</MenuItem>);
            this.menuItem.simulate('click');
            expect(this.action.callCount).to.equal(1);
        });

        it('when disabled should NOT fire the given "action" when clicked', function () {
            this.menuItem = mount(<MenuItem action={this.action} disabled={true}>Foo</MenuItem>);
            this.menuItem.simulate('click');
            expect(this.action.callCount).to.equal(0);
        });
    });
});

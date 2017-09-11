import {expect} from 'chai';
import * as React from 'react';
import ReactToolTip from 'react-tooltip';
import TestUtils from 'react/lib/ReactTestUtils';
import * as ShallowTestUtils from 'react-shallow-testutils';
import InlineEdit from '../../script/components/inlineEdit';
import {Link} from 'amazonui-react-elements/elements';
import {shallow, mount, render} from 'enzyme';

describe('InlineEdit', function() {
    describe('Inline Edit component loads', function() {
        beforeEach(function() {
           let shallowRenderer = TestUtils.createRenderer();
           shallowRenderer.render(<InlineEdit elementId="someId" currentValue="someValue"/>);
           this.inlineEdit = shallowRenderer.getRenderOutput();

           expect(this.inlineEdit).to.be.ok;
        });

        it('I should see Update link', function() {
            let links = ShallowTestUtils.findAllWithType(this.inlineEdit, Link);
            expect(links.length).to.be.equal(1);
            expect(links[0].props.children).to.be.equal("Update");
        });

        it('I should see content as text', function() {
            let spans = ShallowTestUtils.findAllWithType(this.inlineEdit, 'span');
            expect(spans.length).to.be.equal(1);
            expect(spans[0].props.children).to.be.equal("someValue");
        });
    });

    describe('Inline Edit\'s Update Button is clicked', function() {
        beforeEach(function() {
            this.inlineEdit = mount(<InlineEdit elementId="someId" currentValue="someValue"/>);
            expect(this.inlineEdit).to.be.ok;
            this.inlineEdit.find('Link').simulate('click');
        });

        it('I should see two links', function() {
            expect(this.inlineEdit.state('isEditing')).to.equal(true);
            expect(this.inlineEdit.find('Link').length).to.be.equal(2);
        });

        it('I should see the Save Link', function() {
            expect(this.inlineEdit.find('Link').at(1).text()).to.be.equal('Save');
        });

        it('I should see the Cancel Link', function() {
            expect(this.inlineEdit.find('Link').at(0).text()).to.be.equal('Cancel');
        });

        it('I should see the value in a text box', function() {
            expect(this.inlineEdit.find('input').length).to.be.equal(1);
            expect(this.inlineEdit.find('input').at(0).prop("value")).to.be.equal("someValue");
        });
    });

    describe('Inline Edit\'s Data is invalid', function() {
        const validateFunction=(value) => {
            if (value.length % 2 == 0)
                return "Even";
            else
                return null;
        };

        beforeEach(function() {
            this.inlineEdit = mount(<InlineEdit elementId="someId" currentValue="someValue" validateAction={validateFunction}/>);
            expect(this.inlineEdit).to.be.ok;
            this.inlineEdit.find('Link').simulate('click');
            this.inlineEdit.setProps({editedValue: "someValue"});
            this.inlineEdit.setProps({currentValue: "someOtherValue"});
            this.inlineEdit.find('input').simulate('change');
        });

        it('Error Message should should show up in Tooltip', function() {
            expect(this.inlineEdit.find(ReactToolTip).length).to.be.equal(1);
            expect(this.inlineEdit.find(ReactToolTip).props()['id']).to.be.equal('someId');
            expect(this.inlineEdit.find(ReactToolTip).props()['place']).to.be.equal('top');
            expect(this.inlineEdit.find(ReactToolTip).prop('getContent')[0].call()).to.be.equal('Even');
        });

        it('The text box should appear as error', function() {
            expect(this.inlineEdit.find('input').length).to.be.equal(1);
            expect(this.inlineEdit.find('input').hasClass('a-form-error')).to.equal(true);
        });

        it('The Save button should be unclickable', function() {
            expect(this.inlineEdit.find('Link').length).to.be.equal(2);
            expect(this.inlineEdit.find('Link').at(1).text()).to.be.equal('Save');
            expect(this.inlineEdit.find('Link').at(1).hasClass('disabled')).to.equal(true);
        });
    });

    describe('Inline Edit\'s Cancel Button is clicked', function() {
        beforeEach(function() {
            this.inlineEdit = mount(<InlineEdit elementId="someId" currentValue="someValue"/>);
            expect(this.inlineEdit).to.be.ok;
            this.inlineEdit.find('Link').simulate('click');
            this.inlineEdit.setProps({currentValue: "someValue"});
            this.inlineEdit.find('input').get(0).value = "someOtherValue";
            this.inlineEdit.find('Link').at(0).simulate('click');
        });

        it('I should see the update button', function() {
            expect(this.inlineEdit.state('isEditing')).to.equal(false);
            expect(this.inlineEdit.find('Link').at(0).text()).to.be.equal('Update');
        });
        it('The content should remain unchanged', function() {
            expect(this.inlineEdit.find('span').length).to.be.equal(1);
            expect(this.inlineEdit.find('span').text()).to.be.equal("someValue");
        });
    });

    describe('Inline Edit\'s Save Button is clicked', function() {
        beforeEach(function() {
            this.inlineEdit = mount(<InlineEdit elementId="someId" currentValue="someValue"/>);
            expect(this.inlineEdit).to.be.ok;
            this.inlineEdit.find('Link').simulate('click');
            this.inlineEdit.setState({currentValue: "someOtherValue"});
            this.inlineEdit.find('Link').at(1).simulate('click');
        });

        it('I should see the update button', function() {
            expect(this.inlineEdit.find('Link').length).to.be.equal(1);
            expect(this.inlineEdit.state('isEditing')).to.equal(false);
            expect(this.inlineEdit.find('Link').at(0).text()).to.be.equal('Update');
        });
        it('The content should be updated', function() {
            expect(this.inlineEdit.find('span').length).to.be.equal(1);
            expect(this.inlineEdit.find('span').text()).to.be.equal("someOtherValue");
        });
    });
});
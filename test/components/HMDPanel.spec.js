import sinon from 'sinon';
import {expect} from 'chai';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import HMDPanel from '../../script/components/HMDPanel';
import {Link} from 'amazonui-react-elements/elements';

const fakeLink = 'www.someFakeLink.com/fake';
const fakeText = 'I\'m the html...';
const fakeHtml = <span>{fakeText}</span>;

describe('HMDPanel', function () {
    describe('without elements embedded in document', function () {
        beforeEach(function () {
            this.panel = shallow(<HMDPanel />);
            expect(this.panel).to.have.length(1);
        });

        it('HMD Link is visible', function () {
            expect(this.panel.find(Link)).to.have.length(1);
        });

        it('should have the right link', function () {
            expect(this.panel.find(Link).props().url).to.equal('');
        });

        it('should have the right content', function () {
            expect(this.panel.find(Link).children().at(0).text()).to.be.equal('');
        });
    });

    describe('with elements embedded in document', function () {
        beforeEach(function () {
            this.stub = sinon.stub(document, 'getElementById').returns({
                href: fakeLink,
                innerHTML: fakeHtml
            });

            this.panel = shallow(<HMDPanel />);
            expect(this.panel).to.have.length(1);
        });

        afterEach(function () {
            this.stub.restore();
        });

        it('HMD Link is visible', function () {
            expect(this.panel.find(Link)).to.have.length(1);
        });

        it('should have the right link', function () {
            expect(this.panel.find(Link).props().url).to.equal(fakeLink);
        });

        it('should have the right content', function () {
            expect(this.panel.find(Link).children().at(0).text()).to.be.equal(fakeText);
        });
    });
});

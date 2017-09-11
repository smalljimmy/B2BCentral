import {expect} from "chai";
import React from "react";
import {shallow, mount, render} from 'enzyme';
import CardBody from '../../script/components/cardBody';
import {Box} from 'amazonui-react-elements/elements';

describe('CardBody', function () {
    before(function () {

        this.cardBody = shallow(<CardBody/>);
        expect(this.cardBody).to.be.ok;
    });

    it('The CardBody container should be visible', function () {
        expect(this.cardBody.find('.cardBody')).to.be.ok;
    });
});
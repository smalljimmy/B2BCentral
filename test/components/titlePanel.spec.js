import {expect} from "chai";
import React from "react";
import {shallow, mount, render} from 'enzyme';
import TitlePanel from '../../script/components/titlePanel';
import {Heading} from 'amazonui-react-elements/elements';

describe('TitlePanel', function () {
    before(function () {

        let heading = {
            width: 12,
            cssClass: '',
            level: 1,
        };

        this.panel = shallow(<TitlePanel heading={heading}/>);
        expect(this.panel).to.have.length(1);
    });

    it('The title heading is visible',function () {
        expect(this.panel.find(Heading)).to.have.length(1);
    });
});
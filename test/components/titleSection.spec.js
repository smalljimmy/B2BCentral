import {expect} from "chai";
import React from "react";
import {shallow, mount, render} from 'enzyme';
import TitleSection from '../../script/components/titleSection';
import HMDPanel from '../../script/components/HMDPanel';
import TitlePanel from '../../script/components/titlePanel';

describe('TitleSection', function () {
    before(function () {

        this.section = shallow(<TitleSection/>);
        expect(this.section).to.have.length(1);
    });

    it('The title panel is visible',function () {
        expect(this.section.find(TitlePanel)).to.have.length(1);
    });

    it('The HMD panel is visible',function () {
        expect(this.section.find(HMDPanel)).to.have.length(1);
    });
});
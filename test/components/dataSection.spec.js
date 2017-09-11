import {expect} from "chai";
import React from "react";
import sinon from 'sinon';
import TestUtils from "react-addons-test-utils";
import * as ShallowTestUtils from "react-shallow-testutils";
import DataSection from "../../script/components/dataSection";
import OverviewPanel from "../../script/components/overviewPanel";
import ContentPanel from "../../script/components/contentPanel";
import ActionPanel from "../../script/components/actionPanel";
import {staticManifest} from "../../script/mocks/manifest";
import {shallow, mount, render} from 'enzyme';
import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

describe('DataSection', function () {
    before(function () {
        this.dataSection = mount(<DataSection/>);

        expect(this.dataSection).to.be.ok;
    });


    it("the content panel should be visible", function () {
        let contentPanel = this.dataSection.find(ContentPanel);

        expect(contentPanel).to.be.ok;
    });
});

import {expect} from "chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import * as ShallowTestUtils from "react-shallow-testutils";
import B2BCentral from "../../script/components/b2bCentral";
import DataSection from "../../script/components/dataSection";
import TitleSection from "../../script/components/titleSection";
import {staticManifest} from "../../script/mocks/manifest";

describe('B2BCentral', function () {
    before(function () {
        this.manifest = staticManifest();

        let shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(<B2BCentral manifest={this.manifest}/>);
        this.b2bCentral = shallowRenderer.getRenderOutput();

        expect(this.b2bCentral).to.be.ok;
    });


    it("the product title section should be visible", function () {
        let titleSection = ShallowTestUtils.findWithType(this.b2bCentral, TitleSection);

        expect(titleSection).to.be.ok;
    });

    it("the product title section props are rendered", function () {
        let titleSection = ShallowTestUtils.findWithType(this.b2bCentral, TitleSection);

        expect(titleSection.props.titlePanel).to.equal(this.manifest.children[0].props.titlePanel);
    });

    it("the product data section should be visible", function () {
        let dataSection = ShallowTestUtils.findWithType(this.b2bCentral, DataSection);

        expect(dataSection).to.be.ok;
    });

    it("the product data section props are rendered", function () {
        let dataSection = ShallowTestUtils.findWithType(this.b2bCentral, DataSection);

        expect(dataSection.props.cards).to.equal(this.manifest.children[1].props.cards);
        expect(dataSection.props.overviewPanel).to.equal(this.manifest.children[1].props.overviewPanel);
        expect(dataSection.props.contentPanel).to.equal(this.manifest.children[1].props.contentPanel);
    });
});

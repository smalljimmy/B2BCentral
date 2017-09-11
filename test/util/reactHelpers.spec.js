import {assert, expect} from 'chai';
import sinon from 'sinon';
import {getDynamicChildren} from '../../script/util/reactHelpers.js';

describe('reactHelpers', function () {
    describe('getDynamicChildren', function () {
        it('should return null if type doesn\'t have createRenderableChildrenElements',function () {
            expect(getDynamicChildren({}, null)).to.be.null;
        });

        it('should call createRenderableChildrenElements on type if it exists',function () {
            let spy = sinon.spy();
            let type = {createRenderableChildrenElements: spy};
            getDynamicChildren(type, null);
            assert(spy.calledOnce);
        });
    });
});
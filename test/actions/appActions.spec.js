import {assert, expect} from 'chai';
import sinon from 'sinon';
import AppDispatcher from '../../script/dispatcher/appDispatcher';
import {AppConstants} from "../../script/constants/appConstants";
import {appMounted, isBelowTitle} from "../../script/actions/appActions";

describe('AppActions', function () {
    beforeEach(function () {
        this.AppDispatcherStub = sinon.stub(AppDispatcher, 'handleAction');
    });

    afterEach(function () {
        this.AppDispatcherStub.restore();
    });

    it('appMounted should dispatch the APP_MOUNTED message', function () {
        appMounted();

        assert(this.AppDispatcherStub.calledOnce);
        assert(this.AppDispatcherStub.calledWith({type: AppConstants.APP_MOUNTED}));
    });

    it('isBelowTitle should dispatch the BELOW_TITLE message', function () {
        isBelowTitle(false);

        assert(this.AppDispatcherStub.calledOnce);
        assert(this.AppDispatcherStub.calledWith({type: AppConstants.BELOW_TITLE, belowTitle: false}));
    });
});

import {assert, expect} from 'chai';
import sinon from 'sinon';
import AppDispatcher from '../../script/dispatcher/appDispatcher';

describe('AppActions', function () {
    beforeEach(function () {
        this.AppDispatcherStub = sinon.stub(AppDispatcher, 'dispatch');
    });

    afterEach(function () {
        this.AppDispatcherStub.restore();
    });

    it('handleAction should dispatch a message with source VIEW_ACTION', function () {
        let action = "Foo";
        AppDispatcher.handleAction(action);

        assert(this.AppDispatcherStub.calledOnce);
        assert(this.AppDispatcherStub.calledWith({
            source: 'VIEW_ACTION',
            action: action
        }));
    });

    it('handleServerAction should dispatch a message with source SERVER_ACTION', function () {
        let action = "Foo";
        AppDispatcher.handleServerAction(action);

        assert(this.AppDispatcherStub.calledOnce);
        assert(this.AppDispatcherStub.calledWith({
            source: 'SERVER_ACTION',
            action: action
        }));
    });
});

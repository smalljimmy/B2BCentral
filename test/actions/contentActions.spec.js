import {assert, expect} from 'chai';
import sinon from 'sinon';
import AppDispatcher from '../../script/dispatcher/appDispatcher';
import * as ContentActions from '../../script/actions/contentActions';

describe('ContentActions', function () {
    beforeEach(function () {
        this.AppDispatcherStub = sinon.stub(AppDispatcher, 'handleAction');
        this.AppDispatcherServerStub = sinon.stub(AppDispatcher, 'handleServerAction');
    });

    afterEach(function () {
        this.AppDispatcherStub.restore();
        this.AppDispatcherServerStub.restore();
    });

    it('contentMounted should dispatch the MOUNTED message', function () {
        ContentActions.contentMounted();

        assert(this.AppDispatcherStub.calledOnce);
        assert(this.AppDispatcherStub.calledWith({type: ContentActions.ContentActionTypes.MOUNTED}));
    });

    it('getCardsResponse should dispatch the CARD_DATA message', function () {
        let cards = {foo: "ASDF"};
        ContentActions.getCardsResponse(cards);

        assert(this.AppDispatcherServerStub.calledOnce);
        assert(this.AppDispatcherServerStub.calledWith({
            type: ContentActions.ContentActionTypes.CARD_DATA,
            cards: cards
        }));
    });

    it('focusCard should dispatch the FOCUS_CARD message', function () {
        let cardId = "fdsa";
        let isByScroll = true;
        ContentActions.focusCard(cardId, isByScroll);

        assert(this.AppDispatcherStub.calledOnce);
        assert(this.AppDispatcherStub.calledWith({
            type: ContentActions.ContentActionTypes.FOCUS_CARD,
            cardTitle: cardId,
            isByScroll: isByScroll
        }));
    });
});

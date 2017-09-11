import {Store} from 'flux/utils';
import {ContentActionTypes} from '../actions/contentActions';
import {namespaceCardId} from '../util/util';
import AppDispatcher from '../dispatcher/appDispatcher';

// TODO remove mocked up data for card

const _state = {
    selectedCard: '',
    cardFocusedByScroll: true,
};

/**
 * Class which stores the Inventory state.
 */
class ContentStore extends Store {
    /**
     * Constructs an instance of the ContentStore.
     * @param dispatcher&
     */
    constructor(dispatcher) {
        super(dispatcher);
        this.__onDispatch = this.__onDispatch.bind(this);
    }

    getState() {
        return _state;
    }

    getCards() {
        return _state.cards || [];
    }

    getSelectedCard() {
        return _state.selectedCard;
    }

    isCardFocusedByScroll() {
        return _state.cardFocusedByScroll;
    }

    _setSelectedCard(cardTitle) {
        if (cardTitle !== undefined && cardTitle !== _state.selectedCard) {
            _state.selectedCard = cardTitle;
            return true;
        }
        return false;
    }

    _setCardFocusedByScroll(isByScroll) {
        if (isByScroll !== undefined && isByScroll !== _state.cardFocusedByScroll) {
            _state.cardFocusedByScroll = isByScroll;
            return true;
        }
        return false;
    }

    _setCardsIfNecessary(cards) {
        // TODO: do a deep compare of _state.cards vs cards -- the !== does a reference compare, which is not right
        if (cards !== undefined && cards.length > 0 && _state.cards !== cards) {
            if (_state.selectedCard === '') {
                _state.selectedCard = namespaceCardId(cards[0].dataBindings.baseCardProps.title);
            }
            _state.cards = cards;
            this.__emitChange();
        }
    }

    /**
     * Callback that is executed when the AppDispatcher dispatches an action.
     * @param dispatch   The dispatch.
     * @private
     */
    __onDispatch(dispatch) {
        const action = dispatch.action;
        switch (action.type) {
            case ContentActionTypes.CARD_DATA: {
                const cards = action.cards;
                this._setCardsIfNecessary(cards);
                break;
            }
            case ContentActionTypes.FOCUS_CARD: {
                const selectedCardChanged = this._setSelectedCard(action.cardTitle);
                const byScrollChanged = this._setCardFocusedByScroll(action.isByScroll);

                // Only emit change if selectdCardTitle or cardFocusedByScroll has changed
                if (selectedCardChanged || byScrollChanged) {
                    this.__emitChange();
                }
                break;
            }
            default: {
                // no op
            }
        }
    }
}

/**
 * Create ContentStore singleton.
 * @type {ContentStore}
 */
const singleton = new ContentStore(AppDispatcher);

export default singleton;

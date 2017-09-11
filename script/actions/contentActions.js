import AppDispatcher from '../dispatcher/appDispatcher';

export const ContentActionTypes = {
    MOUNTED: 'CONTENT_PANEL_MOUNTED',
    CARD_DATA: 'CARD_DATA',
    FOCUS_CARD: 'FOCUS_CARD',
    CARD_ACTIVE: 'CARD_ACTIVE',
};

export function contentMounted() {
    AppDispatcher.handleAction({
        type: ContentActionTypes.MOUNTED,
    });
}

export function getCardsResponse(cards) {
    AppDispatcher.handleServerAction({
        type: ContentActionTypes.CARD_DATA,
        cards,
    });
}

export function focusCard(cardId, isByScroll) {
    AppDispatcher.handleAction({
        type: ContentActionTypes.FOCUS_CARD,
        cardTitle: cardId,
        isByScroll,
    });
}

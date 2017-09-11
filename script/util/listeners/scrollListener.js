import {namespaceCardId, checkObjectHasProperty} from '../util';
import ContentStore from '../../stores/contentStore';

function mapCardIds(cards) {
    return cards.map((card) => {
        return namespaceCardId(card.baseCardProps.title);
    });
}

function pageScrollListener(e, isBelowTitle) {
    const dataSection = document.getElementById('b2bCent-dataSection');
    // TODO: Can we share this between JS and CSS?
    const fixedHeaderBufferPixels = 10;
    // If we are below the Title make sure the detailSection is fixed
    if (dataSection.getBoundingClientRect().top < fixedHeaderBufferPixels) {
        isBelowTitle(true);
    }
    // If we are at the top of the page make sure the detailSection is not fixed
    else if (dataSection.getBoundingClientRect().top > fixedHeaderBufferPixels) {
        isBelowTitle(false);
    }
}

function scrollIfNecessary(cardId, focusCard) {
    const card = document.getElementById(cardId);
    const selectedCard = ContentStore.getSelectedCard();
    const userHasScrolled = true;

    if (card.getBoundingClientRect().top > 0) {
        if (cardId !== selectedCard) {
            focusCard(cardId, userHasScrolled);
        }
        return true;
    }
    return false;
}

function contentScrollListener(e, cards, focusCard) {
    const cardIds = (cards !== undefined && cards.length > 0) ? mapCardIds(cards) : [];

    // Select Cards (Scrollspy)
    for (const idx in cardIds) {
        if (checkObjectHasProperty(cardIds, idx)) {
            const cardId = cardIds[idx];
            if (scrollIfNecessary(cardId, focusCard)) {
                break;
            }
        }
    }
}

/**
 * Listens to the scroll event on the window and
 * notifies components based on the contentPanel position
 * @param cards The cards to which the page can be scrolled.
 * @param focusCard The card to which the page should be scrolled.
 */
export function bindContentScrollListener(cards, focusCard) {
    if (cards !== undefined && cards !== null && cards.length > 0) {
        const closure = (e) => {
            contentScrollListener(e, cards, focusCard);
        };
        window.removeEventListener('scroll', closure);
        window.addEventListener('scroll', closure);
    }
}

/**
 * Listens to the scroll event on the window and notifies components based on the full page position
 * @param isBelowTitle
 */
export function bindPageScrollListener(isBelowTitle) {
    const closure = (e) => {
        pageScrollListener(e, isBelowTitle);
    };
    window.removeEventListener('scroll', closure);
    window.addEventListener('scroll', closure);
}

import React from 'react';
import ContentStore from '../stores/contentStore';
import {focusCard} from '../actions/contentActions';
import {animateScroll} from '../util/animate.js';
import {namespaceCardId} from '../util/util.js';
import Card from './card';
import CardStoreBuilder from '../stores/cardStoreBuilder';
import CardActions from '../actions/cardActions';
import {GridRow, GridColumn} from 'amazonui-react-elements/elements';

/**
 * Class representing the panel section of the page for the main content of the page.
 *
 * Contains the Cards.
 */
export default class ContentPanel extends React.PureComponent {
    /**
     * Constructs an instance of ContentPanel with props.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedCard: ContentStore.getSelectedCard(),
        };

        this._renderCards = this._renderCards.bind(this);
    }

    componentDidMount() {
        // If we have cards, select the first one
        if (this.props.cards && this.props.cards.length > 0) {
            const firstCardId = namespaceCardId(this.props.cards[0].baseCardProps.title);
            const activateNavTab = true;
            focusCard(firstCardId, activateNavTab);
        }
    }

    _shouldCardBeFocused(card) {
        return namespaceCardId(card.baseCardProps.title) === this.state.selectedCard;
    }

    _renderCards(cards) {
        if (cards === undefined || cards === null) {
            return null;
        }

        return cards.map((card) => {
            const title = card.baseCardProps.title;
            const store = CardStoreBuilder.build(card.dataBindings);
            const actions = new CardActions(title, card.dataBindings);
            return (
                <GridRow key={card.key}>
                    <GridColumn gridUnits={card.baseCardProps.width} widescreenGridUnits={card.baseCardProps.width}>
                        <Card
                            key={title}
                            store={store}
                            actions={actions}
                            {...card}
                            isFocused={this._shouldCardBeFocused(card)}
                        />
                    </GridColumn>
                </GridRow>
            );
        });
    }

    /**
     * Renders the ContentPanel component.
     *
     * @returns {XML}
     */
    render() {
        return (<div>{this._renderCards(this.props.cards)}</div>);
    }
}

/**
 * ContentPanel proptypes provide type validation on props.
 *
 * @type {{cards: card objects to render}}
 */
ContentPanel.propTypes = {
    cards: React.PropTypes.array,
};

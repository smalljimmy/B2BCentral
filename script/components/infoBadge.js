import React from 'react';
import {Box, Heading} from 'amazonui-react-elements/elements';
import Badge from './badge';
import Menu from './menu';
import MenuItem from './menuItem';

/**
 * Class representing the header section of a card.
 *
 * Contains the title, updated date, and actions for the card.
 */
export default class InfoBadge extends React.PureComponent {   

    /**
     * Renders the InfoBadge component.
     *
     * @returns {XML}
     */
    render() {
        const onClick = (ev) => {
            ev.preventDefault();
            window._sellerPartnerAthena.register('b2b-central', 'card-info-icons');
            window._sellerPartnerAthena.summon();
            window._sellerPartnerAthena.displayHelpArticle(props.topicId);
        };
        return (<span className="info">
        <a href='#' onClick={onClick}><i className='icon info'></i></a>
        </span>);
    }
}

/**
 * CardHeader proptypes provide type validation on props.
 */
InfoBadge.propTypes = {
    titleId: React.PropTypes.string,
};

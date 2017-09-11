import React from 'react';
import {Box, Heading} from 'amazonui-react-elements/elements';
import Badge from './badge';
import Menu from './menu';
import InfoBadge from './infoBadge';
import MenuItem from './menuItem';
import StringUtil from "../util/stringUtil";

/**
 * Class representing the header section of a card.
 *
 * Contains the title, updated date, and actions for the card.
 */
export default class CardHeader extends React.PureComponent {
    _getSelectedClass(selected) {
        return selected ? 'selected' : '';
    }    

    /**
     * Renders the CardHeader component.
     *
     * @returns {XML}
     */
    render() {
        const badgeComponent = this.props.badge ? (
                <Badge
                    content={this.props.badge.content}
                    type={this.props.badge.type}
                    isCardHeaderBadge
                />
            ) : null;
            
        const infoBadge = this.props.topicId ? (
        		<InfoBadge topicId={this.props.topicId}/>
        	) : null;

        // TODO: localize the date format?
        const updatedDateFormat = 'M/D/YY h:mm A z';
        const updatedValue = this.props.updated.value ?
            this.props.updated.value.format(updatedDateFormat) : '';

        const toggleCardBodyText = this.props.cardBodyIsVisible ?
        		StringUtil.getString('b2bcentral_desktop_menu_minimize') : StringUtil.getString('b2bcentral_desktop_menu_maximize');
        const rateCardText=StringUtil.getString('b2bcentral_desktop_menu_rate');
        const refreshCardText=StringUtil.getString('b2bcentral_desktop_menu_refresh');

        const toggleCardBodyIcon = this.props.cardBodyIsVisible ? 'icon minus' : 'icon plus';
        return (
            <Box cssClass="cardHeader">
                <Heading headingLevel={2}>
                    {this.props.title}
                    {infoBadge}
                    {badgeComponent}
                </Heading>
                <p>{this.props.updated.label} {updatedValue}</p>
                <Menu className="card-actions">
                    <MenuItem
                        action={this.props.toggleCardBodyCallback}
                        className={this._getSelectedClass(this.props.cardBodyIsVisible)}
                        ref="toggle-card-body-menu-item"
                    >
                        <span>{toggleCardBodyText}</span>
                        <i className={toggleCardBodyIcon}></i>
                    </MenuItem>
                    <MenuItem
                        action={this.props.rateCallback}
                        ref="rate_review"
                    >
                        <span>{rateCardText}</span>
                        <i className="icon rate_review" ref="graph-icon"></i>
                    </MenuItem>                    
                    
                    <MenuItem action={this.props.refreshCallback}>
                        <span>{refreshCardText}</span>
                        <i className="icon refresh"></i>
                    </MenuItem>                    
                </Menu>
            </Box>
        );
    }
}

/**
 * CardHeader proptypes provide type validation on props.
 */
CardHeader.propTypes = {
    title: React.PropTypes.string,
    cardBodyIsVisible: React.PropTypes.bool,
    toggleCardBodyCallback: React.PropTypes.func,
    refreshCallback: React.PropTypes.func,
    hasGraph: React.PropTypes.bool,
    toggleGraphCallback: React.PropTypes.func,
    rateCallback: React.PropTypes.func,
    badge: React.PropTypes.shape({
        content: React.PropTypes.string,
        type: React.PropTypes.string,
        visible: React.PropTypes.bool,
    }),
    updated: React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.object,
    }),
};

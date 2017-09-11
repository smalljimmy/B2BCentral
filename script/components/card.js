import React from 'react';
import Moment from 'moment';
import{ fromJS } from 'immutable';
import {BoxGroup} from 'amazonui-react-elements/elements';
import CardBody from './cardBody';
import CardHeader from './cardHeader';
import GraphContainer from './graph/graphContainer';
import {slideToggle} from '../util/animate.js';
import {namespaceCardId} from '../util/util.js';
import {Container} from 'amazonui-react-elements/elements';
import SnapshotBuilder from './snapshot/snapshotBuilder';
import {getDynamicChildren} from '../util/reactHelpers';
import {checkObjectHasProperty, setHeightToParent, RequestStatus} from '../util/util';
import GuideContainer from './guideContainer';
import StringUtil from "../util/stringUtil";
import ActionCenter from './actionCenter';

/**
 * Class which displays the detail information.
 * THIS IS A PLACEHOLDER FOR A CLASS THAT CAN BE EXTENDED LATER BY CARD INSTANCES
 */
export default class Card extends React.PureComponent {
    /**
     * Constructs an instance of the Card component.
     * @param props
     */
    // eslint-disable-next-line max-statements
    constructor(props) {
        super(props);

        this._listeners = [];
        this._store = props.store;
        this.state = {
        	title: props.baseCardProps.title,
            data: fromJS(this._store.get()) || fromJS({}),
            bodyShown: this._loadAttrFromCookie('bodyShown', true),
            updated: {
                label: props.baseCardProps.updatedDateLabel ? props.baseCardProps.updatedDateLabel.updating : null,
                value: null,
            },
            badge: null,
        };
        
        this.actions = props.actions;

        this._onStoreChanged = this._onStoreChanged.bind(this);
        this._toggleBody = this._toggleBody.bind(this);
        this._rateCard = this._rateCard.bind(this);
        this._refreshCardData = this._refreshCardData.bind(this);
        this._toggleGraph = this._toggleGraph.bind(this);
        this._buildCssClass = this._buildCssClass.bind(this);
        this._buildHeader = this._buildHeader.bind(this);
        
        //registry for child components
        this.renderableChildren = {GuideContainer, GraphContainer, ActionCenter};
        
        this._saveAttrInCookie = this._saveAttrInCookie.bind(this);
        this._loadAttrFromCookie = this._loadAttrFromCookie.bind(this);
        
        this._renderChildrenFromManifest = this._renderChildrenFromManifest.bind(this);
    }

    /**
     * Binds a listeners to Flux data stores
     * then invokes an action indicating that the component has mounted.
     */
    componentDidMount() {
        this._listeners = this._store.generateListeners(this.props.dataBindings, this._onStoreChanged);
        this.actions.mounted();
    }

    componentWillUnmount() {
        this._listeners.forEach((listener) => {
            listener.remove();
        });
    }

    _renderChildrenFromManifest() {
        return this.props.children.map((childElement) => {
            if (checkObjectHasProperty(this.renderableChildren, childElement.type)) {
                const type = this.renderableChildren[childElement.type];
                var props = childElement.props;
                Object.keys(this.state).forEach(function(key) { props[key] = this.state[key]}, this);
                props.refreshData = this._refreshCardData;
                
                return React.createElement(type, props, getDynamicChildren(type, childElement));
            }
            return null;
        });
    }
    
    _saveAttrInCookie(attrName, attrValue) {
        let fullName = `$(this.props.baseCardProps.title)-${attrName}`;
    	
    	//persist the status in browser's local storage
        localStorage[fullName] = JSON.stringify(attrValue);
    }
    
    _loadAttrFromCookie(attrName, defaultValue) {    	
    	let fullName = `$(this.props.baseCardProps.title)-${attrName}`;
    	
        if (!localStorage[fullName]) {
            localStorage[fullName] = JSON.stringify(defaultValue);
        }
        return JSON.parse(localStorage[fullName]);
    }
    

    /**
     * Callback that is executed when the store has emitted a change event.
     * @private
     */
    _onStoreChanged(key) {
        const update = {data: fromJS({})};
        const value = this._store.get(key);
        update.data = update.data.set(key, value);
        update.updated = {
            label: this.props.baseCardProps.updatedDateLabel.lastUpdated,
            value: Moment(),
        };
        this.setState(update);
    }

    /**
     * Callback that is executed when the refresh icon has been clicked.
     * @private
     */
    _refreshCardData(queryName = '', queryParam = {}) {
        this.actions.refreshData(queryName, queryParam);
    }

    /**
     * Callback that is executed when the minimize card icon has been clicked.
     * @private
     */
    _toggleBody() {
        const cardBodyElem = `#${namespaceCardId(this.props.baseCardProps.title)} .cardBody`;
        const slideToggleMillis = 250;
        slideToggle(cardBodyElem, slideToggleMillis, 'ease-out', () => {
        	this._saveAttrInCookie('bodyShown', !this.state.bodyShown);
            this.setState({bodyShown: !this.state.bodyShown});
        });
    }

    /**
     * Toggle whether the graph is visible or not for this card.
     * @private
     */
    _toggleGraph() {
    	this._saveAttrInCookie('graphShown', !this.state.graphShown);
        this.setState({graphShown: !this.state.graphShown});
    }
    
    /**
     * Callback that is executed when the rate this card icon has been clicked.
     * @private
     */
    _rateCard() {
        const hmdName = this.props.baseCardProps.hmdName;
        newwindow=window.open('/gp/satisfaction/survey-form.html?ie=UTF8&HMDName='+hmdName,StringUtil.getString('b2bcentral_desktop_menu_rate'),'height=510,width=350');
        if (window.focus) {newwindow.focus()}
        return false;
    }

    _buildCardHeaderBadge() {
        const badgeKey = this.props.baseCardProps.badge;
        if (this.state.data.has(badgeKey)
        		&& this.state.data.get(badgeKey).requestStatus 
        		=== RequestStatus.SUCCESS) {
        	this.setState({badge: this.state.data.get(badgeKey)});
        }
    }

    _buildHeader() {
        const baseCardProps = this.props.baseCardProps;
        this._buildCardHeaderBadge();
        return (
            <CardHeader
                {...baseCardProps}
                cardBodyIsVisible={this.state.bodyShown}
                toggleCardBodyCallback={this._toggleBody}
                refreshCallback={this._refreshCardData}
                toggleGraphCallback={this._toggleGraph}
                rateCallback={this._rateCard}
                badge={this.state.badge}
                updated={this.state.updated}
            />
        );
    }

    _buildCssClass() {
        const minimizedClass = this.state.bodyShown ? '' : 'minimized';
        const activeClass = this.props.isFocused ? 'active' : '';
        return `b2bCent-card a-spacing-top-medium ${minimizedClass} ${activeClass}`;
    }
    
    /**
     * Renders the Card component.
     * @returns {XML}
     */
    render() {
        const title = this.props.baseCardProps.title;

        const cardHeader = this._buildHeader();

        return (
            <BoxGroup id={namespaceCardId(title)} cssClass={this._buildCssClass()}>
                {cardHeader}
                <CardBody>
                    {this._renderChildrenFromManifest(this.props.children)}
				</CardBody>
			</BoxGroup>
        );
    }
}

/**
 * Card proptypes provide type validation on props
 *
 *  title: The title of the card, to be displayed at the top of the card
 *  updatedDate: An object to display the last updated date for the card
 *      label: The text to put before the last update date
 *      value: The object representing the date.
                Expected to be a MomentJS object so it can be modified/formatted.
 */
Card.propTypes = {
    baseCardProps: React.PropTypes.object,
    topicId: React.PropTypes.string,
    isFocused: React.PropTypes.bool,
    legacy: React.PropTypes.object,
    title: React.PropTypes.string,
    dataBindings: React.PropTypes.shape({
        title: React.PropTypes.string,
    }),
    store: React.PropTypes.object,
    actions: React.PropTypes.object,
};

Card.contextTypes = {
    weblabProvider: React.PropTypes.object,	
};

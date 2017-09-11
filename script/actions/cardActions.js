import RequestActionBuilder from './requestActionBuilder';
import {getHttpResponse} from '../services/httpRequestApi';
import {checkObjectHasProperty} from '../util/util';
import AppDispatcher from '../dispatcher/appDispatcher';

export const CardActionTypes = {
    FOCUS: 'FOCUS',
    MOUNTED: 'CARD_MOUNTED',
    REQUEST: 'REQUEST',
    RESPONSE: 'RESPONSE',
};

/**
 * Actions available to the cards.
 */
export default class CardActions {
    constructor(title, bindings) {
        this.cardTitle = title;
        this.bindings = bindings;
        this.requestActionsBuilt = false;
        this.requestActions = {};
        this.requestActionBuilder = new RequestActionBuilder(AppDispatcher, getHttpResponse);

        this.mounted = this.mounted.bind(this);
        this._buildRequestActions = this._buildRequestActions.bind(this);
    }

    /**
     * Should be called when the underlying component has been mounted.
     * Starts retrieval of all data.
     */
    mounted() {
        this._requestAllBindings();
    }

    /**
     * Re-retrieves all data for this object.
     */
    refreshData(queryName, queryParam = {}) {
    	if (queryName) {
    		this._requestBinding(queryName, queryParam);
    	} else {
    		this._requestAllBindings();
    	}
    }
    
    _requestBinding(queryName, queryParam) {
        if (!this.requestActionsBuilt) {
            this._buildRequestActions();
        }
 
        if (this.requestActions !== undefined && Object.keys(this.requestActions).length > 0) {
            if (checkObjectHasProperty(this.requestActions, queryName)) {
                this.requestActions[queryName](queryParam);
            }
        }
    }

    _requestAllBindings() {
        if (!this.requestActionsBuilt) {
            this._buildRequestActions();
        }

        if (this.requestActions !== undefined && Object.keys(this.requestActions).length > 0) {
            for (const key in this.requestActions) {
                if (checkObjectHasProperty(this.requestActions, key)) {
                    this.requestActions[key]();
                }
            }
        }
    }

    _buildRequestActions() {
        if (this.bindings !== undefined && this.bindings !== null) {
            Object.keys(this.bindings).forEach((binding) => {
            	const endPoint = this.bindings[binding].endPoint;
                const queryName = this.bindings[binding].queryName;

                if (endPoint !== undefined && queryName !== undefined) {
                    this.requestActions[queryName] = this.requestActionBuilder.build(endPoint, queryName);
                }
            });
        }
        this.requestActionsBuilt = true;
    }
}

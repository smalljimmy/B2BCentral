import {Store} from 'flux/utils';
import {checkObjectHasProperty} from '../util/util';
import {CardActionTypes} from '../actions/cardActions';
import * as Util from "../util/util";

export default class CardStore extends Store {
    /**
     * Create an instance of ContentStore for a given state.
     *
     * For static keys, internal state is initialized.
     * For databound keys, listeners are built and registered.
     * @param state A set of keyed data properties the ContentStore will manage.
     */
    constructor(dispatcher, state) {
        super(dispatcher);

        this._state = state;
        this.generateListeners = this.generateListeners.bind(this);
    }

    /**
     * Gets the value of the given key.
     * null if key does not exist.
     * @param key The key to retrieve
     * @returns {*}
     */
    get(key) {
        // return all state values if null
        if (key === undefined || key === null) {
            return this._state;
        }

        // if state has key, return it's value
        if (checkObjectHasProperty(this._state, key)) {
            return this._state[key];
        }

        return null;
    }

    /**
     * Adds a listener to the store, firing the given callback when the given key changes.
     * @param key The key to watch for changes on.
     * @param callback The function to fire when there are changes.
     */
    addListener(key, callback) {
        return this.__emitter.addListener(key, callback);
    }

    /**
     * Generates listeners for all the given bindings.
     * @param bindings The bindings to generate listeners for
     * @param callback The function to fire when there are changes
     */
    generateListeners(bindings, callback) {
        const listeners = [];
        for (const key in bindings) {
            if (checkObjectHasProperty(bindings, key)) {
                const binding = bindings[key];
                if (checkObjectHasProperty(binding, 'queryName')) {
                    const listener = this.addListener(binding.queryName, () => {
                        callback(binding.queryName);
                    });
                    listeners.push(listener);
                }
            }
        }
        return listeners;
    }

    __emitChange(key) {
        this.__changeEvent = key;
        super.__emitChange();
    }

    __onDispatch(payload) {
        const action = payload.action;
        if (checkObjectHasProperty(this._state, action.queryName) &&
            action.verb === CardActionTypes.RESPONSE) {
            
            let data = action.data || {};
            data.requestStatus = action.type;
            
            this._state[action.queryName] = data;
            this.__emitChange(action.queryName);

        }
    }
}

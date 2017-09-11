import CardStore from './cardStore';
import {checkObjectHasProperty} from '../util/util';
import AppDispatcher from '../dispatcher/appDispatcher';

/**
 * Factory for generic CardStores.
 */
class CardStoreBuilder {
    constructor(dispatcher) {
        this._dispatcher = dispatcher;
    }

    /**
     * Builds and returns a new cardstore.
     * @param dataBindings The data bindings for the card.
     * @returns {CardStore}
     */
    build(dataBindings) {
        if (dataBindings === undefined || dataBindings === null) {
            return undefined;
        }

        const queryState = {};
        for (const key in dataBindings) {
            if (checkObjectHasProperty(dataBindings, key)) {
                const binding = dataBindings[key];
                if (checkObjectHasProperty(binding, 'queryName')) {
                    queryState[binding.queryName] = {};
                }
            }
        }

        return new CardStore(this._dispatcher, queryState);
    }
}

const singleton = new CardStoreBuilder(AppDispatcher);
export default singleton;

import {ResponseType} from '../services/httpRequestApi';
import {CardActionTypes} from './cardActions';
import * as Util from "../util/util";

/**
 * Builds action to get data from service and dispatch the results to stores.
 */
export default class RequestActionBuilder {
    /**
     * Constructs a new builder with  that is ready to build actions.
     *
     * @param dispatcher the dispatcher to fire the action on
     * @param apiCallback callback that will retrieve the data
     */
    constructor(dispatcher, apiCallback) {
        this.dispatcher = dispatcher;
        this.apiCallback = apiCallback;

        this.build = this.build.bind(this);
    }

    /**
     * Builds the action to retrieve data and the dispatches the response to the store.
     *
     * @param endPoint url for the controller which serves the query
     * @param queryName path to the desired query
     * @param errorCallback callback fired when the apiCallback has an error
     * @returns {function()}
     */
    build(endPoint, queryName) {
        const success = (data) => {
            this.dispatcher.handleServerAction({
                queryName,
                verb: CardActionTypes.RESPONSE,
                data: JSON.parse(data),
                type: Util.RequestStatus.SUCCESS,
            });
        };
        
        const error = (data) => {
            this.dispatcher.handleServerAction({
                queryName,
                verb: CardActionTypes.RESPONSE,
                data: {},
                type: Util.RequestStatus.FAILURE,
            });
            
        };

        return (params) => {
            let resource = `${endPoint}/${queryName}`;
            this.apiCallback(resource, success, error, ResponseType.JSON, params);
        };
    }
}

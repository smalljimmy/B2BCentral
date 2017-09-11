import {ReduceStore} from "flux/utils";
import AppDispatcher, {AppDispatch} from "../dispatch/appDispatcher";
import {OrderMetricsConstants} from "../action/orderMetricsAction";
import * as Immutable from "immutable";
import * as Util from '../util/Util';

export class OrderMetricsState {
    
}

export default class OrderMetricsStore extends ReduceStore<OrderMetricsState, AppDispatcher> {
    getInitialState() {

        let orderMetricsData = {
            requestStatus: Util.RequestStatus.PENDING,
            metrics: Immutable.List.of([])
        };

        return {
            orderMetricsData: orderMetricsData
        };
    }

    reduce(state, dispatch) {
        switch (dispatch.action.type) {
            case OrderMetricsConstants.ORDER_METRICS_DATA_SUCCESS: {
                let orderMetricsData = JSON.parse(dispatch.action.data);
                return {
                    orderMetricsData: orderMetricsData
                };
            }
            case OrderMetricsConstants.ORDER_METRICS_DATA_ERROR: {
                let orderMetricsData = { 
                    ...Object(state.orderMetricsData),
                    requestStatus: Util.RequestStatus.FAILURE, 
                };
                return {
                    orderMetricsData: orderMetricsData,
                };
            }
            default:
                return state;
        }
    }
}
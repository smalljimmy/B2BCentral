import React from 'react';
import {CarouselHeading, CarouselContent, CarouselElement} from 'amazonui-react-elements/elements';
import {GridRow} from 'amazonui-react-elements/elements';
import {BoxGroup, Box} from 'amazonui-react-elements/elements';
import {createSnapShotJson} from './graph/staticSalesProps';
import {formatNumberShort, formatAsCurrencyShort, formatNumberToFixed} from '../util/formatter';
import {KPIConstants} from '../constants/salesConstants';
import Immutable from 'immutable';
import StringUtil from "../util/stringUtil";
import * as Util from "../util/util";
/**
 * Class representing the panel section of the page for the welcome banner.
 */
export default class Carousel extends React.PureComponent {

    constructor(props) {
        super(props);
        
        this._listeners = [];
        this._store = props.store;
        this.actions = props.actions;
        
        this._onStoreChanged = this._onStoreChanged.bind(this);

        this.state = {
            snapshotData: undefined,
            requestStatus: Util.RequestStatus.PENDING,
        };
    }

    componentDidMount() {
        this._listeners = this._store.generateListeners(this.props.dataBindings, this._onStoreChanged);
        this.actions.mounted();
    }

    componentWillUnmount() {
        this._listeners.forEach((listener) => {
            listener.remove();
        });
    }
     
    /**
     * Callback that is executed when the store has emitted a change event.
     * 
     * @private
     */
    _onStoreChanged(key) {
        const data = this._store.get(key);
        
        const snapshotData = (data.requestStatus === Util.RequestStatus.SUCCESS) ? createSnapShotJson(data) : null;

        this.setState({
            snapshotData: snapshotData,
            requestStatus: data.requestStatus,
        });  
    }    

    /**
     * Renders the TitlePanel component.
     * 
     * @returns {XML}
     */
    render() {
        const snapshotData = this.state.snapshotData;
        
        var floor = Math.floor;
        
        return (
                <div>
                     <CarouselContent>
                        <CarouselElement cssClass="carouselElement">
                            <BoxGroup>
                                <Box cssClass="cardBody a-spacing-top-medium">
                                    <GridRow cssClass="a-color-secondary">
                                    	{StringUtil.getString('b2bcentral_desktop_kpi_1')}
                                    </GridRow>
                                    <GridRow cssClass="a-size-extra-large a-color-base a-spacing-top-mini">
                                        {snapshotData ? formatAsCurrencyShort(snapshotData[KPIConstants.PRODUCT_SALES].b2b) : null }
                                    </GridRow>
                                </Box>
                            </BoxGroup>
                        </CarouselElement>
                        <CarouselElement cssClass="carouselElement">
                            <BoxGroup>
                                <Box cssClass="cardBody a-spacing-top-medium">
                                <GridRow cssClass="a-color-secondary">
                                	{StringUtil.getString('b2bcentral_desktop_kpi_2')}
                                </GridRow>
                                <GridRow cssClass="a-size-extra-large a-color-base a-spacing-top-mini">
                                	{snapshotData ? formatNumberShort(floor(snapshotData[KPIConstants.TOTAL_ORDERS].b2b)) : null }
                                </GridRow>
                                </Box>
                            </BoxGroup>
                        </CarouselElement>
                        <CarouselElement cssClass="carouselElement">
                            <BoxGroup>
                                <Box cssClass="cardBody a-spacing-top-medium">
                                    <GridRow cssClass="a-color-secondary">
                                    	{StringUtil.getString('b2bcentral_desktop_kpi_3')}
                                    </GridRow>
                                     <GridRow cssClass="a-size-extra-large a-color-base a-spacing-top-mini">
                                     	{snapshotData ? formatNumberToFixed(snapshotData[KPIConstants.AVG_UNITS_PER_ORDER].b2b, 2) : null }
                                    </GridRow>
                                 </Box>
                             </BoxGroup>
                        </CarouselElement>
                    </CarouselContent>
                </div>
        );
    }
}

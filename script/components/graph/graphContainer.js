import * as FluxUtils from "flux/utils";
import React from 'react';
import Moment from 'moment';
import Container from 'amazonui-react-elements/elements/container';
import Section from 'amazonui-react-elements/elements/section';
import GridColumn from 'amazonui-react-elements/elements/grid-column';
import GridRow from 'amazonui-react-elements/elements/grid-row';
import Link from 'amazonui-react-elements/elements/link';
import DataSetDisplay from './dataSetDisplay';
import DateRangeSelector from './dateRangeSelector';
import Plot from './plot';
import GraphSelectorButtonGroup from './graphSelectorButtonGroup';
import Immutable from 'immutable';
import SnapshotBuilder from '../snapshot/snapshotBuilder';
import CardNotificationBox from '../cardNotificationBox';
import {checkObjectHasProperty} from '../../util/util';
import StringUtil from "../../util/stringUtil";
import * as Util from "../../util/util";
import {createSalesJson} from './staticSalesProps';

function _temporaryGetPlotLines(graphName) {
	const b2bTitle = StringUtil.getString('b2bcentral_desktop_sales_graph_10');
	const b2cTitle = StringUtil.getString('b2bcentral_desktop_sales_graph_11');
	const overallTitle = StringUtil.getString('b2bcentral_desktop_sales_graph_12');
	
	const salesGraphName = StringUtil.getString('b2bcentral_desktop_sales_graph_2');
	const unitsGraphName = StringUtil.getString('b2bcentral_desktop_sales_graph_3');	
	
	graphName = (typeof graphName !== 'undefined') ?  graphName : salesGraphName;
	
    let plotLines = [
        {id: 'b2b_sales', title: b2bTitle, isActive: (graphName == salesGraphName), isShown: (graphName == salesGraphName)},
        {id: 'b2c_sales', title: b2cTitle, isActive: false, isShown: (graphName == salesGraphName)},
        {id: 'overall_sales', title: overallTitle, isActive: false, isShown:false},
        
        {id: 'b2b_units', title: b2bTitle, isActive: (graphName == unitsGraphName), isShown: (graphName == unitsGraphName)},
        {id: 'b2c_units', title: b2cTitle, isActive: false, isShown: (graphName == unitsGraphName)},
        {id: 'overall_units', title: overallTitle, isActive: false, isShown: false},
        
        {id: 'b2b_orders', title: b2bTitle, isActive: false, isShown: false},
        {id: 'b2c_orders', title: b2cTitle, isActive: false, isShown: false},
        {id: 'overall_orders', title: overallTitle, isActive: false, isShown: false},
     ];

    return Immutable.fromJS(plotLines);
}

function _temporaryGetDateRanges() {
    return Immutable.fromJS([
        {title: StringUtil.getString('b2bcentral_desktop_sales_graph_4'), offset: Moment.duration(Moment().diff(Moment().startOf('day')))},
        {title: StringUtil.getString('b2bcentral_desktop_sales_graph_5'), offset: Moment.duration(7, 'days')},
        {title: StringUtil.getString('b2bcentral_desktop_sales_graph_6'), offset: Moment.duration(30, 'days')},
        {title: StringUtil.getString('b2bcentral_desktop_sales_graph_7'), offset: Moment.duration(6, 'months')},
        {title: StringUtil.getString('b2bcentral_desktop_sales_graph_8'), offset: Moment.duration(1, 'years')},
    ]);
}

function _temporaryGetGraphs() {
    return [
            StringUtil.getString('b2bcentral_desktop_sales_graph_2'), //Sales
            StringUtil.getString('b2bcentral_desktop_sales_graph_3'), //Units
            ];
}

/**
 * Class representing the graph of sales data (in a card).
 *
 */
export default class GraphContainer extends React.Component {
    /**
     * Constructs an instance of GraphContainer with props.
     * @param props
     */
    // eslint-disable-next-line max-statements
    constructor(props) {
        super(props);
        const maxDate = Moment();
        const minDate = maxDate.clone().subtract(1, 'y');
        
        // default graph to show 1 week of data
        const dateRange = Immutable.fromJS({
            from: maxDate.clone().subtract(7, 'days'),
            to: maxDate,
        });

        this.state = {
            minDate,
            maxDate,
            presetDateRanges: _temporaryGetDateRanges(),
            dateRange,
            selectedGraph: _temporaryGetGraphs()[0],
            plotLines: _temporaryGetPlotLines(),
            focusedPlotLine: undefined,
            graphs: _temporaryGetGraphs(),
            graphSalesData: Immutable.fromJS([]),
            metricName: '',
            requestStatus: Util.RequestStatus.PENDING,
        };

        this._onCheckboxToggleChange = this._onCheckboxToggleChange.bind(this);
        this._onToggleGraphsClick = this._onToggleGraphsClick.bind(this);
        this._onCheckboxMouseEnter = this._onCheckboxMouseEnter.bind(this);
        this._onCheckboxMouseLeave = this._onCheckboxMouseLeave.bind(this);
        this._handleDateChanged = this._handleDateChanged.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        
    	if (!this.props.data.equals(nextProps.data)) {    	
	        const endDate = this.state.dateRange.get('to');
	        const fromDate = this.state.dateRange.get('from');
	        const isToday = endDate.diff(fromDate, 'days', true) <= 1;
	        
	        if (nextProps.data.has('orderMetrics/hourly') 
	                && isToday
	                || nextProps.data.has('orderMetrics') && !isToday) {
	        
	            var metricName = isToday ? 'orderMetrics/hourly' : 'orderMetrics';
	            
	            const graphSalesData = createSalesJson(nextProps.data, metricName, fromDate, endDate);
	            const requestStatus = nextProps.data.get(metricName).requestStatus;
	            
	            this.setState({
	                graphSalesData: Immutable.fromJS(graphSalesData),
	                metricName: metricName,
	                requestStatus: requestStatus,
	            }); 
	            
	        };
    	}
    }
    
    _getPlot(dataIsLoaded){
        return (
                <Plot
                type='area'
                focusedPlotLine={this.state.focusedPlotLine}
                plotLines={this.state.plotLines}
                dateRange={this.state.dateRange}
                data={this.state.graphSalesData}
                dataIsLoaded = {dataIsLoaded}
                axisLabels={Immutable.fromJS({y: this.state.selectedGraph})}
                cssClass={this.props.bodyShown ? '' : 'hide'}
            />
        )
    }
    
    _getBody(){
        if(this.state.requestStatus === Util.RequestStatus.PENDING) {
            return this._getPlot(false);
        }        
        
        if(this.state.requestStatus === Util.RequestStatus.SUCCESS) {
            if(this._hasDataInDateRange()) {
                return this._getPlot(true);
            } else {
                return this._createProblemNotificationBox(StringUtil.getString('b2bcentral_desktop_sales_nodata'), false);
            }
        }

        return this._createProblemNotificationBox(StringUtil.getString('b2bcentral_desktop_sales_error'), true);
    }
    
    /**
     * _onToggleGraphsClick will handle the event that the VerticalUnits buttons are clicked
     * @param graphName the graph to select
     * @private
     */
    _onToggleGraphsClick(graphName) {   	
    	const updatedPlotLines = _temporaryGetPlotLines(graphName);
        const range = this.state.dateRange;
    	const metricName = range.get('to').diff(range.get('from'), 'days', true) <= 1 ? 'orderMetrics/hourly' : 'orderMetrics';
        this.props.refreshData(metricName);
    	
    	this.setState({
    		plotLines: updatedPlotLines,
    		requestStatus: Util.RequestStatus.PENDING,
    		selectedGraph: graphName});
    }

    _handleDateChanged(range) {
        const metricName = range.get('to').diff(range.get('from'), 'days', true) <= 1 ? 'orderMetrics/hourly' : 'orderMetrics';
        this.props.refreshData(metricName);
        this.setState({
        	requestStatus: Util.RequestStatus.PENDING,
        	dateRange: range});
    }
    
    _createProblemNotificationBox (message, useWarningIcon) {
        const icon = useWarningIcon ? <i className="icon warning"></i> : null;
        return <CardNotificationBox>{icon} {message}</CardNotificationBox>
    }

    _isEmptyDataPoint(data) {
        const emptyFields = data.forEach(function(value, key) {
            if(key !== 'date' && value != 0) {
                return false;
            }
        });
    
        return emptyFields == data.count();
    }

    _hasDataInDateRange () {
        return this.state.plotLines.some((line) => {
            const from = this.state.dateRange.get('from');
            const to = this.state.dateRange.get('to');
            const data = this.state.graphSalesData;
            const dataInRange = data.filter((datum) => {
                return Moment(datum.get('date')).isBetween(from, to, undefined, '[]') && !this._isEmptyDataPoint(datum);
            });
            
            //There must be atleast one valid data points to plot a line.
            return dataInRange.count() > 0;
        });
    }    

    /**
     * handles the event that a checkbox to toggle a plotted graph is clicked
     * @param plotLine the plotLine that has its visibility toggled
     * @private
     */
    _onCheckboxToggleChange(plotLine) {
        const plotLines = this.state.plotLines;

        const updatedIndex = plotLines.findIndex((item) => {
            return item.get('id') === plotLine.get('id');
        });

        if (updatedIndex >= 0) {
            const updatedPlotLines = plotLines.update(updatedIndex, (item) => {
                return item.set('isActive', !plotLine.get('isActive'));
            });

            this.setState({plotLines: updatedPlotLines});
        }
    }

    /**
     * handles the event that the mouse enters a toggle area under the graph
     * @param plotLine the plotLine that has the mouse over it
     * @private
     */
    _onCheckboxMouseEnter(plotLine) {
        this.setState({focusedPlotLine: plotLine});
    }

    /**
     * Handle the event that the mouse leaves a toggle area under the graph
     * @param plotLine the plotLine that just had the mouse leave
     * @private
     */
    _onCheckboxMouseLeave(/* plotLine */) {
        this.setState({focusedPlotLine: undefined});
    }

    /**
     * Renders the GraphContainer component.
     *
     * @returns {XML}
     */
    render() {
    	
        const snapshot = this.state.requestStatus === Util.RequestStatus.SUCCESS && this._hasDataInDateRange () ? 
                SnapshotBuilder.buildSalesSnapshot(this.props.data, this.state.dateRange, this.state.metricName) : null;

        const reportLink = (
            <Section textAlign="right">
                <Link url="/gp/site-metrics/report.html" target="_blank">
                	{StringUtil.getString('b2bcentral_desktop_sales_link')}
                </Link>
             </Section>
        );

        return (
            <Container cssClass="graphContainer">
                <Container cssClass={this.props.bodyShown ? 'no_top_padding' : 'hide'}>
                    <Section>
                        <GridRow>
                            <GridColumn gridUnits={3} widescreenGridUnits={3}>
                                <GraphSelectorButtonGroup
                                    graphNames={this.state.graphs}
                                    selectedGraphName={this.state.selectedGraph}
                                    onClick={this._onToggleGraphsClick}
                                />
                            </GridColumn>
                            <GridColumn gridUnits={9} widescreenGridUnits={9} position="last" textAlign="right">
                                <DateRangeSelector
                                    minDate={this.state.minDate}
                                    maxDate={this.state.maxDate}
                                    presetDateRanges={this.state.presetDateRanges}
                                    selectedDateRange={this.state.dateRange}
                                    onDateChange={this._handleDateChanged}
                                />
                            </GridColumn>
                        </GridRow>
                    </Section>
                    
                    {this._getBody()}
    
                    <DataSetDisplay
                        onChange={this._onCheckboxToggleChange}
                        plotLines={this.state.plotLines}
                        cssClass={this.props.bodyShown ? '' : 'hide'}
                    />
                </Container>
                <Container cssClass={this.props.bodyShown ? 'no_top_padding' : 'hide'}>
                	{snapshot}
                </Container>
                
                {reportLink}
            </Container>
        );
    }
}

/**
 * GraphContainer proptypes provide type validation on props.
 * @type {{
 *     title: title of the graph,
 *     data: data store from which to load data
 * }}
 */
GraphContainer.propTypes = {
    title: React.PropTypes.string.isRequired,
    data: React.PropTypes.object,
};

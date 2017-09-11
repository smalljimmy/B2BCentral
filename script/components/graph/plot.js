import React from 'react';
import {findDOMNode} from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import c3 from 'c3';
import Immutable from 'immutable';
import Moment from 'moment';
import ClientRectChangeDetector from './clientRectChangeDetector'
import GraphTooltip from './graphTooltip';
import StringUtil from "../../util/stringUtil";
import {formatNumberShort, formatAsCurrencyShort} from '../../util/formatter';

// TODO: This needs to be localization friendly
const shortDateFormat = 'hA';
const mediumDateFormat = 'M/D/YYYY';
const longDateFormat = 'MM/YYYY';

const graphColors = ['#42a5f5', '#7b1fa2', '#447b73', '#42a5f5', '#7b1fa2', '#447b73'];

/**
 * Retrieves the appropriate date format for the given duration.
 * @param minDate the lower date in the displayed range
 * @param maxDate the upper date in the displayed range
 * @returns {string} the date format to pass to Moment.format()
 * @private
 */
function _getDateFormat(minDate, maxDate) {
    const duration = maxDate.diff(minDate, 'days', true);
    let dateFormat;
    if (duration <= 1) {
        dateFormat = shortDateFormat;
    }
    else if (duration <= 170) {
        dateFormat = mediumDateFormat;
    }
    else {
        dateFormat = longDateFormat;
    }

    return dateFormat;
}

function _dollarFormatter(num) {
    return `$${Math.floor(num)}`;
}

function getSalesTooltipPosition(data, tWidth, tHeight, element, thisEle) {
    let $$ = thisEle; // , d3 = $$.d3;
    let tooltipTop = 0;
    // let mouse = d3.mouse(element);

    // Determine tooltip position
    let svgLeft = $$.getSvgLeft(true);

    let tooltipLeft = svgLeft + $$.getCurrentPaddingLeft(true) + $$.x(data[0].x);
    let tooltipRight = tooltipLeft + tWidth;
    let chartRight = svgLeft + ($$.currentWidth - $$.getCurrentPaddingRight());
    // tooltipTop = mouse[1];
    // Make top position fixed
    tooltipTop -= 50;

    if (tooltipRight > chartRight) {
        // flip to another side
        tooltipLeft = tooltipLeft - tWidth - 5;
    }

    /*
    if (tooltipTop + tHeight > $$.currentHeight) {
        tooltipTop -= tHeight;
    }
    */

    return {top: tooltipTop, left: tooltipLeft};
}

/**
 * Class representing the plot section (the actual graph) of a Graph.
 *
 */
export default class Plot extends React.Component {
    /**
     * Constructs an instance of Plot with props.
     * This class doesn't exactly stick with proper React idioms, because the object it wraps doesn't.
     * It's necessary to control how this is drawn and not to repaint the plot too frequently.
     * @param props
     */
    // eslint-disable-next-line max-statements
    constructor(props) {
        super(props);
        this.c3Plot = undefined;
        this.dateFormat = 'M/D/YYYY';
        this.minDate = Moment();
        this.maxDate = Moment();

        this._updatePlot = this._updatePlot.bind(this);
        this._updateData = this._updateData.bind(this);
        this._updateDateRange = this._updateDateRange.bind(this);
        this._updatePlotLines = this._updatePlotLines.bind(this);
        this._updateFocus = this._updateFocus.bind(this);
        this._updateAxisLabels = this._updateAxisLabels.bind(this);
        this._generateC3Plot = this._generateC3Plot.bind(this);
        this._xTickValues = this._xTickValues.bind(this);
        this._xAxisFormatter = this._xAxisFormatter.bind(this);
        this._yAxisFormatter = this._yAxisFormatter.bind(this);
        this._getChartProps = this._getChartProps.bind(this);
        
        this.state = {
            dataIsLoaded: props.dataIsLoaded | false,
        };
    }

    /**
     * Generates the c3 plot and initializes it.
     */
    componentDidMount() {
        if (!this.c3Plot) {
            this.c3Plot = this._generateC3Plot(this.props.type);
        }
        
        this._updatePlot(this.props, null);
    }

    /**
     * Checks if data/settings have changed, and updates the plot accordingly.
     * @param nextProps the new props
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataIsLoaded: nextProps.dataIsLoaded,
        })
    	
        if (nextProps.type !== this.props.type) {
            // recreate plot and reload everything if type changes
            if (this.c3Plot) {
                this.c3Plot.destroy();
            }
            this.c3Plot = this._generateC3Plot(nextProps.type);
            this._updatePlot(nextProps, null);
        }
        else {
            this._updatePlot(nextProps, this.props);
        }
    }

    /**
     * Cleans up after the component has unmounted
     */
    componentWillUnmount() {
        this.c3Plot.destroy();
    }

    
    _xTickValues() {
        const start = this.minDate;
        const end = this.maxDate;
        const hours = end.diff(start, 'hours');
        const days = end.diff(start, 'days');
        const months = end.diff(start, 'months');

        let xTickCount = 7;
        let stepSize = Math.ceil(days / xTickCount);
        let stepUnit = 'days';

        if (days <= 1) {
        	xTickCount = 8;
        	stepSize = Math.ceil(hours / xTickCount);
        	stepUnit = 'hours'; 	
        } 
        
        // special-case >6 months to show months
        if (months >= Moment.duration(6, 'months').asMonths()) {
            xTickCount = 12;
            stepUnit = 'months';
            stepSize = Math.ceil(months / xTickCount);
        }

        return Array(xTickCount+2)
        	.join('0').split('').map(parseFloat)
            .map((_, index) => {
                let indexStep = index * stepSize;
                return stepUnit === 'hours' ? 
                		end.clone().subtract(indexStep, stepUnit).startOf('hour').toDate() :
                		end.clone().subtract(indexStep, stepUnit).toDate().setHours(0,0,0,0);
            })
            .reverse();
    }
    
    _xAxisFormatter(jsDate) {
        return Moment(jsDate).format(this.dateFormat);
    }  
    
    
    /**
     * Responsible for formatting the number on the left axis of the graph. Uses the axes property to 1 the
     * desired format.
     * @param n the number that needs to be formatted.
     * @returns the formatted number.
     */
    _yAxisFormatter(n) {
        if (this.props.axisLabels.get('y') === StringUtil.getString('b2bcentral_desktop_sales_graph_2')) {
            return formatNumberShort(n);
        }

        return formatNumberShort(n);
    }

    
    
    /**
     * Generates he C3 chart and binds it to the the DOM.
     * Should not be called before the component has mounted.
     * @returns the generated c3 plot
     * @private
     */
    _generateC3Plot(chartType) {
        // Generate the chart and bind it to this DOM object
        const chartProps = this._getChartProps(chartType);
        return c3.generate(chartProps);
    }

    /**
     * Updates the plot, based on the next props and current props, redrawing it if needed.
     * @param nextProps the new props
     * @param currentProps the old props
     * @private
     */
    _updatePlot(nextProps, currentProps) {
        // update any props that change, only repaint if things did change
        let updated = false;
        
        updated |= this._updatePlotLines(nextProps.plotLines, currentProps ? currentProps.plotLines : null);
        updated |= this._updateData(nextProps.data, currentProps ? currentProps.data : null);
        updated |= this._updateDateRange(nextProps.dateRange, currentProps ? currentProps.dateRange : null);
        updated |= this._updateFocus(nextProps.focusedPlotLine, currentProps ? currentProps.focusedPlotLine : null);
        updated |= this._updateAxisLabels(nextProps.axisLabels, currentProps ? currentProps.axisLabels : null);
                
        if (updated) {        	
        	this.c3Plot.resize();
        }        
    }

    /**
     * Intelligently updates the data in the c3 plot, if it has changed.
     * @param newData the new data array
     * @param currentData the current data array
     * @returns {boolean} whether an update was made
     * @private
     */
    _updateData(newData, currentData) {
        if (currentData !== newData) {
            this.c3Plot.load({
                unload: true,
                json: newData.toJS(),
                keys: {
                    x: 'date',
                    value: this.props.plotLines.map((plotLine) => {
                        return plotLine.get('id');
                    }).toJS(),
                },
                done: () => {
                    this.setState({
                        dataIsLoaded: (newData.size > 0),
                    })
                },
            });

            return true;
        }

        return false;
    }

    /**
     * Intelligently updates the date range in the c3 plot, if it has changed.
     * @param newDateRange the new date range
     * @param currentDateRange the current date range
     * @returns {boolean} whether an update was made
     * @private
     */
    _updateDateRange(newDateRange, currentDateRange) {
        if (newDateRange !== currentDateRange) {
            this.minDate = newDateRange.get('from');
            this.maxDate = newDateRange.get('to');
            
            let day = this.maxDate.diff(this.minDate, 'days');

            this.c3Plot.axis.range({
                min: {x: day <= 1 ? this.minDate.toDate() : this.minDate.toDate().setHours(0,0,0,0)},
                max: {x: day <= 1 ? this.maxDate.toDate() : this.maxDate.toDate().setHours(0,0,0,0)},
            });

            this.dateFormat = _getDateFormat(this.minDate, this.maxDate);

            return true;
        }

        return false;
    }

    /**
     * Intelligently updates the plot lines in the c3 plot, if it has changed.
     * @param newPlotLines the new plot lines
     * @param currentPlotLines the current plot lines
     * @returns {boolean} whether an update was made
     * @private
     */
    _updatePlotLines(newPlotLines, currentPlotLines) {
        if (currentPlotLines !== newPlotLines) {
            const updates = newPlotLines.reduce((accumulator, plotLine, index) => {
                if (plotLine.get('isActive')) {
                    accumulator.shown.push(plotLine.get('id'));
                }
                else {
                    accumulator.hidden.push(plotLine.get('id'));
                }

                accumulator.names[plotLine.get('id')] = plotLine.get('title');
                accumulator.colors[plotLine.get('id')] = graphColors[index];

                return accumulator;
            }, {shown: [], hidden: [], names: {}, colors: {}});

            this.c3Plot.show(updates.shown);
            this.c3Plot.hide(updates.hidden);
            this.c3Plot.data.names(updates.names);
            this.c3Plot.data.colors(updates.colors);

            return true;
        }

        return false;
    }

    /**
     * Intelligently updates the focus in the c3 plot, if it has changed.
     * @param newFocusedPlotLine the new focused plot line
     * @param currentFocusedPlotLine the current focused plot line
     * @returns {boolean} whether an update was made
     * @private
     */
    _updateFocus(newFocusedPlotLine, currentFocusedPlotLine) {
        if (newFocusedPlotLine !== currentFocusedPlotLine) {
            if (newFocusedPlotLine) {
                this.c3Plot.focus(newFocusedPlotLine.get('id'));
            }
            else {
                this.c3Plot.revert();
            }

            return true;
        }

        return false;
    }

    /**
     * Intelligently updates the axis labels in the c3 plot, if it has changed.
     * @param newLabels The Immutable.Map of new axis labels
     * @param currentLabels The Immutable.Map of current axis labels
     * @returns {boolean} whether an update was made
     * @private
     */
    _updateAxisLabels(newLabels, currentLabels) {
        if (!newLabels.equals(currentLabels)) {
            this.c3Plot.axis.labels(newLabels.toJS());

            return true;
        }

        return false;
    }
        
    _getChartProps(chartType) {
        return {
            data: {
                empty: {
                    label: {
                        text: '',
                    },
                },
                json: [],
                type: chartType,
                groups: [
                         ['b2b_sales', 'b2c_sales', 'b2b_units', 'b2c_units']
                ],
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        values: this._xTickValues,
                        format: this._xAxisFormatter,
                    },
                },
                
                y: {
                    min: 0,
                    padding: {top: 0, bottom: 0},
                    label: {
                        position: 'outer-middle',
                    },
                    tick: {
                        format: this._yAxisFormatter,
                        count: 5,                   	
                    },
                },
            },
            tooltip: { // Annotation
                grouped: true, // Annotation when hover on a single line
                position(data, tWidth, tHeight, element) {
                    return getSalesTooltipPosition(data, tWidth, tHeight, element, this);
                },
                contents(data) {
                    let content = React.createElement(GraphTooltip, {data, raw:this.data.targets});
                    content = ReactDOMServer.renderToString(content);

                    return content;
                },
            },        
            legend: {
                show: false,
            },
            padding: {
            	right: 20
            },
            point: {
                show: false,
            },
            grid: {
                y: {
                    show: true,
                },
            },
            bar: {
                width: 20,
            },            
            bindto: findDOMNode(this.refs['c3-bind-point']),
        }
    }

    /**
     * Renders the Plot component.
     *
     * @returns {XML}
     */
    render() {
        const dataNotLoadedClass = this.state.dataIsLoaded ? '' : 'data-not-loaded';
        
        return (
            <div className={`plot-container ${dataNotLoadedClass}`}>
                <div className="c3" ref="c3-bind-point" />
                <div className="loading-message"><img src="https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-4x._CB391853216_.gif" /></div>
            </div>
        );
    }
}

/**
 * Plot proptypes provide type validation on props.
 * @type {{
 *     type: the type of graph to show ('bar' or 'line'),
 *     focusedPlotLine: the plotLine that should be highlighted,
 *     plotLines: Immutable.List: {
 *         id: React.PropTypes.string,
 *         title: React.PropTypes.string,
 *         isActive: React.PropTypes.bool,
 *     },
 *     dateRange: the custom date range to show, of shape:
 *         from: time to start showing data,
 *         to: time to stop showing data,
 *     axisLabels:map containing axis (y,y2,x,etc) to data id,
 *     data: List of json data to display,
 * }}
 */
Plot.propTypes = {
    type: React.PropTypes.string.isRequired,
    focusedPlotLine: React.PropTypes.instanceOf(Immutable.Map),
    plotLines: React.PropTypes.instanceOf(Immutable.List).isRequired,
    dateRange: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    axisLabels: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    data: React.PropTypes.instanceOf(Immutable.List).isRequired,
};

import React from 'react';
import StringUtil from "../../util/stringUtil";

/**
 * Class representing the tooltip/overlay part of a graph when a user hovers over the plot.
 *
 */
export default class graphTooltip extends React.Component {
    _setGraphObj(date, raw) {
        const graphObj = {
            // TODO: The following are mock data - need to get real data from api
            sellingPrice: d3.format('$.2f')(20),
            // sales: d3.format("$,")(20000), // Need this?
            b2b_units: raw
            		.find((datum) => datum.id=='b2b_units').values
            		.find((datum) => datum.x == date)
            		.value,
            b2b_orders: raw
    				.find((datum) => datum.id=='b2b_orders').values
    				.find((datum) => datum.x == date)
    				.value,
    		b2b_sales: raw
					.find((datum) => datum.id=='b2b_sales').values
					.find((datum) => datum.x == date)
					.value,
					
		    b2c_units: raw
            		.find((datum) => datum.id=='b2c_units').values
            		.find((datum) => datum.x == date)
            		.value,
            b2c_orders: raw
    				.find((datum) => datum.id=='b2c_orders').values
    				.find((datum) => datum.x == date)
    				.value,
    		b2c_sales: raw
					.find((datum) => datum.id=='b2c_sales').values
					.find((datum) => datum.x == date)
					.value, 
					
			overall_units: raw
            		.find((datum) => datum.id=='overall_units').values
            		.find((datum) => datum.x == date)
            		.value,
            overall_orders: raw
    				.find((datum) => datum.id=='overall_orders').values
    				.find((datum) => datum.x == date)
    				.value,
    		overall_sales: raw
					.find((datum) => datum.id=='overall_sales').values
					.find((datum) => datum.x == date)
					.value, 					
            thisMonth: date.getMonth() + 1,
            lastYear: date.getFullYear() - 1,
            lastMonthYear: date.getFullYear(),
            lastMonth: date.getMonth(),
        };

        if (graphObj.lastMonth === 0) {
            graphObj.lastMonth = 12;
            graphObj.lastMonthYear -= 1;
        }
        return graphObj;
    }

    /**
     * Renders the graphTooltip component.
     *
     * @returns {XML}
     */
    render() {
        const data = this.props.data;
        const raw = this.props.raw;

        /* Use the following data (graph id, date, or index) to get other values from
         * other object (Selling price, units, orders) to display in tooltip (annotation)
         * d = Object {id, index, name, value, x=Date}
         * We need to generate contents depend on what graphs are currently display
         * Convert d object to array
         */
        const graphData = [];
        let date;

        for (let i = 0; i < data.length; i++) {
            graphData[data[i].id] = data[i];
            date = data[i].x;
        }

        const graphObj = this._setGraphObj(date, raw);

        return (
            <div id="tooltip" className="annotation">
                <div className="annotation-section">
                	<div>{graphObj.thisMonth}/{date.getDate()}/{date.getFullYear()}</div>                	
                    <ul className="annotation-header">
                        <li>Sales</li>
                        <li>Units/Orders</li>
                    </ul>
                </div>

                {graphData.b2b_sales || graphData.b2b_units ? (
            	<div className="annotation-section">
                    <hr />
                    <div>B2B</div>
                    <ul>
                        <li>
                            <span className="annotation-value graph-color-1">
                                {d3.format('$,')(graphObj.b2b_sales)} 
                            </span>
                        </li>
                        <li>
                            <span className="annotation-value graph-color-1">
                                {graphObj.b2b_units} / {graphObj.b2b_orders}
                            </span>
                        </li>
                    </ul>
                </div> ) : (null)}
                
                {graphData.b2c_sales || graphData.b2c_units ? (
            	<div className="annotation-section">
	                <hr />
	                <div>Non-B2B</div>
	                <ul>
	                    <li>
	                        <span className="annotation-value graph-color-2">
	                            {d3.format('$,')(graphObj.b2c_sales)} 
	                        </span>
	                    </li>
	                    <li>
	                        <span className="annotation-value graph-color-2">
	                            {graphObj.b2c_units} / {graphObj.b2c_orders}
	                        </span>
	                    </li>
	                </ul>
                </div> ) : (null)}   
                
                {graphData.b2b_sales && graphData.b2c_sales || 
                	graphData.b2b_units && graphData.b2c_units ? (
            	<div className="annotation-section">
	                <hr />
	                <div>Total</div>
	                <ul>
	                    <li>
	                        <span className="annotation-value graph-color-3">
	                            {d3.format('$,')(graphObj.overall_sales)} 
	                        </span>
	                    </li>
	                    <li>
	                        <span className="annotation-value graph-color-3">
	                            {graphObj.overall_units} / {graphObj.overall_orders}
	                        </span>
	                    </li>
	                </ul>
                </div> ) : (null)}                    

                {graphData.pre30days ? (
                    <div className="annotation-section">
                        <hr />
                        <div>Same day last month - {graphObj.lastMonth}/{date.getDate()}/{graphObj.lastMonthYear}</div>
                        <ul>
                            <li>
                                <span className="annotation-value graph-color-2">
                                    {d3.format('$,')(graphData.pre30days.value)} / {graphObj.sellingPrice}
                                </span>
                            </li>
                            <li>
                                <span className="annotation-value graph-color-2">
                                    {graphObj.units} / {graphObj.orders}
                                </span>
                            </li>
                            {graphData.salesrank ? (
                                <li>
                                    <span className="annotation-value graph-color-2">
                                        {graphData.salesrank.value}
                                    </span>
                                </li>
                            ) : (null)}
                        </ul>
                    </div>
                ) : (null)}
                {graphData.same30days ? (
                    <div className="annotation-section">
                        <hr />
                        <div>Same day last year - {graphObj.thisMonth}/{date.getDate()}/{graphObj.lastYear}</div>
                        <ul>
                            <li>
                                <span className="annotation-value graph-color-3">
                                    {d3.format('$,')(graphData.same30days.value)} / {graphObj.sellingPrice}
                                </span>
                            </li>
                            <li>
                                <span className="annotation-value graph-color-3">
                                    {graphObj.units} / {graphObj.orders}
                                </span>
                            </li>
                            {graphData.salesrank ? (
                                <li>
                                    <span className="annotation-value graph-color-3">
                                        {graphData.salesrank.value}
                                    </span>
                                </li>
                            ) : (null)}
                        </ul>
                    </div>
                ) : (null)}
            </div>
        );
    }
}

/**
 * graphTooltip proptypes provide type validation on props.
 */
graphTooltip.propTypes = {
    data: React.PropTypes.array,
};

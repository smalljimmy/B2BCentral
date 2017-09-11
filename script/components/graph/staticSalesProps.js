import Moment from 'moment';
import {checkObjectHasProperty} from '../../util/util';
import React from 'react';


const startingDate = Moment().toDate();

var floor = Math.floor;

function getTotalOrderItems(orderMetrics, buyer) {
    return orderMetrics[buyer].metrics.reduce(
            function(items, current){
                return items + current.orderItemCount;
              }, 0.01
            );
}

function getTotalUnits(orderMetrics, buyer) {
    return orderMetrics[buyer].metrics.reduce(
            function(items, current){
                return items + current.unitCount;
              }, 0.01
            );
}

function getTotalOrders(orderMetrics, buyer) {
    return orderMetrics[buyer].metrics.reduce(
            function(items, current){
                return items + current.orderCount;
              }, 0.01
            );
}

function getTotalProductSales(orderMetrics, buyer) {
    let currencyCode = '';
	
	const totalAmount = orderMetrics[buyer].metrics.reduce(
            function(items, current){
            	currencyCode = current.orderProductSales.currencyCode;
                return items + current.orderProductSales.currencyAmount;
              }, 0.01
            );
    
    return {
    	currencyAmount: totalAmount,
    	currencyCode: currencyCode,
    };
}

//The key id must corresponds to KPIConstants
export function createSnapShotJson(orderMetrics) {
    return  {       
        //Product sales
        0: {
            b2b: getTotalProductSales(orderMetrics, 'b2b'),
            b2c: getTotalProductSales(orderMetrics, 'b2c'),
            overall: {
            		currencyAmount: getTotalProductSales(orderMetrics, 'b2b').currencyAmount + getTotalProductSales(orderMetrics, 'b2c').currencyAmount,
            		currencyCode: getTotalProductSales(orderMetrics, 'b2b').currencyCode,
            }
        },        
    	
    	//Units ordered
        1: {
            b2b: getTotalUnits(orderMetrics, 'b2b'),
            b2c: getTotalUnits(orderMetrics, 'b2c'),
            overall: getTotalUnits(orderMetrics, 'b2b') + getTotalUnits(orderMetrics, 'b2c'),
        },
        
        //Total order items
        2: {
            b2b: getTotalOrderItems(orderMetrics, 'b2b'),
            b2c: getTotalOrderItems(orderMetrics, 'b2c'),
            overall: getTotalOrderItems(orderMetrics, 'b2b') + getTotalOrderItems(orderMetrics, 'b2c'),
        },        
        
        //Avg units/order
        3: {
            b2b: floor(getTotalUnits(orderMetrics, 'b2b')) / getTotalOrders(orderMetrics, 'b2b'),
            b2c: floor(getTotalUnits(orderMetrics, 'b2c')) / getTotalOrders(orderMetrics, 'b2c'),
            overall: floor(getTotalUnits(orderMetrics, 'overall')) / getTotalOrders(orderMetrics, 'overall'),
        },
        
        //Avg sales/order
        4: {
            b2b: {
            	currencyAmount: floor(getTotalProductSales(orderMetrics, 'b2b').currencyAmount) / getTotalOrders(orderMetrics, 'b2b'),
            	currencyCode: getTotalProductSales(orderMetrics, 'b2b').currencyCode,
            },
            b2c: {
            	currencyAmount: floor(getTotalProductSales(orderMetrics, 'b2c').currencyAmount) / getTotalOrders(orderMetrics, 'b2c'),
            	currencyCode: getTotalProductSales(orderMetrics, 'b2c').currencyCode,
            },
            overall: {
            	currencyAmount: floor(getTotalProductSales(orderMetrics, 'overall').currencyAmount) / getTotalOrders(orderMetrics, 'overall'),
            	currencyCode: getTotalProductSales(orderMetrics, 'overall').currencyCode,
            },
        },
        
        //Total orders
        5: {
            b2b: getTotalOrders(orderMetrics, 'b2b'),
            b2c: getTotalOrders(orderMetrics, 'b2c'),
            overall: getTotalOrders(orderMetrics, 'overall'),
        },        
    };
}

/**
 * Slices the data so that the data that is returned all lies between 
 * the start and end dates.
 * @param data the data to slice.
 * @param dateRange the range each piece of data should be within.
 */    
function sliceByDate(data, fromDate, endDate) {
    return data.filter((datum) => Moment(datum.date).isBetween(fromDate, endDate, undefined, '[]'));
}  


export function createSalesJson(graphSalesData, metricName, fromDate, endDate) {
    const salesJson = [{date: startingDate, b2b: 0, b2c: 0, overall: 0.01}];
    
    if (graphSalesData && graphSalesData.has(metricName)  
            && checkObjectHasProperty(graphSalesData.get(metricName), 'b2b')
            && checkObjectHasProperty(graphSalesData.get(metricName), 'b2c')
            && checkObjectHasProperty(graphSalesData.get(metricName), 'overall')) {
        
        let orderMetrics = graphSalesData.get(metricName);
        
        //b2b
        var b2b_sales = orderMetrics.b2b.metrics.map((metric) => {
            return metric.orderProductSales.currencyAmount;
        });   
        
        var b2b_units = orderMetrics.b2b.metrics.map((metric) => {
            return metric.unitCount;
        }); 
        
        var b2b_orders = orderMetrics.b2b.metrics.map((metric) => {
            return metric.orderCount;
        });        
        
        //b2c
        var b2c_sales = orderMetrics.b2c.metrics.map((metric) => {
            return metric.orderProductSales.currencyAmount;
        }); 
        
        var b2c_units = orderMetrics.b2c.metrics.map((metric) => {
            return metric.unitCount;
        }); 
        
        var b2c_orders = orderMetrics.b2c.metrics.map((metric) => {
            return metric.orderCount;
        });        
                
        //overall
        var overall_sales = b2b_sales.map(function (num, idx) {
            return num + b2c_sales[idx];
        });
        
        var overall_units = b2b_units.map(function (num, idx) {
            return num + b2c_units[idx];
        });
        
        var overall_orders = b2b_orders.map(function (num, idx) {
            return num + b2c_orders[idx];
        });        
        
        var date = orderMetrics.overall.metrics.map((metric) => {
            return Moment(metric.interval.split('--')[0]).toDate();
        });
        
        var result = [];
        
        for (var i = 0; i < b2b_sales.length; i++) {
            result.push({
               b2b_sales: b2b_sales[i],
               b2c_sales: b2c_sales[i],
               overall_sales: overall_sales[i],
               
               b2b_units: b2b_units[i],
               b2c_units: b2c_units[i],
               overall_units: overall_units[i],
               
               b2b_orders: b2b_orders[i],
               b2c_orders: b2c_orders[i],
               overall_orders: overall_orders[i],               
          
               date: date[i]
            });
        }

        return sliceByDate(result, fromDate.startOf('day'), endDate);
    }

    return salesJson;
}
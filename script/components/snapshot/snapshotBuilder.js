import React from 'react';
import Snapshot from './snapshot';
import SnapshotColumn from './snapshotColumn';
import SnapshotData from './snapshotData';
import SnapshotInfo from './snapshotInfo';
import SnapshotLabel from './snapshotLabel';
import SnapshotRow from './snapshotRow';
import SnapshotTableCell from './snapshotTableCell';
import {createSalesJson, createSnapShotJson} from '../graph/staticSalesProps';
import {checkObjectHasProperty} from '../../util/util';
import {formatNumberToFixed, formatAsCurrencyShort, formatAsPercentage} from '../../util/formatter';
import Moment from 'moment';
import StringUtil from "../../util/stringUtil";

function daysLabel(duration) {
    return duration === 0 ? 'Today so far' : `Last ${duration} days`;
}

function buildSalesRangeColumn(snapshotDataSet, index, dayLabel, isCurrency, withPercentage) {
    let column;

    const detailColUnits = 2;
    var floor = Math.floor;
    var format = isCurrency ? formatAsCurrencyShort : (n) => formatNumberToFixed (n, 0);
    
    column = (
        <SnapshotColumn cssClass="text-align-left float-left a-color-tertiary a-size-small"
            gridUnits={detailColUnits}
            widescreenGridUnits={detailColUnits}
            position={index === 4 ? 'last' : null}
        >
            <SnapshotTableCell>
                <SnapshotLabel>
                    {dayLabel}
                </SnapshotLabel>
            </SnapshotTableCell>
            <SnapshotTableCell>
                <SnapshotLabel/>
            </SnapshotTableCell>
            <SnapshotTableCell>
                <SnapshotData cssClass="b2b">
                    <span className="a-size-base-plus a-text-bold">{format(snapshotDataSet[index].b2b)}</span>&nbsp;
                    {withPercentage && <span className="a-size-small">({formatAsPercentage(snapshotDataSet[index].b2b, snapshotDataSet[index].overall, isCurrency)}%)</span>}
                </SnapshotData>
            </SnapshotTableCell>
            <SnapshotTableCell>
                <SnapshotData cssClass="b2c">
                    <span className="a-size-base-plus a-text-bold">{format(snapshotDataSet[index].b2c)}</span>&nbsp;
                    {withPercentage && <span className="a-size-small">({100-formatAsPercentage(snapshotDataSet[index].b2b, snapshotDataSet[index].overall, isCurrency)}%)</span>}
                </SnapshotData>
            </SnapshotTableCell>
            <SnapshotTableCell>
                <SnapshotData cssClass="overall">
	                <span className="a-size-base-plus a-text-bold">{format(snapshotDataSet[index].overall)}</span>&nbsp;
	                {withPercentage && <span className="a-size-small">(100%)</span>}
                </SnapshotData>
            </SnapshotTableCell>
        </SnapshotColumn>
    );

    return column;
}

function buildSalesDesktop(orderMetrics) {

    const labelText = {
        b2b: StringUtil.getString('b2bcentral_desktop_sales_graph_10'),
        b2c: StringUtil.getString('b2bcentral_desktop_sales_graph_11'),
        overall: StringUtil.getString('b2bcentral_desktop_sales_graph_12'),
    };

    const labels = (
        <SnapshotColumn gridUnits={2} widescreenGridUnits={2} cssClass="text-align-left">
            <SnapshotTableCell />
            <SnapshotTableCell />
            <SnapshotTableCell>
                <SnapshotInfo cssClass="b2b a-color-secondary">
                    {labelText ? labelText.b2b || '' : ''}
                </SnapshotInfo>
            </SnapshotTableCell>
            <SnapshotTableCell>
                <SnapshotInfo cssClass="b2c a-color-secondary">
                    {labelText ? labelText.b2c || '' : ''}
                </SnapshotInfo>
            </SnapshotTableCell>
            <SnapshotTableCell>
                <SnapshotInfo cssClass="overall a-color-secondary">
                    {labelText ? labelText.overall || '' : ''}
                </SnapshotInfo>
            </SnapshotTableCell>
        </SnapshotColumn>
    );

    const snapshotDataSet = createSnapShotJson(orderMetrics);
    
    return (
        <SnapshotRow cssClass="snapshotRow-last">
            {labels}
            {buildSalesRangeColumn(snapshotDataSet, 0, StringUtil.getString('b2bcentral_desktop_sales_table_1'), true, true)}
            {buildSalesRangeColumn(snapshotDataSet, 1, StringUtil.getString('b2bcentral_desktop_sales_table_2'), false, true)}
            {buildSalesRangeColumn(snapshotDataSet, 2, StringUtil.getString('b2bcentral_desktop_sales_table_3'), false, false)}
            {buildSalesRangeColumn(snapshotDataSet, 3, StringUtil.getString('b2bcentral_desktop_sales_table_4'), false, false)}
            {buildSalesRangeColumn(snapshotDataSet, 4, StringUtil.getString('b2bcentral_desktop_sales_table_5'), true, false)}
        </SnapshotRow>
    );
}

function sliceDataByDate(metrics, startDate, endDate) {
    return metrics.filter((data) => {
        return data.interval &&
               Moment(data.interval.split('--')[0]).isBetween(startDate, endDate, undefined, '(]');
    });
}

class SnapshotBuilder {
    buildSalesSnapshot(state, dateRange, metricName) {
        if (state && state.has(metricName) && dateRange) {
            
            const orderMetrics = state.get(metricName);
            const startDate = dateRange.get('from');
            const endDate = dateRange.get('to');
            
            const filteredMetrics = {
                b2b: {
                    metrics: sliceDataByDate(orderMetrics.b2b.metrics, startDate, endDate),
                },
                b2c: {
                    metrics: sliceDataByDate(orderMetrics.b2c.metrics, startDate, endDate),
                },
                overall: {
                    metrics: sliceDataByDate(orderMetrics.overall.metrics, startDate, endDate),
                },
            }
            
            return (
                <Snapshot>
                    {buildSalesDesktop(filteredMetrics, dateRange)}
                </Snapshot>
            );
        } 
    }
}

const singleton = new SnapshotBuilder();
export default singleton;

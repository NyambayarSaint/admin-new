import React from 'react';
import styled from 'styled-components';
import ColumnAction from './ColumnAction';
import * as ColumnTypes from './ColumnTypes'

const Table = ({ model, data, orderByColumnCb, bordered }) => {
    return (
        <Container data-scrollable bordered={bordered}>
            <table>
                <thead>
                    <tr>
                        {Object.keys(model).map(fieldName => {
                            const fieldObject = model[fieldName]
                            if (fieldObject.columnOrder || fieldObject.columnFilter) return (
                                <ColumnAction
                                    key={fieldName}
                                    data={data}
                                    fieldName={fieldName}
                                    orderByColumnCb={orderByColumnCb}
                                    order={fieldObject.columnOrder}
                                    filter={fieldObject.columnFilter}
                                    sticky={fieldObject.sticky}
                                    label={fieldObject.label}
                                />
                            )
                            return (
                                <th key={fieldName} data-sticky={fieldObject.sticky}>{fieldObject.label}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.length ? data.map((instance, i) => (
                        <tr key={instance.id + Math.random()}>
                            {Object.keys(model).map(fieldName => {
                                const fieldObject = model[fieldName]
                                const Jsx = fieldObject.jsx
                                const value = instance[fieldName]
                                const ColumnType = ColumnTypes[fieldObject?.type]
                                const tdProps = {
                                    key: fieldName + i,
                                    'data-sticky': fieldObject.sticky,
                                    'data-content': fieldObject.filterable
                                }
                                if (Jsx) return <td {...tdProps}><Jsx thisInstance={instance} index={i} /></td>
                                if (ColumnType) return <td {...tdProps}><ColumnType>{value}</ColumnType></td>
                                return <td {...tdProps}>{value}</td>
                            })}
                        </tr>
                    )) : <tr><td className='noresult' colSpan={Object.keys(model).length}>Илэрц олдсонгүй</td></tr>}
                </tbody>
            </table>
        </Container>
    );
};

export default Table;

const Container = styled.div`
    position:relative;
    overflow:auto;
    white-space:nowrap;
    table{
        color:#606266;
        line-height:23px;
        width:100%;
        table-layout: fixed;
        thead{
            background:rgb(243, 243, 243);
        }
        tr{
            th{
                border-top:1px solid #ebeef5;
                padding:10px 20px;
                user-select:none;
                text-align:left;
                font-weight:bold;
                &:last-child{
                    text-align:right;
                }
            }
            td{
                padding:10px 20px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow-x:hidden;
                &:last-child{
                    text-align:right;
                }
            }
            td.noresult{
                text-align:center;
                background:rgba(0,0,0,0.02e);
                opacity:0.8;
            }
            &:hover{
                // background:#FBFBFB;
            }
        }
        tr{
            td[data-sticky="true"],th[data-sticky="true"]{
                position: -webkit-sticky;
                position: sticky;
                background-color: white;
                right: 0px;
                // background:#FBFBFB;
            }
        }
    }
`
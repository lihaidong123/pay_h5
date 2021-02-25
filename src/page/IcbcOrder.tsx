import React, {useState} from "react";
import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import qs from "qs";
import axios from "axios";
import {Tag} from "antd";

interface ValueType {
    orderId: string;
    merId: string;
    attach: string;
    totalAmt: string;
    returnMsg: string;
    returnCode: string;
    status: number;
    createdTime: string;
}

const columns: ProColumns<ValueType>[] = [
    {title: '商户号', dataIndex: 'merId', key: 'merId', search: false},
    {title: '工行订单id', dataIndex: 'orderId', key: 'orderId'},
    {title: '业务号', dataIndex: 'attach', key: 'attach'},
    {
        title: '支付金额', dataIndex: 'totalAmt', key: 'totalAmt', search: false,
        render: (_, row) => {
            return row.totalAmt && '￥' + (Number(row.totalAmt) / 100)
        },
    },
    {title: '消息', dataIndex: 'returnMsg', key: 'returnMsg', search: false},
    {title: '支付状态', dataIndex: 'returnCode', key: 'returnCode', search: false},
    {
        title: '内网状态', dataIndex: 'status', key: 'status', search: false,
        render: (_, row) => {
            return row.status === 0 ? <Tag color="success"> 已更新 </Tag>
                : <Tag color="error">未更新</Tag>;
        }
    },
    {
        title: '支付时间', dataIndex: 'createdTime', key: 'createdTime', valueType: 'dateTimeRange',
        search: {
            transform: (value: any) => ({startTime: value[0], endTime: value[1]}),
        },
        render: (_, row) => {
            return row.createdTime;
        },
    },
];

export const IcbcOrder = () => {
    const [collapsed, setCollapsed] = useState(false);
    const list = (params: Record<string, unknown> & { pageSize?: number | undefined, current?: number | undefined, keyword?: string | undefined }) => {
        return axios.get(`/internet/query/payBizContent?${qs.stringify(params)}`).then(res => {
            return {
                data: res.data.data.records,
                total: res.data.data.total,
                success: res.data.code === 0,
            };
        })
    }
    return (
        <ProTable<ValueType>
            columns={columns}
            request={async (params) => {
                return list(params)
            }}
            rowKey="msgId"
            pagination={{
                showSizeChanger: true,
            }}
            search={{
                collapsed,
                onCollapse: setCollapsed,
            }}
        />
    )
}

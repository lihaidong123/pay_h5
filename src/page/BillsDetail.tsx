import React, {useState} from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Tag} from "antd";
import axios from "axios";
import qs from "qs";


interface Order {
    /** 交款人 */
    payer: string;
    /** 业务流水号;默认使用业务流水号 */
    fcustom1: string;
    /** 金额 */
    totalAmt: string;
    /** 开票次数 */
    billCount: number;
    /** 开票状态 */
    billStatus: number;
    /** 创建时间 */
    createdTime: string;
}

export const columns: ProColumns<Order>[] = [
    {title: '交款人', dataIndex: 'payer', key: 'payer', search: false},
    {title: '业务号', dataIndex: 'fcustom1', key: 'fcustom1'},
    {title: '金额', dataIndex: 'fcustom1', key: 'fcustom1', search: false},
    {title: '开票次数', dataIndex: 'billCount', key: 'billCount', search: false},
    {
        title: '状态', dataIndex: 'status', key: 'status',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            '': {text: '全部', status: ''},
            0: {
                text: '成功',
                status: 0,
            },
            1: {
                text: '失败',
                status: 1,
            },
        },
        render: (_, row) => {
            return row.billStatus === 0 ? <Tag color="success"> 开票成功 </Tag> : <Tag color="error">开票失败</Tag>;
        },
    },
    {
        title: '时间', dataIndex: 'createdTime', key: 'createdTime', valueType: 'dateTimeRange',
        search: {
            transform: (value: any) => ({startTime: value[0], endTime: value[1]}),
        },
        render: (_, row) => {
            return row.createdTime;
        },
    },
];


export const BillsDetail = () => {
    const [collapsed, setCollapsed] = useState(false);
    const list = (params: Record<string, unknown> & { pageSize?: number | undefined, current?: number | undefined, keyword?: string | undefined }) => {
        return axios.get(`/intranet/query/billDetail?${qs.stringify(params)}`).then(res => {
            return {
                data: res.data.data.records,
                total: res.data.data.total,
                success: res.data.code === 0,
            };
        })
    }

    return (
        <ProTable<Order>
            columns={columns}
            request={async (params) => {
                return list(params)
            }}
            rowKey="id"
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


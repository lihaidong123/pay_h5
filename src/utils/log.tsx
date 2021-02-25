import React, {useState} from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Tag} from "antd";
import axios from "axios";
import qs from "qs";


export interface LogType {
    id: string;
    ywlsh: string;
    msg: string;
    status: number;
    parameter?: string;
    createdTime: string;
}

interface Url {
    url: string;
}

export const internetcolumns: ProColumns<LogType>[] = [
    {title: '业务号', dataIndex: 'ywlsh', key: 'ywlsh'},
    {title: '消息', dataIndex: 'msg', key: 'msg', search: false},
    {
        title: '状态', dataIndex: 'status', key: 'status',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            '': {text: '全部', status: ''},
            1: {
                text: '正常',
                status: 1,
            },
            2: {
                text: '异常',
                status: 2,
            },
        },
        render: (_, row) => {
            return row.status === 1 ? <Tag color="success"> 正常 </Tag> : <Tag color="error">异常</Tag>;
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

export const intranetcolumns: ProColumns<LogType>[] = [
    {title: '业务号', dataIndex: 'ywlsh', key: 'ywlsh'},
    {title: '消息', dataIndex: 'msg', key: 'msg', search: false},
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
            return row.status === 0 ? <Tag color="success"> 成功 </Tag> : <Tag color="error">失败</Tag>;
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

export const InternetLogTable = ({url}: Url) => {

    const [collapsed, setCollapsed] = useState(false);
    const list = (params: Record<string, unknown> & { pageSize?: number | undefined, current?: number | undefined, keyword?: string | undefined }) => {
        return axios.get(`${url}?${qs.stringify(params)}`).then(res => {
            return {
                data: res.data.data.records,
                total: res.data.data.total,
                success: res.data.code === 0,
            };
        })
    }

    return (
        <ProTable<LogType>
            columns={internetcolumns}
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

export const IntranetLogTable = ({url}: Url) => {

    const [collapsed, setCollapsed] = useState(false);
    const list = (params: Record<string, unknown> & { pageSize?: number | undefined, current?: number | undefined, keyword?: string | undefined }) => {
        return axios.get(`${url}?${qs.stringify(params)}`).then(res => {
            return {
                data: res.data.data.records,
                total: res.data.data.total,
                success: res.data.code === 0,
            };
        })
    }

    return (
        <ProTable<LogType>
            columns={intranetcolumns}
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


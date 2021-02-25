import React, {useState} from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Tag, Button, message} from "antd";
import axios from "axios";
import qs from "qs";
import dayjs from 'dayjs';


interface Order {
    /** 主键;主键 */
    id: string;
    /** 项目名称 */
    projectName: string;
    /** 业务流水号 */
    ywlsh: string;
    /** 申请人名称 */
    sqrmc: string;
    /** 总金额;金额 */
    amt: number;
    /** 缴费状态;-1待缴费  0为缴费成功 1为缴费失败 */
    payStatus: number;
    /** 创建时间 */
    createdTime: number;
}

export const columns: ProColumns<Order>[] = [
    {title: '项目名称', dataIndex: 'projectName', key: 'projectName', search: false},
    {title: '业务号', dataIndex: 'ywlsh', key: 'ywlsh'},
    {title: '申请人名称', dataIndex: 'sqrmc', key: 'sqrmc', search: false},
    {
        title: '金额', dataIndex: 'amt', key: 'amt', search: false,
        render: (_, row) => {
            return row.amt && '￥' + (row.amt / 100)
        },
    },
    {
        title: '状态', dataIndex: 'status', key: 'status', search: false,
        render: (_, row) => {
            return row.payStatus === 0 ? <Tag color="success"> 支付成功 </Tag>
                :
                (row.payStatus === 1 ? <Tag color="error">缴费失败</Tag> : <Tag color="error">待缴费</Tag>);
        },
    },
    {
        title: '时间', dataIndex: 'createdTime', key: 'createdTime', valueType: 'dateTimeRange',
        search: {
            transform: (value: any) => ({startTime: value[0], endTime: value[1]}),
        },
        render: (_, row) => {
            return dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss')
        },
    },
    {
        title: '出票状态',
        render: () => {
            return <Tag color="error">未出票</Tag>
        },
    },
    {
        title: '操作',
        render: (_, row) => {
            return <Button type="primary" danger onClick={() => {
                axios.get(`/intranet/bill/makeInvoice?ywlsh=${row.ywlsh}`).then((res) => {
                    if (res.data.code === 0) {
                        message.info('开票信息已提交')
                    }
                }).catch((err) => {
                    message.error(err)
                })
            }}>
                重开票
            </Button>
        },
    },
];


export const NoTicket = () => {
    const [collapsed, setCollapsed] = useState(false);
    const list = (params: Record<string, unknown> & { pageSize?: number | undefined, current?: number | undefined, keyword?: string | undefined }) => {
        return axios.get(`/intranet/query/noTicket?${qs.stringify(params)}`).then(res => {
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


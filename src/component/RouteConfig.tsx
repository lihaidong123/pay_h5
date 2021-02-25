import React, {useState, useEffect} from "react";
import {Menu} from "antd";
import {
    PieChartOutlined, StockOutlined,
    FundOutlined, EditOutlined,
    AreaChartOutlined, BarChartOutlined,
    LineChartOutlined, HeatMapOutlined
} from "@ant-design/icons";
import {useRoutes, Link} from "react-router-dom";

import {NoTicket} from "../page/NoTicket";
import {InternetBills, IntranetBills} from "../page/BillsLog";
import {InternetOrder, IntranetOrder} from "../page/OrderLog";
import {OrderDetail} from "../page/OrderDetail";
import {IcbcOrder} from "../page/IcbcOrder";
import {BillsDetail} from "../page/BillsDetail";

const menu = [
    {
        key: 'index',
        path: '/',
        name: '未出票',
        icon: <EditOutlined/>,
        element: <NoTicket/>,
    },
    {
        key: 'IcbcOrder',
        path: '/IcbcOrder',
        name: '工行订单',
        icon: <AreaChartOutlined/>,
        element: <IcbcOrder/>,
    },
    {
        key: 'OrderDetail',
        path: '/OrderDetail',
        name: '订单详情',
        icon: <BarChartOutlined/>,
        element: <OrderDetail/>,
    },
    {
        key: 'BillsDetail',
        path: '/BillsDetail',
        name: '票据详情',
        icon: <PieChartOutlined/>,
        element: <BillsDetail/>,
    },
    {
        key: 'InternetBills',
        path: '/InternetBills',
        name: '外网票据',
        icon: <LineChartOutlined/>,
        element: <InternetBills/>,
    },
    {
        key: 'InternetOrder',
        path: '/InternetOrder',
        name: '外网订单',
        icon: <HeatMapOutlined/>,
        element: <InternetOrder/>,
    },
    {
        key: 'IntranetBills',
        path: '/IntranetBills',
        name: '内网票据',
        icon: <FundOutlined/>,
        element: <IntranetBills/>,
    },
    {
        key: 'IntranetOrder',
        path: '/IntranetOrder',
        name: '内网订单',
        icon: <StockOutlined/>,
        element: <IntranetOrder/>,
    }
]

export const Routes = () => {
    let routes = useRoutes(menu.map((item) => {
        return {
            path: item.path,
            element: item.element
        }
    }));
    return routes;
}

export const MenuList = () => {
    let pathname = window.location.pathname;
    let selectKey = menu[0].key;

    let name = menu[0].name;
    let title = document.title.split('_')[0];
    menu.map((item) => {
        if (item.path === pathname) {
            selectKey = item.key;
        }
    })
    document.title = title + '_' + name;

    const menuList = menu.map((item) => {
        return <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
    })

    return <Menu
        defaultSelectedKeys={[selectKey]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        onSelect={(item) => {
            menu.map((menuItem) => {
                if (item.key === menuItem.key) {
                    document.title = title + '_' + menuItem.name;
                }
            })
        }}
    >
        {menuList}
    </Menu>
}


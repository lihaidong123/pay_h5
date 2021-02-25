import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Card, Layout} from "antd";
import {Routes, MenuList} from './component/RouteConfig'
import Logo from './rmb.svg'
import './App.less';

const {Sider, Content} = Layout;

function App() {
    return <Router>
        <Layout>
            <Sider>
                <div style={{height: '100vh'}}>
                    <div className={'logo'}>
                        <a className={'logo-container'}>
                            <img src={Logo} alt=""/>
                            <h2 style={{color: '#fff', margin: 0}}>支付后台管理</h2>
                        </a>
                    </div>
                    <MenuList/>
                </div>
            </Sider>
            <Layout>
                <Content style={{padding: '50px 20px'}}>
                    <Routes/>
                </Content>
            </Layout>
        </Layout>
    </Router>
}

export default App;

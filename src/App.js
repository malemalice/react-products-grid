import React from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import List from './components/List'

const { Header, Content, Footer } = Layout;

const App = ()=> {
  return (
    <Layout className="layout">
      <Header style={{ background: '#fff', padding: '0 275px' }}>
        <Icon className={'trigger'} type={'menu-fold'} /> ASCII STORE
      </Header>
    <Content style={{ padding: '0 300px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products Page</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <List/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default App;

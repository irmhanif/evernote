import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StarFilled,
  UserOutlined,
  HomeFilled,
  PlusOutlined,
  FileTextFilled,
  CheckCircleFilled
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Sider } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '100vh'}}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Mohamed Idris M',
            },
            {
              key: '2',
              icon: <PlusOutlined />,
              label: 'New',
            },
            {
              key: '3',
              icon: <HomeFilled />,
              label: 'Home',
            },
            {
              key: '4',
              icon: <StarFilled />,
              label: 'Shortcuts',
            },
            {
              key: '5',
              icon: <FileTextFilled />,
              label: 'Notes',
            },
            {
              key: '6',
              icon: <CheckCircleFilled />,
              label: 'Tasks',
            },
          ]}
        />
      </Sider>
      <Layout>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        
      </Layout>
    </Layout>
  );
};
export default App;
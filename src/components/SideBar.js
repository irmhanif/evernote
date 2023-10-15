import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    StarFilled,
    HomeFilled,
    PlusOutlined,
    FileTextFilled,
    CheckCircleFilled
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import Profile from './Profile';

function SideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const { Sider } = Layout;
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }} className='bg-primary'>
            <div className="demo-logo-vertical" />
            <Profile />
            <Menu
                theme="dark"
                className='bg-primary'
                mode="inline"
                defaultSelectedKeys={['2']}
                items={[
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
        </Sider>
    )
}

export default SideBar
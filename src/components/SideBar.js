import React, { useState, useEffect } from 'react'
import cs from 'classnames';
import {
    StarFilled,
    HomeFilled,
    PlusOutlined,
    FileTextFilled,
    CheckCircleFilled
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import {
    BsChevronLeft,
    BsChevronRight
} from "react-icons/bs";
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { detectMobile } from '../helpers';

function SideBar() {
    const navigate = useNavigate();

    const url = window.location.href;
    const valueAfterSlash = url.split('/').pop();
    console.log(valueAfterSlash);

    const [collapsed, setCollapsed] = useState(detectMobile());
    const { Sider } = Layout;
    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState(240); // Initial width
    const minWidth = 210; // Minimum width
    const maxWidth = 400; // Maximum width
    const thresholdWidth = 100; // Width threshold for auto-collapse
    const collapsedWidth = 80; // Width when collapsed


    const handleMouseDown = () => {
        setIsResizing(true);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            let newWidth = e.clientX;
            // Enforce minimum and maximum width
            if (newWidth < thresholdWidth) {
                setWidth(collapsedWidth);
                setCollapsed(true)
            } else if (newWidth > thresholdWidth && newWidth <= minWidth) {
                newWidth = 210
                setCollapsed(false)
            }
            if (newWidth >= minWidth && newWidth <= maxWidth) {
                setWidth(newWidth);
            }

        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isResizing]);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                height: '100vh',
                minWidth: `${minWidth}px`, // Minimum width
                maxWidth: `${maxWidth}px`, // Maximum width
                boxSizing: 'border-box'
            }}
            width={width}
            className={cs('bg-primary group relative', collapsed && 'reducedSideBar')}
        >
            <div
                className={cs('sideBarResizer')}
                onMouseDown={handleMouseDown}
            />
            <div className="demo-logo-vertical" />
            <div style={{ userSelect: 'none' }}>
                <Profile collapsed={!collapsed} />
                <Menu
                    theme="dark"
                    className='bg-primary'
                    mode="inline"
                    defaultSelectedKeys={valueAfterSlash || 'home'}
                    items={[
                        {
                            key: '2',
                            icon: <PlusOutlined />,
                            label: 'New',
                        },
                        {
                            key: 'home',
                            icon: <HomeFilled />,
                            label: 'Home',
                            onClick: () => {
                                navigate('/');
                            }
                        },
                        {
                            key: 'shortCuts',
                            icon: <StarFilled />,
                            label: 'Shortcuts',
                            onClick: () => {
                                navigate('/shortCuts');
                            }
                        },
                        {
                            key: 'notes',
                            icon: <FileTextFilled />,
                            label: 'Notes',
                            onClick: () => {
                                navigate('/notes');
                            }
                        },
                        {
                            key: 'tasks',
                            icon: <CheckCircleFilled />,
                            label: 'Tasks',
                            onClick: () => {
                                navigate('/tasks');
                            }
                        },
                    ]}
                />
                <Button
                    type="text"
                    icon={collapsed ? <BsChevronRight /> : <BsChevronLeft />}
                    className={cs('collapseButton ')}
                    onClick={() => {
                        setCollapsed(!collapsed)
                        setWidth(240)
                    }}
                    style={{
                        color: '#fff'
                    }}
                />
            </div>
        </Sider>
    )
}

export default SideBar
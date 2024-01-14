import React from 'react'
import { BrowserRouter as Router, Route as RouteV6, Routes, useNavigate } from 'react-router-dom'
import '../App.scss';
import { Layout, theme } from 'antd';
import Home from './Home';
import SideBar from '../components/SideBar';
import Notes from './Notes';
import NotFound from './NotFound';

function Dashboard() {
    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='main-layout' style={{ background: colorBgContainer }}>
            <SideBar />
            <Layout className='content-area'>
                <Routes>
                    <RouteV6 path="/projects/featherNotes/" element={<Home />} />
                    <RouteV6 path="/projects/featherNotes/notes" element={<Notes />} />
                    <RouteV6 path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Layout>
    )
}

export default Dashboard
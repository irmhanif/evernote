import React from 'react';
import { BrowserRouter as Router, Route as RouteV6, Routes } from 'react-router-dom'
import './App.scss';
import { Layout, theme } from 'antd';
import Home from './pages/Home';
import SideBar from './components/SideBar';
import NotFound from './pages/NotFound';

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout className='main-layout' style={{ background: colorBgContainer }}>
        <SideBar />
        <Layout className='content-area'>
          <Routes>
            <RouteV6 path="/" element={<Home />} />
            <RouteV6 path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;
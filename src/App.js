import React from 'react';
import './App.scss';
import { Layout, theme } from 'antd';
import Home from './pages/Home';
import SideBar from './components/SideBar';

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(colorBgContainer)
  return (
    <Layout >
      <SideBar />
      <Layout>
        <Home />
      </Layout>
    </Layout>
  );
};
export default App;
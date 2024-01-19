import React from 'react';
import { BrowserRouter as Router, Route as RouteV6, Routes, Navigate } from 'react-router-dom'
import './App.scss';
import { theme } from 'antd';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { checkLoginStatus } from './helpers'

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // Your logic to check if the user is logged in
  // This is just a placeholder; you should replace it with your actual authentication logic

  return (
    <>
      {/* <Dashboard /> */}
      <Router>
        <div style={{ background: colorBgContainer }}>
          <Routes>
            {/* <RouteV6 path="/" element={<Navigate to="/projects/featherNotes" />} /> */}
            <RouteV6 path="/projects/featherNotes/login" element={<Login />} />

            <RouteV6
              path="/projects/featherNotes"
              element={checkLoginStatus() ? <Dashboard /> : <Navigate to="/projects/featherNotes/login" />}
            />
            <RouteV6 path="*" element={checkLoginStatus() ? <Dashboard /> : <Navigate to="/projects/featherNotes/login" />} />
          </Routes>
        </div>
      </Router></>
  );
};
export default App;
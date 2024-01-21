import React, { useEffect } from 'react';
import { Route as RouteV6, Routes, Navigate, useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()
  useEffect(() => {
    if (checkLoginStatus()) {
      navigate('/projects/featherNotes');
    } else {
      navigate('/projects/featherNotes/login');
    }
  }, [])

  return (
    <div style={{ background: colorBgContainer }}>
      <Routes>
        {/* <RouteV6 path="/" element={<Navigate to="/projects/featherNotes" />} /> */}
        <RouteV6 path="/projects/featherNotes/login" element={<Login />} />

        <RouteV6
          path="/projects/featherNotes"
          element={<Dashboard />}
        />
        <RouteV6 path="*" element={checkLoginStatus() ? <Dashboard /> : <Navigate to="/projects/featherNotes/login" />} />
      </Routes>
    </div>
  );
};
export default App;
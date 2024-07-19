import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminGenLogin from './pages/AdminGenLogin';
import ChooseUser from './pages/ChooseUser';
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout';

console.log({ Homepage, AdminGenLogin, ChooseUser, AdminDashboard });

const App = () => {
  const { currentRole } = useSelector(state => state.user);
  console.log('currentRole:', currentRole);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chooseUser" element={<ChooseUser />} />
        <Route path="/adminGenLogin" element={<AdminGenLogin />} />
        <Route path="/adminDashboard" element={currentRole === "AdminGen" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

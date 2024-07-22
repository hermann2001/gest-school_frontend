import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import AdminGenLogin from './pages/adminGen/AdminGenLogin';
import AdminDashboard from './pages/adminGen/AdminDashboard';
import ChooseUser from './pages/ChooseUser';

const App = () => {
  const { currentRole } = useSelector(state => state.user);
  console.log('currentRole:', currentRole);

  return (
    <Router>
      <Routes>
        {currentRole === null ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/chooseUser" element={<ChooseUser />} />
            <Route path="/adminGenLogin" element={<AdminGenLogin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : currentRole === "AdminGen" ? (
          <Route path="/*" element={<AdminDashboard />} />
        ) : (
          <Route path="*" element={<Navigate to="/adminGenLogin" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {/* {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      } */}

      {/* {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      } */}
    </Router>
  )
}

export default App
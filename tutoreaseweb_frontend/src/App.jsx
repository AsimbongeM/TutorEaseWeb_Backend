import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ClassSession from "./components/ClassSession.jsx";
// import Home from "./components/Home.jsx";
import NavBar from "./navigation/NavBar.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentProfile from "./components/StudentProfile.jsx";


function App() {

  return (

      <div>
          <NavBar />
          <Routes>
              <Route exact path="/" element={<StudentDashboard />} />
              <Route path="/class_session" element={<ClassSession />} />
              <Route path="/student_profile" element={<StudentProfile />} />
              </Routes>
      </div>


  )
}

export default App

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ClassSession from "./components/ClassSession.jsx";
import NavBar from "./navigation/NavBar.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentProfile from "./components/StudentProfile.jsx";
import TutorProfile from "./components/TutorProfile.jsx";


function App() {

  return (

      <div>
          {/*<NavBar />*/}
          <Routes>
              <Route exact path="/" element={<TutorProfile />} />
              <Route path="/class_session" element={<ClassSession />} />
              <Route path="/student_dashboard" element={<StudentDashboard />} />
              <Route path="/student_profile" element={<StudentProfile />} />
              <Route path="/tutorprofile" element={<TutorProfile />} />

              </Routes>
      </div>


  )
}

export default App

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ClassSession from "./components/ClassSession.jsx";
import NavBar from "./navigation/NavBar.jsx";
import TutorProfile from "./components/TutorProfile.jsx";


function App() {

  return (

      <div>
          <NavBar />
          <Routes>
              <Route exact path="/" element={<TutorProfile />} />
              <Route path="/class_session" element={<ClassSession />} />
              <Route path="/tutor_profile" element={<TutorProfile/>}/>
              </Routes>
      </div>


  )
}

export default App

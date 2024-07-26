import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ClassSession from "./components/ClassSession.jsx";
import Home from "./components/Home.jsx";
import NavBar from "./navigation/NavBar.jsx";


function App() {

  return (

      <div>
          <NavBar />
          <Routes>
              <Route exact path="/" element={<ClassSession />} />
              <Route path="/class_session" element={<ClassSession />} />
              </Routes>
      </div>


  )
}

export default App

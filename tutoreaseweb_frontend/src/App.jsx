import {Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn';
import ClassSession from "./components/ClassSession.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentProfile from "./components/StudentProfile.jsx";
import TutorProfile from "./components/TutorProfile.jsx";
import TutorRegistration from "./components/TutorRegistration.jsx";
import StudentRegistration from "./components/StudentRegistration.jsx";


function App() {

  return (

      <div>
          {/*<NavBar />*/}
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/class_session/:sessionId" element={<ClassSession />} />
              <Route path="/student_dashboard" element={<StudentDashboard />} />
              <Route path="/student_profile" element={<StudentProfile />} />
              <Route path="/tutorprofile" element={<TutorProfile />} />
              <Route path="/tutor_registration" element={<TutorRegistration />} />
              <Route path="/student_registration" element={<StudentRegistration />} />

              </Routes>
      </div>


  )
}

export default App

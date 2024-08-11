
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn';
import ClassSession from "./components/ClassSession.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentProfile from "./components/StudentProfile.jsx";
import TutorProfile from "./components/TutorProfile.jsx";
import TutorRegistration from "./components/TutorRegistration.jsx";
import StudentRegistration from "./components/StudentRegistration.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import TutorDashboard from "./components/TutorDashboard.jsx";


function App() {

  return (

      <div>
          {/*<NavBar />*/}
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/class-session/:sessionId" element={<ClassSession />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student-profile" element={<StudentProfile />} />
              <Route path="/tutor-dashboard" element={<TutorDashboard/>} />
              <Route path="/tutor-profile" element={<TutorProfile />} />
              <Route path="/tutor-registration" element={<TutorRegistration />} />
              <Route path="/student-registration" element={<StudentRegistration />} />

              </Routes>
      </div>


  )
}

export default App

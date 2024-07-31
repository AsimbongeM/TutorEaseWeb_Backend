import { Route, Routes } from 'react-router-dom';
import ClassSession from "./components/ClassSession.jsx";
import NavBar from "./navigation/NavBar.jsx";
import TutorProfile from "./components/TutorProfile.jsx";
import StudentRegistration from "./components/StudentRegistration.jsx";
import TutorRegistration from "./components/TutorRegistration.jsx";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<TutorProfile />} />
                <Route path="/class_session" element={<ClassSession />} />
                <Route path="/tutor_profile" element={<TutorProfile />} />
                <Route path="/student_registration" element={<StudentRegistration />} />
                <Route path="/tutor_registration" element={<TutorRegistration />} />
            </Routes>
        </div>
    );
}

export default App;

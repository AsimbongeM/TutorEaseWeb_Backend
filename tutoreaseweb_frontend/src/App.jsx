import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn';
import ClassSession from "./components/ClassSession.jsx";
// import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentProfile from "./components/StudentProfile.jsx";
import TutorProfile from "./components/TutorProfile.jsx";
import TutorRegistration from "./components/TutorRegistration.jsx";
import StudentRegistration from "./components/StudentRegistration.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
// import TutorDashboard from "./components/TutorDashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Resources from "./components/tutor/Resources.jsx";
import Announcements from "./components/tutor/Announcements.jsx";
import Schedule from "./components/tutor/Schedule.jsx";
import Calendar from "./components/tutor/Calendar.jsx";
import Content from "./components/tutor/Content.jsx";
import BookSession from "./components/BookSession.jsx";

function App() {
    const location = useLocation();
    // Define routes where Sidebar should not be visible
    const noSidebarRoutes = ['/', '/home', '/sign-in', '/forgot-password', '/student-registration', '/tutor-registration'];

    // Determine if Sidebar should be visible
    const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

    return (
        <div>
            {shouldShowSidebar && <Sidebar />}
            <div style={{ marginLeft: shouldShowSidebar ? '250px' : '0', paddingTop: shouldShowSidebar ? '80px' : '20px' }}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/class-session/:sessionId" element={<ClassSession />} />
                    {/*<Route path="/student-dashboard" element={<StudentDashboard />} />*/}
                    <Route path="/student-profile" element={<StudentProfile />} />
                    {/*<Route path="/tutor-dashboard" element={<TutorDashboard />} />*/}
                    <Route path="/tutor-profile" element={<TutorProfile />} />
                    <Route path="/tutor-registration" element={<TutorRegistration />} />
                    <Route path="/student-registration" element={<StudentRegistration />} />
                    <Route path="/content" element={<Content />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/book-session" element={<BookSession />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

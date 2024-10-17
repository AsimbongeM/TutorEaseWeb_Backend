import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn';
import ClassSession from "./components/ClassSession.jsx";
// import StudentDashboard from "./components/StudentDashboard.jsx";
import StudentProfile from "./components/student/StudentProfile.jsx";
import TutorProfile from "./components/tutor/TutorProfile.jsx";
import TutorRegistration from "./components/tutor/TutorRegistration.jsx";
import StudentRegistration from "./components/student/StudentRegistration.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
// import TutorDashboard from "./components/TutorDashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Resources from "./components/tutor/Resources.jsx";
import Announcements from "./components/tutor/Announcements.jsx";
import Schedule from "./components/tutor/Schedule.jsx";
import Calendar from "./components/tutor/Calendar.jsx";
import Content from "./components/tutor/Content.jsx";
import BookSession from "./components/student/BookSession.jsx";
// import AdminSignIn from "./components/admin/adminSignin.jsx";
import AdminDashboard from "./components/admin/screens/AdminDashboard.jsx";
import AdminLayout from "./components/admin/screens/AdminLayout.jsx";
import ViewTutors from "./components/admin/screens/viewTutors.jsx";
import TutorApplications from "./components/admin/screens/TutorApplications.jsx";
import ViewStudents from "./components/admin/screens/viewStudents.jsx";
import {AuthContext} from "./components/AuthContext.jsx";
import {useContext} from "react";
import AdminSidebar from "./components/admin/screens/adminSidebar.jsx";
import AdminNotifications from './components/admin/screens/AdminNotifications.jsx';
import AdminVoucher from './components/admin/screens/AdminVoucher.jsx';
import CreateTopic from './components/tutor/Topic.jsx';


function App() {
    const location = useLocation();
    const { auth } = useContext(AuthContext);
    // Define routes where Sidebar should not be visible
    const noSidebarRoutes = ['/', '/home', '/sign-in', '/forgot-password', '/student-registration', '/tutor-registration'];

    // Determine if Sidebar should be visible
    const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);
    // Determine which Sidebar to show
    const isAdmin = auth?.role === 'admin';
    const SidebarComponent = isAdmin ? AdminSidebar : Sidebar;
    return (
        <div>
            {shouldShowSidebar && <SidebarComponent />}
            <div style={{ marginLeft: shouldShowSidebar ? (isAdmin ?  '250px': '250px'): '0', paddingTop: shouldShowSidebar ? '80px' : '20px' }}>
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
                    <Route path="/create-topic" element = {<CreateTopic />} />
                    <Route path="/book-session" element={<BookSession />} />
                    {/*<Route path="/admin-login" element={<AdminSignIn />} />*/}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    {/* Admin routes wrapped in AdminLayout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="view-tutors" element={<ViewTutors />} />
                        <Route path="tutor-applications" element={<TutorApplications />} />
                        <Route path="view-students" element={<ViewStudents />} />
                        <Route path="manage-applications" element={<TutorApplications />} />
                        <Route path="admin-notifications" element={<AdminNotifications />} />
                        <Route path="/admin/manage-vouchers" element={<AdminVoucher />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;

import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { getAllStudents } from '../../services/StudentService'; 
import { getAllTutors } from '../../services/TutorServices';
import AdminNotifications from './AdminNotifications';

const AdminDashboard = () => {
    const [tutorCount, setTutorCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchCounts = async () => {
            setLoading(true);
            try {
                // Get the number of tutors
                const tutorsResponse = await getAllTutors();
                const tutors = tutorsResponse.data || [];  
                setTutorCount(tutors.length);
                
                // Count the number of pending applications
                const pendingApplications = tutors.filter(tutor => tutor.approvalStatus === 'PENDING');
                setPendingApplicationsCount(pendingApplications.length);
                
                // Get the number of students
                const studentsResponse = await getAllStudents();
                const students = studentsResponse.data || []; 
                setStudentCount(students.length);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCounts();
    }, []); 

    if (loading) {
        return (
            <div className="admin-dashboard-content">
                <h2>Admin Dashboard</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-content">
            <h2>Admin Dashboard</h2>
            <div className="dashboard-widgets">
                <div className="widget">
                    <h3>Total Tutors</h3>
                    <p>{tutorCount}</p>
                </div>
                <div className="widget">
                    <h3>Total Students</h3>
                    <p>{studentCount}</p>
                </div>
                <div className="widget">
                    <h3>Pending Applications</h3>
                    <p>{pendingApplicationsCount}</p>
                </div>
            </div>
            <div className="notifications-card">
                
                <AdminNotifications />
            </div>
        </div>
    );
};

export default AdminDashboard;

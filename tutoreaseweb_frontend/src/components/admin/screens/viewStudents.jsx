import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../../../services/StudentService.js'; // Import your service function
import '../styles/viewStudents.css'; // Import the CSS file for styling
import { FaUserAlt, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa'; // Import React Icons

const ViewStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="view-students">
            <div className="content">
                <h1 className="header">All Students</h1>
                <div className="student-cards">
                    {students.map(student => (
                        <div className="student-card" key={student.email}>
                            {student.profilePicture && (
                                <img
                                    src={`data:image/jpeg;base64,${student.profilePicture}`}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    className="student-image"
                                />
                            )}
                            <h2>{student.firstName} {student.lastName}</h2>
                            <p><FaUserAlt /> {student.email}</p>
                            <p><FaPhoneAlt /> {student.cellNumber}</p>
                            <p><FaCalendarAlt /> Joined on: {new Date(student.joinedDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewStudents;

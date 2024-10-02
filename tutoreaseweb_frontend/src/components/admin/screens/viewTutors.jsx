import React, { useState, useEffect } from 'react';
import { getAllTutors } from '../../../services/TutorServices.js'; // Import the new service function
import '../styles/viewTutors.css';

const ViewTutors = () => {
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await getAllTutors(); // Fetch all tutors using the new function
                setTutors(response.data);
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };

        fetchTutors();
    }, []);

    return (
        <div className="view-tutors">
            <div className="content">
                <h1 className="header">All Tutors</h1>
                <div className="tutor-cards">
                    {tutors.map(tutor => (
                        <div className="tutor-card" key={tutor.email}>
                            {tutor.profilePicture && (
                                <img
                                    src={`data:image/jpeg;base64,${tutor.profilePicture}`}
                                    alt={`${tutor.firstName} ${tutor.lastName}`}
                                    className="tutor-image"
                                />
                            )}
                            <h2>{tutor.firstName} {tutor.lastName}</h2>
                            <p><strong>Skills:</strong> {tutor.skills}</p>
                            <p><strong>Experience:</strong> {tutor.experience} years</p>
                            <p><strong>Cell Number:</strong> {tutor.cellNumber}</p>
                            <p><strong>Approval Status:</strong> {tutor.approvalStatus}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewTutors;

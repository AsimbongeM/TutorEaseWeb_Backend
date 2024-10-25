import React, { useState, useEffect } from 'react';
import { getAllTutors, updateTutor1, deleteTutorById } from '../../../services/TutorServices.js';
import '../styles/TutorApplications.css';

const TutorApplications = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingTutors();
    }, []);

    const fetchPendingTutors = async () => {
        setLoading(true);
        try {
            const response = await getAllTutors();
            const pendingTutors = response.data.filter(tutor => tutor.approvalStatus === 'PENDING');
            setTutors(pendingTutors);
        } catch (error) {
            console.error('Error fetching tutors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (email) => {
        try {
            const tutorToUpdate = tutors.find(tutor => tutor.email === email);
            const updatedTutor = { ...tutorToUpdate, approvalStatus: 'APPROVED' };
            await updateTutor1(email, updatedTutor);
            fetchPendingTutors(); // Refetch pending tutors
        } catch (error) {
            console.error('Error approving tutor:', error);
        }
    };

    const handleDecline = async (email) => {
        try {
            const tutorToUpdate = tutors.find(tutor => tutor.email === email);
            const updatedTutor = { ...tutorToUpdate, approvalStatus: 'DECLINED' };
            await updateTutor1(email, updatedTutor);
            fetchPendingTutors(); // Refetch pending tutors
        } catch (error) {
            console.error('Error declining tutor:', error);
        }
    };

    const handleDelete = async (email) => {
        try {
            await deleteTutorById(email);
            fetchPendingTutors(); // Refetch pending tutors
        } catch (error) {
            console.error('Error deleting tutor:', error);
        }
    };

    return (
        <div className="tutor-applications">
            <div className="content">
                <h1 className="header">Pending Tutor Applications</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="tutor-cards">
                        {tutors.length > 0 ? (
                            tutors.map(tutor => (
                                <div className="tutor-card" key={tutor.email}>
                                    <h2>{tutor.firstName} {tutor.lastName}</h2>
                                    <p><strong>Skills:</strong> {tutor.skills}</p>
                                    <p><strong>Experience:</strong> {tutor.experience} years</p>
                                    <p><strong>Cell Number:</strong> {tutor.cellNumber}</p>
                                    <p><strong>Approval Status:</strong> {tutor.approvalStatus}</p>
                                    <div className="actions">
                                        <button
                                            className="approve-button"
                                            onClick={() => handleApproval(tutor.email)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="decline-button"
                                            onClick={() => handleDecline(tutor.email)}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No pending tutor applications.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorApplications;

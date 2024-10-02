import React, { useState, useEffect } from 'react';
import { getAllTutors, updateTutor, deleteTutorById } from '../../services/TutorServices.js'; // Import the deleteTutorById function
import './TutorApplications.css'; // Import the CSS file for styling

const TutorApplications = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await getAllTutors(); // Fetch all tutors
                const pendingTutors = response.data.filter(tutor => tutor.approvalStatus === 'PENDING'); // Filter by pending status
                setTutors(pendingTutors);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tutors:', error);
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    const handleApproval = async (email) => {
        try {
            // Find the tutor to be updated
            const tutorToUpdate = tutors.find(tutor => tutor.email === email);

            // Update the approvalStatus
            const updatedTutor = { ...tutorToUpdate, approvalStatus: 'APPROVED' };

            // Send the updated object to the back-end
            await updateTutor(email, updatedTutor);

            // Update the tutor list state
            setTutors(tutors.map(tutor =>
                tutor.email === email ? updatedTutor : tutor
            ));
        } catch (error) {
            console.error('Error approving tutor:', error);
        }
    };
    const handleDecline = async (email) => {
        try {
            // Find the tutor to be updated
            const tutorToUpdate = tutors.find(tutor => tutor.email === email);

            // Update the approvalStatus
            const updatedTutor = { ...tutorToUpdate, approvalStatus: 'DECLINED' };

            // Send the updated object to the back-end
            await updateTutor(email, updatedTutor);

            // Update the tutor list state
            setTutors(tutors.map(tutor =>
                tutor.email === email ? updatedTutor : tutor
            ));
        } catch (error) {
            console.error('Error approving tutor:', error);
        }
    };

    const handleDelete = async (email) => {
        try {
            // Delete tutor from backend
            await deleteTutorById(email);

            // Remove the declined tutor from the list
            setTutors(tutors.filter(tutor => tutor.email !== email));
        } catch (error) {
            console.error('Error declining tutor:', error);
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

                                        {/*<button*/}
                                        {/*    className="delete-button"*/}
                                        {/*    onClick={() => handleDelete(tutor.email)}*/}
                                        {/*>*/}
                                        {/*    Delete*/}
                                        {/*</button>*/}
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

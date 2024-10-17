import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, InputGroup, Form, Modal } from 'react-bootstrap';
import { createBookSession, getAllBookSessions } from '../../services/BookSessionServices.js'; // Import your service here
import { getSessionsByTutorEmail, updateSession } from "../../services/ScheduleSessionServices.js"; // Import updateSession service
import { AuthContext } from "../AuthContext.jsx";
import { getApprovedTutors } from "../../services/TutorServices.js";

const BookSession = () => {
    const [loading, setLoading] = useState(true);
    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth && auth.email) {
            const fetchTutors = async () => {
                try {
                    const tutorsData = await getApprovedTutors();
                    setTutors(tutorsData.data);
                } catch (error) {
                    console.error('Error fetching tutors:', error);
                }
            };
            fetchTutors();
        }
    }, [auth]);

    const handleBook = (tutor) => {
        setSelectedTutor(tutor);
        setShowSessionsModal(true);
        fetchSessions(tutor.email); // Fetch sessions using tutor's email
    };

    const fetchSessions = async (tutorEmail) => {
        try {
            const sessionsData = await getSessionsByTutorEmail(tutorEmail); // Call the service to fetch sessions
            setSessions(sessionsData.data); // Set sessions for the selected tutor
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const confirmBooking = async (session) => {
        if (!auth || !auth.email) {
            console.error('User is not authenticated');
            return;
        }

        try {
            // Create full BookSession object to send
            const bookSessionData = {
                tutor: selectedTutor,  // Full tutor object
                student: {
                    email: auth.email,  // Use authenticated student's email
                    // Add more student details if necessary
                },
                scheduleSession: session  // Full session object
            };

            // Log the entire data structure before sending
            console.log("Data to be sent to backend:", bookSessionData);

            const response = await createBookSession(bookSessionData); // Call createBookSession service
            console.log('Session created:', response.data);

            // Handle the response that contains the full objects
            const { bookSessionID, tutor, student, scheduleSession } = response.data;
            console.log('Booked session details:', { bookSessionID, tutor, student, scheduleSession });

            // Optionally update the UI or show a confirmation message

            setShowBookingModal(false);
            setShowSessionsModal(false);
        } catch (error) {
            console.error('Create error:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredTutors = tutors.filter(tutor =>
        tutor.firstName.toLowerCase().includes(searchTerm) ||
        tutor.lastName.toLowerCase().includes(searchTerm) ||
        tutor.experience?.toLowerCase().includes(searchTerm) ||
        tutor.skills.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container mt-5">
            <h2>Available Tutors</h2>
            <InputGroup className="mb-4">
                <Form.Control
                    placeholder="Search tutors by name or experience..."
                    onChange={handleSearch}
                />
            </InputGroup>

            <div className="row mb-4">
                {filteredTutors.map(tutor => (
                    <div className="col-md-4" key={tutor.email}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{tutor.firstName} {tutor.lastName}</Card.Title>
                                <Card.Text>
                                    <strong>Experience:</strong> {tutor.experience}<br />
                                    <strong>Skill Level:</strong> {tutor.skills}<br />
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => handleBook(tutor)}
                                >
                                    Book Tutor
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Modal for session details */}
            <Modal show={showSessionsModal} onHide={() => setShowSessionsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedTutor?.firstName} {selectedTutor?.lastName}'s Sessions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sessions.length > 0 ? (
                        <ul>
                            {sessions.map(session => (
                                <li key={session.id}>
                                    <strong>Session ID:</strong> {session.id}<br />
                                    <strong>Date:</strong> {session.date}<br />
                                    <strong>Duration:</strong> {session.duration} hours<br />
                                    <Button 
                                        variant="primary" 
                                        onClick={() => confirmBooking(session)} // Pass the session to confirmBooking
                                    >
                                        Book Session
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No sessions for this tutor.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSessionsModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for confirming booking */}
            <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to book this tutor?<br />
                    <strong>Name:</strong> {selectedTutor?.firstName} {selectedTutor?.lastName}<br />
                    <strong>Experience:</strong> {selectedTutor?.experience}<br />
                    <strong>Skill Level:</strong> {selectedTutor?.skills}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBookingModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => confirmBooking(selectedTutor)}>Confirm Booking</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookSession;

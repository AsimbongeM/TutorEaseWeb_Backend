import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Form, InputGroup, Modal} from 'react-bootstrap';
import {createBookSession} from '../../services/BookSessionServices.js';
import {getSessionsByTutorEmail} from "../../services/ScheduleSessionServices.js";
import {AuthContext} from "../AuthContext.jsx";
import {getApprovedTutors} from "../../services/TutorServices.js";

const BookSession = () => {
    const [loading, setLoading] = useState(true);
    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(AuthContext);
    const [message, setMessage] = useState(null); // State for messages

    // Fetch approved tutors when the component mounts or when auth changes
    useEffect(() => {
        if (auth && auth.email) {
            console.log("Authenticated user:", auth);

            const fetchTutors = async () => {
                try {
                    const tutorsData = await getApprovedTutors();
                    console.log("Fetched tutors data:", tutorsData);
                    setTutors(tutorsData.data); // Update state with fetched tutors
                } catch (error) {
                    console.error('Error fetching tutors:', error);
                }
            };
            fetchTutors();
        }
    }, [auth]);

    const handleBook = (tutor) => {
        console.log("Selected tutor for booking:", tutor);
        setSelectedTutor(tutor);
        setShowSessionsModal(true);
        fetchSessions(tutor.email); // Fetch sessions using tutor's email
    };

    const fetchSessions = async (tutorEmail) => {
        console.log("Fetching sessions for tutor email:", tutorEmail);
        try {
            const sessionsData = await getSessionsByTutorEmail(tutorEmail);
            console.log("Fetched sessions data:", sessionsData);
            setSessions(sessionsData.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const confirmBooking = async (session) => {
        if (!auth || !auth.email) {
            setMessage({ text: 'User is not authenticated', type: 'danger' });
            return;
        }

        console.log("Selected session for booking:", session);

        try {
            // Constructing booking data
            const bookSessionData = {
                tutor: selectedTutor, // Full tutor object
                student: {
                    email: auth.email, // Authenticated student's email
                },
                scheduleSession: session, // Full session object
            };

            console.log("Data to be sent to backend:", bookSessionData);

            // Call the createBookSession service
            const response = await createBookSession(bookSessionData);

            // Set success message
            setMessage({ text: 'Booking successful!', type: 'success' });

            // Close both modals
            setShowBookingModal(false);
            setShowSessionsModal(false);

            // Mark the session as booked by updating its isBooked flag
            const updateResponse = await updateSession(session.id, { ...session, isBooked: true });
            console.log('Session update response', updateResponse);
            console.log(`Session data; id to booked.`, session.id);

            // Automatically hide the success message after 3 seconds
            setTimeout(() => {
                setMessage(null);
            }, 3000);

        } catch (error) {
            console.error('Error creating booking or updating session:', error);
            // Set error message
            setMessage({ text: 'Error creating booking. Please try again.', type: 'danger' });
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        console.log("Updated search term:", event.target.value.toLowerCase());
    };

    const filteredTutors = tutors.filter(tutor =>
        tutor.firstName.toLowerCase().includes(searchTerm) ||
        tutor.lastName.toLowerCase().includes(searchTerm) ||
        tutor.experience?.toLowerCase().includes(searchTerm) ||
        tutor.skills.toLowerCase().includes(searchTerm)
    );

    console.log("Filtered tutors based on search term:", filteredTutors);

    return (
        <div className="container mt-5">
            {message && (
                <div className={`alert alert-${message.type}`} role="alert">
                    {message.text}
                </div>
            )}

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
            <Modal show={showSessionsModal} onHide={() => setShowSessionsModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedTutor?.firstName} {selectedTutor?.lastName}'s Sessions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sessions.length > 0 ? (
                        <ul style={{listStyleType: 'none', padding: '0', margin: '0'}}>
                            {sessions.map(session => (
                                <li
                                    key={session.id}
                                    style={{
                                        marginBottom: '15px',
                                        padding: '20px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        backgroundColor: '#ffffff',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{flex: '1'}}>
                                            <strong>Session ID:</strong> {session.id} <br/>
                                            <strong>Date:</strong> {session.date} <br/>
                                            <strong>Start Time:</strong> {session.startTime} hours <br/>
                                            <strong>End Time:</strong> {session.endTime} hours
                                        </div>
                                        <Button
                                            variant="primary"
                                            onClick={() => confirmBooking(session)}
                                            style={{marginLeft: '15px', padding: '10px 20px'}}
                                        >
                                            <i className="fas fa-calendar-plus"></i> Book Session
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{textAlign: 'center', color: '#6c757d', padding: '20px'}}>No sessions available for
                            this tutor.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSessionsModal(false)}>
                        Close
                    </Button>
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

import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import { createBookSession, getAllBookSessions } from '../../services/BookSessionServices.js';
import { getSessionsByTutorEmail, updateSession } from "../../services/ScheduleSessionServices.js";
import { AuthContext } from "../AuthContext.jsx";
import { getApprovedTutors } from "../../services/TutorServices.js";

const BookSession = () => {
    const [loading, setLoading] = useState(true);
    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const [showAllSessionsModal, setShowAllSessionsModal] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [allSessions, setAllSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(AuthContext);
    const [message, setMessage] = useState(null);

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
        fetchSessions(tutor.email);
    };

    const fetchSessions = async (tutorEmail) => {
        try {
            const sessionsData = await getSessionsByTutorEmail(tutorEmail);
            setSessions(sessionsData.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const fetchAllSessions = async () => {
        try {
            const allSessionsData = await getAllBookSessions();
            setAllSessions(allSessionsData.data || []);
            console.log("All sessions: ", allSessionsData);
            setShowAllSessionsModal(true);
        } catch (error) {
            console.error('Error fetching all sessions:', error);
            setAllSessions([]);
        }
    };

    const confirmBooking = async (session) => {
        if (!auth || !auth.email) {
            setMessage({ text: 'User is not authenticated', type: 'danger' });
            return;
        }

        try {
            const bookSessionData = {
                tutor: selectedTutor,
                student: {
                    email: auth.email,
                },
                scheduleSession: session,
            };

            await createBookSession(bookSessionData);
            setMessage({ text: 'Booking successful!', type: 'success' });
            setShowBookingModal(false);
            setShowSessionsModal(false);

            await updateSession(session.id, { ...session, isBooked: true });

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error creating booking or updating session:', error);
            setMessage({ text: 'Error creating booking. Please try again.', type: 'danger' });
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

            <Button variant="info" onClick={fetchAllSessions}>
                View All Sessions
            </Button>

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

            {/* Modal for all booking sessions */}
            <Modal show={showAllSessionsModal} onHide={() => setShowAllSessionsModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>All Booked Sessions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allSessions.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                            {allSessions.map((x)=> (
                                <li key={x.id}>
                                    <div style={{
                                        padding: '10px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        marginBottom: '10px'
                                    }}>
                                        <strong>Student Name:</strong> {x.student.firstName} {x.student.lastName} <br />
                                        <strong>Tutor Name:</strong> {x.tutor.firstName} {x.tutor.lastName} <br />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No sessions available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAllSessionsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for session details */}
            {/* Modal for session details */}
            <Modal show={showSessionsModal} onHide={() => setShowSessionsModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>
                        {selectedTutor?.firstName} {selectedTutor?.lastName}'s Sessions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sessions.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                            {sessions.map(session => (
                                <li key={session.id}>
                                    <div>
                                        <strong>Session ID:</strong> {session.id} <br />
                                        <strong>Date:</strong> {session.date} <br />
                                        <strong>Start Time:</strong> {session.startTime} hours <br />
                                        <strong>End Time:</strong> {session.endTime} hours
                                        <Button
                                            variant="primary"
                                            onClick={() => confirmBooking(session)}
                                            style={{ marginLeft: '15px' }}
                                            disabled={session.isBooked} // Disable if already booked
                                        >
                                            <i className="fas fa-calendar-plus"></i> {session.isBooked ? 'Booked' : 'Book Session'}
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No sessions available for this tutor.</p>
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
                <Modal.Header>
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

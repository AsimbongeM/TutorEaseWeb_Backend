import React, { useState } from 'react';
import { Button, Card, Table, Modal, Form, InputGroup } from 'react-bootstrap';


const dummySessions = [
    { id: 1, topic: 'Introduction to Java', level: 'Beginner', tutor: 'Alice Johnson', date: '2024-08-20', time: '10:00 AM', slotsAvailable: 3 },
    { id: 2, topic: 'Object-Oriented Programming', level: 'Intermediate', tutor: 'Bob Smith', date: '2024-08-21', time: '11:00 AM', slotsAvailable: 5 },
    { id: 3, topic: 'Java Streams and Lambdas', level: 'Advanced', tutor: 'Carol White', date: '2024-08-22', time: '02:00 PM', slotsAvailable: 2 },
    { id: 4, topic: 'Exception Handling', level: 'Beginner', tutor: 'David Brown', date: '2024-08-23', time: '01:00 PM', slotsAvailable: 4 },
    { id: 5, topic: 'Java Collections Framework', level: 'Intermediate', tutor: 'Eva Green', date: '2024-08-24', time: '03:00 PM', slotsAvailable: 1 },

];

const BookSession = () => {
    const [sessions, setSessions] = useState(dummySessions);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleBook = (session) => {
        setSelectedSession(session);
        setShowModal(true);
    };

    const confirmBooking = () => {
        setBookedSessions([...bookedSessions, selectedSession]);
        setSessions(sessions.map(session =>
            session.id === selectedSession.id
                ? { ...session, slotsAvailable: session.slotsAvailable - 1 }
                : session
        ));
        setShowModal(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredSessions = sessions.filter(session =>
        session.topic.toLowerCase().includes(searchTerm) ||
        session.level.toLowerCase().includes(searchTerm) ||
        session.tutor.toLowerCase().includes(searchTerm) ||
        session.date.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container mt-5">
            <h2>Available Java Tutoring Sessions</h2>
            <InputGroup className="mb-4">
                <Form.Control
                    placeholder="Search sessions by topic, level, tutor, or date..."
                    onChange={handleSearch}
                />
            </InputGroup>

            <div className="row mb-4">
                {filteredSessions.map(session => (
                    <div className="col-md-4" key={session.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{session.topic}</Card.Title>
                                <Card.Text>
                                    <strong>Level:</strong> {session.level}<br />
                                    <strong>Tutor:</strong> {session.tutor}<br />
                                    <strong>Date:</strong> {session.date}<br />
                                    <strong>Time:</strong> {session.time}<br />
                                    <strong>Slots Available:</strong> {session.slotsAvailable}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => handleBook(session)}
                                    disabled={session.slotsAvailable === 0}
                                >
                                    {session.slotsAvailable > 0 ? 'Book Slot' : 'Full'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <h2>Booked Sessions</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Topic</th>
                    <th>Level</th>
                    <th>Tutor</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {bookedSessions.map(session => (
                    <tr key={session.id}>
                        <td>{session.topic}</td>
                        <td>{session.level}</td>
                        <td>{session.tutor}</td>
                        <td>{session.date}</td>
                        <td>{session.time}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to book this session?<br />
                    <strong>Topic:</strong> {selectedSession?.topic}<br />
                    <strong>Level:</strong> {selectedSession?.level}<br />
                    <strong>Tutor:</strong> {selectedSession?.tutor}<br />
                    <strong>Date:</strong> {selectedSession?.date}<br />
                    <strong>Time:</strong> {selectedSession?.time}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={confirmBooking}>Confirm Booking</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookSession;

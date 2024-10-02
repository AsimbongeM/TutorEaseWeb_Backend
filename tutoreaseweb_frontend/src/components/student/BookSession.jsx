import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, InputGroup, Form, Modal } from 'react-bootstrap';
import {createBookSession, getAllBookSessions, getBookSession} from '../../services/BookSessionServices.js';
import { AuthContext } from "../AuthContext.jsx";
import { getAllTutors } from "../../services/TutorServices.js";

const BookSession = () => {
    const [loading, setLoading] = useState(true);
    const [tutors, setTutors] = useState([]); // Empty array initially
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [studentSkillLevel, setStudentSkillLevel] = useState('Beginner'); // Example: student's skill level
    const [searchTerm, setSearchTerm] = useState('');
    const { auth } = useContext(AuthContext); // Access auth context

    useEffect(() => {
        if (auth && auth.email) {
            const fetchTutorsAndSessions = async () => {
                try {
                    // Fetch all booking sessions
                    // console.log('Sessions:', getBookSession(se));
                    // const sessions = await getBookSession.then(async (response) => {})();
                    // console.log('Sessions:', sessions);

                    // Fetch all tutors
                    const tutorsData = await getAllTutors().then((response) => {
                        selectedTutor(response.data)});
                    console.log('Tutors:', tutorsData);

                    // You can merge or filter the sessions and tutors data here if needed
                    setTutors(tutorsData); // Assuming `tutorsData` is what you want to display
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchTutorsAndSessions();
        }
    }, [auth]);

    const handleBook = (tutor) => {
        setSelectedTutor(tutor);
        setShowModal(true);
    };

    const confirmBooking = async () => {
        if (!auth || !auth.email) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const sessionData = {
                tutorId: selectedTutor.id,
                studentId: auth.email, // Use auth.email as student ID
                // Add additional session data as needed
            };
            const response = await createBookSession(sessionData);
            console.log('Session created:', response);
            setShowModal(false);
        } catch (error) {
            console.error('Create error:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredTutors = tutors.filter(tutor =>
        tutor.skillLevel === studentSkillLevel &&
        tutor.approvalStatus.toLowerCase() === 'approved' &&
        (
            tutor.firstName.toLowerCase().includes(searchTerm) ||
            tutor.lastName.toLowerCase().includes(searchTerm) ||
            tutor.experience.toLowerCase().includes(searchTerm)
        )
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
                    <div className="col-md-4" key={tutor.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{tutor.firstName} {tutor.lastName}</Card.Title>
                                <Card.Text>
                                    <strong>Experience:</strong> {tutor.experience}<br />
                                    <strong>Skill Level:</strong> {tutor.skillLevel}
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to book this tutor?<br />
                    <strong>Name:</strong> {selectedTutor?.firstName} {selectedTutor?.lastName}<br />
                    <strong>Experience:</strong> {selectedTutor?.experience}<br />
                    <strong>Skill Level:</strong> {selectedTutor?.skillLevel}
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

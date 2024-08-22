import React, { useContext, useEffect, useState } from 'react';
import { createSession, deleteSession, getSessionsByTutorEmail, updateSession } from "../../services/ScheduleSessionServices.js";
import { getAllTopics } from "../../services/TopicsServices.js";
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from "../AuthContext.jsx";

function Schedule() {
    const [sessions, setSessions] = useState([]);
    const [topics, setTopics] = useState([]);
    const [newSession, setNewSession] = useState({ date: '', topicId: '', startTime: '', endTime: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredButtonId, setHoveredButtonId] = useState(null);

    // Use AuthContext to get the signed-in tutor
    const { auth } = useContext(AuthContext);
    const tutorEmail = auth?.email;

    useEffect(() => {
        console.log('Tutor Email:', tutorEmail); // Debugging line to check the email value

        const fetchSessions = async () => {
            try {
                if (tutorEmail) {
                    const data = await getSessionsByTutorEmail(tutorEmail);
                    setSessions(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        const fetchTopics = async () => {
            try {
                const data = await getAllTopics();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchSessions();
        fetchTopics();
    }, [tutorEmail]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSession(prev => ({ ...prev, [name]: value }));
    };

    const handleTopicChange = (e) => {
        const topicId = e.target.value;
        setNewSession(prev => ({ ...prev, topicId }));
    };

    const validateFields = () => {
        const newErrors = {};
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        if (newSession.date < today) {
            newErrors.date = 'Date cannot be in the past';
        }
        if (!newSession.date) newErrors.date = 'Date is required';
        if (!newSession.startTime) newErrors.startTime = 'Start time is required';
        if (!newSession.endTime) newErrors.endTime = 'End time is required';
        if (newSession.startTime && newSession.endTime && newSession.startTime >= newSession.endTime) {
            newErrors.endTime = 'End time must be after start time';
        }
        if (newSession.startTime && newSession.endTime) {
            const start = new Date(`${newSession.date}T${newSession.startTime}`);
            const end = new Date(`${newSession.date}T${newSession.endTime}`);
            const diff = (end - start) / (1000 * 60 * 60); // Difference in hours
            if (diff > 2) newErrors.endTime = 'Session cannot exceed 2 hours';
        }
        if (!newSession.topicId) newErrors.topicId = 'Topic is required';
        if (!tutorEmail) newErrors.tutorEmail = 'Tutor email is missing'; // Check for missing email
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSession = async () => {
        if (!validateFields()) return;

        const sessionData = {
            date: newSession.date,
            topic: { id: newSession.topicId },
            startTime: newSession.startTime,
            endTime: newSession.endTime,
            tutor: { email: tutorEmail } // Associate session with the signed-in tutor
        };

        try {
            const savedSession = await createSession(sessionData);
            setSessions([...sessions, savedSession]);
        } catch (error) {
            console.error('Error creating session:', error);
        }

        setNewSession({ date: '', topicId: '', startTime: '', endTime: '' });
        setErrors({});
    };
    const handleEdit = (index) => {
        setNewSession({
            date: sessions[index].date,
            topicId: sessions[index].topic?.id || '',
            startTime: sessions[index].startTime || '',
            endTime: sessions[index].endTime || ''
        });
        setEditingIndex(index);
        setEditingId(sessions[index].id);
    };

    const handleDeleteConfirmation = (sessionId) => {
        setModalType('delete');
        setSelectedSessionId(sessionId);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        const sessionData = {
            date: newSession.date,
            topic: { id: newSession.topicId },
            startTime: newSession.startTime,
            endTime: newSession.endTime,
            tutor: { email: tutorEmail }
        };

        try {
            const updatedSession = await updateSession(editingId, sessionData);
            const updatedSessions = [...sessions];
            updatedSessions[editingIndex] = updatedSession;
            setSessions(updatedSessions);
        } catch (error) {
            console.error('Error updating session:', error);
        }

        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        setNewSession({ date: '', topicId: '', startTime: '', endTime: '' });
        setErrors({});
    };

    const handleDelete = async () => {
        try {
            await deleteSession(selectedSessionId);
            const updatedSessions = sessions.filter(session => session.id !== selectedSessionId);
            setSessions(updatedSessions);
        } catch (error) {
            console.error('Error deleting session:', error);
        }
        setShowModal(false);
        setSelectedSessionId(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSessionId(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSessions = Array.isArray(sessions) ? sessions.filter(session => {
        return (session.topic?.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
            (session.date?.includes(searchTerm) || '') ||
            (session.startTime?.includes(searchTerm) || '') ||
            (session.endTime?.includes(searchTerm) || '');
    }) : [];


    return (
        <section className="container mt-4">
            <h2 className="mb-4">Schedule</h2>

            <Form>
                <Form.Group controlId="formSearch">
                    <Form.Control
                        type="text"
                        placeholder="Search sessions..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mb-4"
                    />
                </Form.Group>
            </Form>

            <div className="mb-4">
                <select
                    name="topicId"
                    value={newSession.topicId}
                    onChange={handleTopicChange}
                    className="form-control mb-2"
                >
                    <option value="">Select a Topic</option>
                    {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>
                            {topic.description} - {topic.level} {/* Display topic level */}
                        </option>
                    ))}
                </select>
                {errors.topicId && <div className="text-danger">{errors.topicId}</div>}

                <input
                    type="date"
                    name="date"
                    value={newSession.date}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                {errors.date && <div className="text-danger">{errors.date}</div>}
                <input
                    type="time"
                    name="startTime"
                    value={newSession.startTime}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                {errors.startTime && <div className="text-danger">{errors.startTime}</div>}
                <input
                    type="time"
                    name="endTime"
                    value={newSession.endTime}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
                {errors.endTime && <div className="text-danger">{errors.endTime}</div>}

                <button
                    className="btn"
                    onClick={handleAddSession}
                    style={{
                        backgroundColor: '#00274d',
                        color: 'white',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        transform: hoveredButtonId === 'save' ? 'scale(1.05)' : 'none',
                        ...(hoveredButtonId === 'save' ? { backgroundColor: '#ffcc00', color: '#00274d' } : {}),
                    }}
                    onMouseEnter={() => setHoveredButtonId('save')}
                    onMouseLeave={() => setHoveredButtonId(null)}
                >
                    {editingIndex !== null ? 'Update Session' : 'Add Session'}
                </button>
            </div>

            {filteredSessions.length > 0 ? (
                <ul className="list-group">
                    {filteredSessions.map((session, index) => (
                        <li key={session.id} className="list-group-item">
                            <div>
                                <strong>Date:</strong> {session.date}<br />
                                <strong>Start Time:</strong> {session.startTime}<br />
                                <strong>End Time:</strong> {session.endTime}<br />
                                <strong>Topic:</strong> {session.topic?.description || 'N/A'}
                            </div>
                            <div className="mt-2">
                                <button
                                    className="btn btn-link"
                                    onClick={() => handleEdit(index)}
                                    style={{ marginRight: '10px' }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-link text-danger"
                                    onClick={() => handleDeleteConfirmation(session.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sessions found</p>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'delete' ? 'Confirm Deletion' : 'Update Session'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === 'delete'
                        ? 'Are you sure you want to delete this session?'
                        : 'Are you sure you want to update this session?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    {modalType === 'delete' ? (
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Schedule;

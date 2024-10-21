import React, { useContext, useEffect, useState } from 'react';
import { createSession, deleteSession, getSessionsByTutorEmail, updateSession } from "../../services/ScheduleSessionServices.js";
import { getAllTopics } from "../../services/TopicsServices.js";
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from "../AuthContext.jsx";

function Schedule() {
    const { auth } = useContext(AuthContext);
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
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (auth && auth.email) {
            fetchSessions(auth.email);
            fetchTopics();
        }
    }, [auth]);

    const fetchSessions = async (email) => {
        try {
            const response = await getSessionsByTutorEmail(email);
            setSessions(response.data);
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
        const today = new Date().toISOString().split('T')[0];
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
            const diff = (end - start) / (1000 * 60 * 60);
            if (diff > 2) newErrors.endTime = 'Session cannot exceed 2 hours';
        }
        if (!newSession.topicId) newErrors.topicId = 'Topic is required';
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
            tutor: { email: auth.email }
        };

        try {
            const savedSession = await createSession(sessionData);
            setSessions([...sessions, savedSession]);
            setSuccessMessage('Session added successfully!');
        } catch (error) {
            console.error('Error creating session:', error);
        }

        setNewSession({ date: '', topicId: '', startTime: '', endTime: '' });
        setErrors({});
        hideSuccessMessage();
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

    const handleUpdateModal = () => {
        setModalType('update');
        setShowModal(true);
    };

    const handleUpdate = async () => {
        if (!validateFields()) return;

        const sessionData = {
            date: newSession.date,
            topic: { id: newSession.topicId },
            startTime: newSession.startTime,
            endTime: newSession.endTime,
            tutor: { email: auth.email }
        };

        try {
            const updatedSession = await updateSession(editingId, sessionData);
            const updatedSessions = [...sessions];
            updatedSessions[editingIndex] = updatedSession;
            setSessions(updatedSessions);
            setSuccessMessage('Session updated successfully!');
        } catch (error) {
            console.error('Error updating session:', error);
        }

        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        setNewSession({ date: '', topicId: '', startTime: '', endTime: '' });
        setErrors({});
        hideSuccessMessage();
    };

    const handleDelete = async () => {
        try {
            await deleteSession(selectedSessionId);
            const updatedSessions = sessions.filter(session => session.id !== selectedSessionId);
            setSessions(updatedSessions);
            setSuccessMessage('Session deleted successfully!');
        } catch (error) {
            console.error('Error deleting session:', error);
        }
        setShowModal(false);
        setSelectedSessionId(null);
        hideSuccessMessage();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSessionId(null);
        setEditingIndex(null);
        setEditingId(null);
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

    const hideSuccessMessage = () => {
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <section className="container mt-4">
            <h2 className="mb-4 text-primary " style={{ fontWeight: 'bold', fontSize: '2rem' }}>Schedule</h2>

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

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
                            {topic.topicName} - {topic.topicLevel}
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
                    onClick={editingIndex !== null ? handleUpdateModal : handleAddSession}
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
                filteredSessions.map((session, index) => (
                    <div key={session.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">    {session.topic?.topicName} - {session.topic?.topicLevel}
                                {session.topic?.topicDescription ? ` (${session.topic.topicDescription})` : ''}</h5>
                            <p className="card-text">
                                <strong>Date:</strong> {session.date}<br />
                                <strong>Start Time:</strong> {session.startTime}<br />
                                <strong>End Time:</strong> {session.endTime}
                            </p>
                            <div className="d-flex">
                                <Button
                                    variant="primary"
                                    onClick={() => handleEdit(index)}
                                    className="me-2"
                                >
                                    <span className="d-flex align-items-center">
                                         Edit
                                    </span>
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteConfirmation(session.id)}
                                >
                                    <span className="d-flex align-items-center">
                                       Delete
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-danger">No sessions found.</p>
            )}

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'delete' ? 'Confirm Deletion' : 'Confirm Update'}
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

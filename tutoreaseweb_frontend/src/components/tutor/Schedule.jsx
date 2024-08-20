import React, { useEffect, useState } from 'react';
import {
    createSession,
    deleteSession,
    getAllSessions,
    updateSession
} from "../../services/ScheduleSessionServices.js";
import { getAllTopics } from "../../services/TopicsServices.js";

function Schedule() {
    const [sessions, setSessions] = useState([]);
    const [topics, setTopics] = useState([]);
    const [newSession, setNewSession] = useState({ date: '', topicId: '', startTime: '', endTime: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await getAllSessions();
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        const fetchTopics = async () => {
            try {
                const data = await getAllTopics();
                setTopics(data); // Ensure this includes topic level
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchSessions();
        fetchTopics();
    }, []);

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
        if (!newSession.date) newErrors.date = 'Date is required';
        if (!newSession.startTime) newErrors.startTime = 'Start time is required';
        if (!newSession.endTime) newErrors.endTime = 'End time is required';
        if (newSession.startTime && newSession.endTime && newSession.startTime >= newSession.endTime) {
            newErrors.endTime = 'End time must be after start time';
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
            endTime: newSession.endTime
        };

        if (editingIndex !== null) {
            try {
                await updateSession(editingId, sessionData);
                const updatedSessions = [...sessions];
                updatedSessions[editingIndex] = { ...sessionData, id: editingId };
                setSessions(updatedSessions);
            } catch (error) {
                console.error('Error updating session:', error);
            }
            setEditingIndex(null);
            setEditingId(null);
        } else {
            try {
                const savedSession = await createSession(sessionData);
                setSessions([...sessions, savedSession]);
            } catch (error) {
                console.error('Error creating session:', error);
            }
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

    const handleDelete = async (index) => {
        try {
            await deleteSession(sessions[index].id);
            const updatedSessions = sessions.filter((_, i) => i !== index);
            setSessions(updatedSessions);
            if (editingIndex === index) {
                setEditingIndex(null);
                setEditingId(null);
                setNewSession({ date: '', topicId: '', startTime: '', endTime: '' });
            }
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Schedule</h2>

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
                    className="btn btn-primary"
                    onClick={handleAddSession}
                >
                    {editingIndex !== null ? 'Update Session' : 'Add Session'}
                </button>
            </div>

            {sessions.length > 0 && (
                <div className="list-group">
                    {sessions.map((session, index) => (
                        <div key={session.id} className="list-group-item mb-3">
                            <div>
                                <strong>
                                    {session.topic?.description || 'No topic'} - {session.topic?.level || 'No level'} {/* Display topic level */}
                                </strong>
                                <br />
                                <small>{session.date}</small>
                                <br />
                                <small>Start Time: {session.startTime}</small>
                                <br />
                                <small>End Time: {session.endTime}</small>
                            </div>
                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Schedule;

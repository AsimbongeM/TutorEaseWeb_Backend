import React, { useState } from 'react';

function Schedule() {
    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({ title: '', date: '' });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSession(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSession = () => {
        if (newSession.title && newSession.date) {
            if (editingIndex !== null) {
                // Update existing session
                const updatedSessions = [...sessions];
                updatedSessions[editingIndex] = newSession;
                setSessions(updatedSessions);
                setEditingIndex(null);
            } else {
                // Add new session
                setSessions([...sessions, newSession]);
            }
            setNewSession({ title: '', date: '' });
        }
    };

    const handleEdit = (index) => {
        setNewSession(sessions[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedSessions = sessions.filter((_, i) => i !== index);
        setSessions(updatedSessions);
        if (editingIndex === index) {
            setEditingIndex(null);
            setNewSession({ title: '', date: '' });
        }
    };

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Schedule</h2>

            <div className="mb-4">
                <input
                    type="text"
                    name="title"
                    value={newSession.title}
                    onChange={handleInputChange}
                    placeholder="Session Title"
                    className="form-control mb-2"
                />
                <input
                    type="date"
                    name="date"
                    value={newSession.date}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                />
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
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{session.title}</strong>
                                <br />
                                <small>{session.date}</small>
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

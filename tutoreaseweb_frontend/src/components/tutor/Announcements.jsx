import React, { useState } from 'react';

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        setNewAnnouncement(e.target.value);
    };

    const handlePostAnnouncement = () => {
        if (newAnnouncement.trim()) {
            if (editingIndex !== null) {
                // Update existing announcement
                const updatedAnnouncements = [...announcements];
                updatedAnnouncements[editingIndex] = newAnnouncement;
                setAnnouncements(updatedAnnouncements);
                setEditingIndex(null);
            } else {
                // Add new announcement
                setAnnouncements([...announcements, newAnnouncement]);
            }
            setNewAnnouncement('');
        }
    };

    const handleEdit = (index) => {
        setNewAnnouncement(announcements[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedAnnouncements = announcements.filter((_, i) => i !== index);
        setAnnouncements(updatedAnnouncements);
        if (editingIndex === index) {
            setEditingIndex(null);
            setNewAnnouncement('');
        }
    };

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Announcements</h2>

            <div className="mb-4">
                <textarea
                    value={newAnnouncement}
                    onChange={handleInputChange}
                    placeholder="Write your announcement here..."
                    rows="3"
                    className="form-control mb-2"
                />
                <button
                    className="btn btn-primary"
                    onClick={handlePostAnnouncement}
                >
                    {editingIndex !== null ? 'Update Announcement' : 'Post Announcement'}
                </button>
            </div>

            {announcements.length > 0 && (
                <div className="list-group">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>{announcement}</div>
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

export default Announcements;

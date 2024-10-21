import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../AuthContext.jsx";
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { deleteAnnouncement, fetchAnnouncements, postAnnouncement, updateAnnouncement } from "../../services/AnnouncementsServices.js";

function Announcements() {
    const { auth } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [announcementIdToActOn, setAnnouncementIdToActOn] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth && auth.email) {
            fetchAnnouncementList(auth.email);
        }
    }, [auth]);

    const fetchAnnouncementList = async (email) => {
        try {
            const response = await fetchAnnouncements(email);
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewAnnouncement(e.target.value);
    };

    const handlePostAnnouncement = async () => {
        if (!newAnnouncement.trim()) return;

        setLoading(true);
        try {
            if (editingIndex !== null) {
                const announcementId = announcements[editingIndex].id;
                await updateAnnouncement(announcementId, newAnnouncement);
                const updatedAnnouncements = [...announcements];
                updatedAnnouncements[editingIndex].text = newAnnouncement;
                setAnnouncements(updatedAnnouncements);
                setEditingIndex(null);
            } else {
                await postAnnouncement(newAnnouncement, auth.email);
                await fetchAnnouncementList(auth.email);
            }
            setNewAnnouncement('');
        } catch (error) {
            console.error("Error posting/updating announcement:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (index) => {
        setNewAnnouncement(announcements[index].text);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        setAnnouncementIdToActOn(announcements[index].id);
        setModalType('delete');
        setShowModal(true);
    };

    const handleConfirm = async () => {
        try {
            if (modalType === 'delete') {
                await deleteAnnouncement(announcementIdToActOn);
                await fetchAnnouncementList(auth.email);
            }
        } catch (error) {
            console.error("Error deleting announcement:", error);
        } finally {
            setShowModal(false);
        }
    };

    const handleClose = () => setShowModal(false);

    return (
        <section className="container mt-4">
            {/* Post Announcements Section */}
            {auth.role === 'tutor' && (
                <>
                    <h2 className="mb-4 text-primary text-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        Post Announcements
                    </h2>
                    <div className="mb-4">
                        <Form.Control
                            as="textarea"
                            value={newAnnouncement}
                            onChange={handleInputChange}
                            placeholder="Write your announcement here..."
                            rows="3"
                            className="mb-2"
                            style={{ fontSize: '1rem', color: '#333' }}
                        />
                        <Button
                            variant="primary"
                            onClick={handlePostAnnouncement}
                            disabled={loading}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : (editingIndex !== null ? 'Update Announcement' : 'Post Announcement')}
                        </Button>
                    </div>
                </>
            )}

            {/* History Announcements Section */}
            <h2 className="mb-4 text-primary text-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                History
            </h2>
            {announcements.length > 0 ? (
                <div className="list-group">
                    {announcements.map((text, index) => (
                        <div key={text.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f8f9fa', borderColor: '#00274d' }}>
                            <div style={{ color: '#black' }}>
                                {text.text || 'No content available'}
                            </div>
                            {auth.role === 'tutor' && (
                                <div>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-secondary text-center" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    No announcements available at the moment.
                </p>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this announcement?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default Announcements;

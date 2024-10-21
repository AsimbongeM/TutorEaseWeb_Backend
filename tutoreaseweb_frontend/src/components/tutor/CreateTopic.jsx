import React, {useEffect, useState} from 'react';
import {createTopic, deleteTopic, getAllTopics, updateTopic} from "../../services/TopicsServices.js";
import {Button, Form, Modal} from 'react-bootstrap';

function CreateTopic() {
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({topicName: '', topicLevel: '', topicDescription: ''});
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // 3 cards per row, 2 rows

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {
        setFilteredTopics(topics);
    }, [topics]);

    const fetchTopics = async () => {
        try {
            const data = await getAllTopics();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error.response ? error.response.data : error.message);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTopic(prev => ({...prev, [name]: value}));
    };

    const validateFields = () => {
        const newErrors = {};
        if (!newTopic.topicName) newErrors.topicName = 'Topic Name is required';
        if (!newTopic.topicLevel) newErrors.topicLevel = 'Topic Level is required';
        if (!newTopic.topicDescription) newErrors.topicDescription = 'Topic Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddTopic = async () => {
        if (!validateFields()) return;

        const topicData = {
            topicName: newTopic.topicName,
            topicLevel: newTopic.topicLevel,
            topicDescription: newTopic.topicDescription,
        };

        try {
            const savedTopic = await createTopic(topicData);
            setTopics([...topics, savedTopic]);
            setSuccessMessage('Topic added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error creating topic:', error.response ? error.response.data : error.message);
        }

        resetForm();
    };

    const handleEdit = (index) => {
        setNewTopic({
            topicName: topics[index].topicName,
            topicLevel: topics[index].topicLevel,
            topicDescription: topics[index].topicDescription,
        });
        setEditingIndex(index);
        setEditingId(topics[index].id);
    };

    const handleUpdateModal = () => {
        setModalType('update');
        setShowModal(true);
    };

    const handleUpdate = async () => {
        if (!validateFields()) return;

        try {
            const updatedTopic = await updateTopic(editingId, newTopic);
            const updatedTopics = [...topics];
            updatedTopics[editingIndex] = updatedTopic;
            setTopics(updatedTopics);
            setSuccessMessage('Topic updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error updating topic:', error.response ? error.response.data : error.message);
        }

        resetForm();
        setShowModal(false);
    };

    const handleDeleteConfirmation = (topicId) => {
        setModalType('delete');
        setSelectedTopicId(topicId);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await deleteTopic(selectedTopicId);
            const updatedTopics = topics.filter(topic => topic.id !== selectedTopicId);
            setTopics(updatedTopics);
            setSuccessMessage('Topic deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error deleting topic:', error.response ? error.response.data : error.message);
        }
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTopicId(null);
        setEditingIndex(null);
        setEditingId(null);
    };

    const resetForm = () => {
        setNewTopic({topicName: '', topicLevel: '', topicDescription: ''});
        setErrors({});
    };

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = topics.filter(topic =>
            topic.topicLevel.toLowerCase().includes(value)
        );
        setFilteredTopics(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
    const paginatedTopics = filteredTopics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <section className="container mt-4">
            <h2 className="mb-4 text-primary" style={{fontWeight: 'bold', fontSize: '2rem'}}>Manage Topics</h2>

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <Form>
                <Form.Group controlId="formTopicName">
                    <Form.Control
                        type="text"
                        placeholder="Topic Name"
                        name="topicName"
                        value={newTopic.topicName}
                        onChange={handleInputChange}
                        isInvalid={!!errors.topicName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.topicName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTopicLevel">
                    <Form.Select
                        name="topicLevel"
                        value={newTopic.topicLevel}
                        onChange={handleInputChange}
                        isInvalid={!!errors.topicLevel}
                    >
                        <option value="">Select Topic Level</option>
                        <option value="BEGINNER">BEGINNER</option>
                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                        <option value="ADVANCED">ADVANCED</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.topicLevel}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTopicDescription">
                    <Form.Control
                        as="textarea"
                        placeholder="Topic Description"
                        name="topicDescription"
                        value={newTopic.topicDescription}
                        onChange={handleInputChange}
                        isInvalid={!!errors.topicDescription}
                    />
                    <Form.Control.Feedback type="invalid">{errors.topicDescription}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" onClick={editingIndex !== null ? handleUpdateModal : handleAddTopic}>
                    {editingIndex !== null ? 'Update Topic' : 'Add Topic'}
                </Button>
            </Form>

            {/* Filter by topic level */}
            <Form.Group className="mt-4" controlId="formFilterLevel">
                <Form.Label>Filter by Topic Level</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Topic Level"
                    onChange={handleFilterChange}
                />
            </Form.Group>

            <div className="row mt-4">
                {paginatedTopics.map((topic, index) => (
                    <div key={topic.id} className="col-md-4 mb-3">
                        <div className="card" style={{
                            height: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div className="card-body">
                                <h5 className="card-title">{topic.topicName} - {topic.topicLevel}</h5>
                                <p className="card-text">
                                    <strong>Description:</strong> {topic.topicDescription}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between p-2">
                                <Button
                                    variant="primary"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteConfirmation(topic.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <Button
                    variant="secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                    variant="success"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </Button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === 'delete' ? 'Confirm Deletion' : 'Confirm Update'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === 'delete'
                        ? 'Are you sure you want to delete this topic?'
                        : 'Are you sure you want to update this topic?'}
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

export default CreateTopic;

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../AuthContext.jsx";
import { uploadFile, fetchFiles, deleteFile, updateFile } from "../../services/ResourcesServices.js";
import { Button, Form, Spinner, Modal, Alert, Card, Row, Col } from 'react-bootstrap';

const Resources = () => {
    const { auth } = useContext(AuthContext);
    const [file, setFile] = useState(null); 
    const [uploadType, setUploadType] = useState('document');
    const [uploadError, setUploadError] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        if (auth && auth.email) {
            fetchFileList(auth.email);
        }
    }, [auth]);

    const fetchFileList = async (email) => {
        try {
            const response = await fetchFiles(email);
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!auth || !auth.email) {
            setUploadError('You must be signed in to upload files.');
            return;
        }

        try {
            setLoading(true);
            await uploadFile(file, uploadType, auth.email);
            setUploadError('');
            fetchFileList(auth.email);
        } catch (error) {
            setUploadError('Error uploading file. Please try again.');
        } finally {
            setLoading(false);
            setFile(null);
            setModalType(null);
        }
    };

    const handleUpdateClick = (file) => {
        setCurrentFile(file);
        setFile(null); // Clear previous file selection
        setModalType('update');
    };

    const handleUpdate = async () => {
        if (!auth || !auth.email || !currentFile || !file) {
            setUploadError('You must select a file and be signed in to update files.');
            return;
        }

        try {
            setLoading(true);
            await updateFile(currentFile.id, file);
            setUploadError('');
            fetchFileList(auth.email);
        } catch (error) {
            setUploadError('Error updating file. Please try again.');
        } finally {
            setLoading(false);
            setFile(null);
            setCurrentFile(null);
            setModalType(null);
        }
    };

    const handleDelete = async () => {
        if (!auth || !auth.email || !currentFile) {
            setUploadError('No file selected for deletion.');
            return;
        }

        try {
            setLoading(true);
            await deleteFile(currentFile.id);
            fetchFileList(auth.email);
        } catch (error) {
            console.error('Error deleting file:', error);
        } finally {
            setLoading(false);
            setCurrentFile(null);
            setModalType(null);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setModalType(null);
        setCurrentFile(null);
        setFile(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Manage Resources</h1>

            {/* Form for Uploading and Updating */}
            <div className="mb-4">
                <Form.Group controlId="formFileUpload" className="mb-3">
                    <Form.Label>Choose File</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Form.Group controlId="formSelectUploadType" className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value)}
                        disabled={modalType === 'update'}
                    >
                        <option value="document">Document</option>
                        <option value="recording">Recording</option>
                    </Form.Control>
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={modalType === 'update' ? () => setShowModal(true) : handleUpload}
                    disabled={loading || !file}
                    style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : modalType === 'update' ? 'Update' : 'Upload'}
                </Button>
                {uploadError && <Alert variant="danger" className="mt-3">{uploadError}</Alert>}
            </div>

            {/* Files List */}
            <Row className="mt-4">
                {files.map(file => (
                    <Col key={file.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{file.fileName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{file.fileType}</Card.Subtitle>
                                <Button
                                    variant="warning"
                                    onClick={() => handleUpdateClick(file)}
                                    className="me-2"
                                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setCurrentFile(file);
                                        setModalType('delete');
                                        setShowModal(true);
                                    }}
                                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {modalType === 'delete' ? 'Deletion' : 'Update'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {modalType === 'delete' ? 'delete' : 'update'} this file?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={modalType === 'delete' ? handleDelete : handleUpdate}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Resources;

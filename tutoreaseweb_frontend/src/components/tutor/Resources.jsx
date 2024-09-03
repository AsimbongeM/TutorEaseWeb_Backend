import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext.jsx";
import { deleteFile, fetchFiles, updateFile, uploadFile } from "../../services/ResourcesServices.js";
import { Button, Form, Modal, Spinner, Table } from 'react-bootstrap';

const Resources = () => {
    const { auth } = useContext(AuthContext);
    const [newResource, setNewResource] = useState(null);
    const [uploadType, setUploadType] = useState('document');
    const [uploadError, setUploadError] = useState('');
    const [files, setFiles] = useState([]); // Ensure initial state is an array
    const [loading, setLoading] = useState(false);
    const [fileToUpdate, setFileToUpdate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [fileIdToActOn, setFileIdToActOn] = useState(null);

    useEffect(() => {
        if (auth && auth.email) {
            fetchFileList(auth.email);
        }
    }, [auth]);

    const fetchFileList = async (email) => {
        try {
            const response = await fetchFiles(email);
            if (Array.isArray(response.data)) { // Check if response.data is an array
                setFiles(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
                setFiles([]); // Fallback to empty array
            }
        } catch (error) {
            console.error("Error fetching files:", error);
            setFiles([]); // Fallback to empty array in case of error
        }
    };

    const handleFileChange = (e) => {
        setNewResource(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!auth || !auth.email) {
            setUploadError('You must be signed in to upload files.');
            return;
        }

        try {
            setLoading(true);
            await uploadFile(newResource, uploadType, auth.email);
            setUploadError('');
            fetchFileList(auth.email);
        } catch (error) {
            setUploadError('Error uploading file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setFileIdToActOn(id);
        setModalType('delete');
        setShowModal(true);
    };

    const handleUpdateClick = (file) => {
        setFileToUpdate(file);
        setModalType('update');
        setShowModal(true);
    };

    const handleConfirm = async () => {
        try {
            if (modalType === 'delete') {
                await deleteFile(fileIdToActOn);
            } else if (modalType === 'update') {
                if (!fileToUpdate || !newResource) {
                    console.error('File to update or new resource not provided');
                    return;
                }
                await updateFile(fileToUpdate.id, newResource);
            }
            fetchFileList(auth.email);
        } catch (error) {
            console.error(`Error during ${modalType} operation:`, error);
        } finally {
            setFileToUpdate(null);
            setNewResource(null);
            setShowModal(false);
            setLoading(false);
        }
    };

    const handleClose = () => setShowModal(false);

    return (
        <div>
            <h1>Manage Resources</h1>
            <Form.Group controlId="formFileUpload">
                <Form.Label>Choose File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="formSelectUploadType">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
                    <option value="document">Document</option>
                    <option value="recording">Recording</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleUpload} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Upload'}
            </Button>
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}

            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(files) && files.map(file => (
                    <tr key={file.id}>
                        <td>{file.id}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileType}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleUpdateClick(file)}>Update</Button>
                            <Button variant="danger" onClick={() => handleDeleteClick(file.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {fileToUpdate && modalType === 'update' && (
                <div className="mt-4">
                    <h3>Update File</h3>
                    <Form>
                        <Form.Group controlId="formFileUpdate">
                            <Form.Label>Choose New File</Form.Label>
                            <Form.Control type="file" onChange={(e) => setNewResource(e.target.files[0])} />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={() => setShowModal(true)}
                            disabled={loading || !newResource}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : 'Update'}
                        </Button>
                    </Form>
                </div>
            )}

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
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Resources;

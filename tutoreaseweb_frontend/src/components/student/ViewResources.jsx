import React, { useContext, useEffect, useState } from 'react';
import { fetchAll } from "../../services/ResourcesServices.js"; // Ensure the path is correct
import { Spinner, Card, Row, Col, Alert, Button } from 'react-bootstrap';
import { AuthContext } from "../AuthContext.jsx";

const ViewResource = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { auth } = useContext(AuthContext);

    const getResources = async (email) => {
        setLoading(true);
        try {
            const response = await fetchAll(email); // Assuming fetchAll returns a response with data
            setResources(response.data); // Extract data from the response

            console.log("Fetched Resources:", response.data);

            setError('');
        } catch (err) {
            setError('Error fetching resources. Please try again later.');
            console.error("Error fetching resources:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth && auth.email) {
            getResources(auth.email);
        }
    }, [auth]);

    // Function to handle the download of the document blob
    const handleDownload = (blobString, fileName) => {
        const byteCharacters = atob(blobString); // Decode base64 string
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' }); // Create Blob object

        // Create a URL for the blob and trigger download
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName; // Set the download attribute with the file name
        link.click();

        // Clean up URL after download
        URL.revokeObjectURL(blobUrl);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Available Resources</h1>

            {loading && (
                <Spinner animation="border" role="status" className="mb-3">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mt-4">
                {resources.length > 0 ? (
                    resources.map(s => (
                        <Col key={s.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{s.fileName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{s.type}</Card.Subtitle>
                                    {/* Button to download the document */}
                                    <Button
                                        onClick={() => handleDownload(s.document, s.fileName)}
                                        variant="primary"
                                    >
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    !loading && <Alert variant="info">No resources available.</Alert>
                )}
            </Row>
        </div>
    );
};

export default ViewResource;

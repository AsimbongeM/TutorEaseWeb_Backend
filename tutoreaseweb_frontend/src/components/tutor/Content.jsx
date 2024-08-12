import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Utility function to generate a session ID
function generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
}

function Content() {
    // Get sessionId from URL parameters or generate a new one if not present
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId') || generateSessionId();

    return (
        <Container className="my-4">
            <Row>
                <Col md={12}>
                    <h2 className="mb-4">Topic Content</h2>
                    {/* Uncomment and replace with actual image and information if needed */}
                    {/* <img src="tutor_profile.jpg" alt="Tutor" className="img-fluid rounded mb-3" /> */}
                    {/* <p className="lead">John Doe</p> */}
                    {/* <p className="text-muted">Tutor</p> */}
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Class Collaboration</Card.Title>
                            <Card.Text>
                                Join the ongoing session and collaborate with your peers and tutor.
                            </Card.Text>
                            <NavLink to={`/class-session/${sessionId}`}>
                                <Button variant="primary">Join Session</Button>
                            </NavLink>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Content;

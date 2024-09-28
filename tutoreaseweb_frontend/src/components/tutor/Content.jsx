import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {AuthContext} from "../AuthContext.jsx";

// Utility function to generate a session ID
function generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
}

function Content() {
    // Get sessionId from URL parameters or generate a new one if not present
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('sessionId') || generateSessionId();
    const {auth} = useContext(AuthContext);
    return (
        <Container className="my-4">
            <Row>
                <Col md={12}>
                    {auth ? (
                        <h2 className="mb-4 text-primary text-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                            Welcome, {auth.firstName} {auth.lastName}!
                        </h2>
                    ) : (
                        <h2 className="mb-4 text-secondary text-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                            Welcome!
                        </h2>
                    )}
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="mb-4" style={{ backgroundColor: '#f8f9fa', borderColor: '#00274d' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#007bff' }}>Class Collaboration</Card.Title>
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

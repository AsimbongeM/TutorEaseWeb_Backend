import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const styles = {
    App: {
        textAlign: 'center',
        background: '#e6f2ff',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    AppHeader: {
        backgroundColor: '#00274d',
        color: 'white',
        padding: '20px',
        borderBottom: '5px solid #ffcc00',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    AppHeaderContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    AppLogo: {
        height: '50px',
        borderRadius: '8px',
    },
    SignInLink: {
        color: '#ffcc00',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '24px',
        transition: 'color 0.3s',
    },
    SignInLinkHover: {
        color: '#fff',
    },
    AppMain: {
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        flex: '1',
        paddingLeft: '40px',
        paddingRight: '40px',
    },
    AppInfo: {
        margin: '20px 0',
    },
    h1: {
        color: '#00274d',
        fontSize: '2.5rem',
        marginBottom: '20px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    p: {
        color: '#333',
        fontSize: '1.2rem',
        lineHeight: '1.6',
        maxWidth: '800px',
        margin: '0 auto',
    },
    ScrollableCardContainerWrapper: {
        maxHeight: '150px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '0 20px',
    },
    ScrollableCardContainer: {
        display: 'flex',
        gap: '20px',
        width: '100%',
        maxWidth: '900',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        padding: '10px 0',
    },
    Card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px',
        width: '250px',
        textAlign: 'left',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: '1px solid #ddd',
        flexShrink: '0',
    },
    CardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    },
    CardTitle: {
        fontSize: '1.6rem',
        color: '#00274d',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    CardDescription: {
        color: '#555',
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    List: {
        marginTop: '10px',
    },
    ListItem: {
        listStyleType: 'disc',
        marginLeft: '20px',
        marginBottom: '5px',
    },
    AppCta: {
        marginTop: '40px',
    },
    h2: {
        color: '#00274d',
        fontSize: '2rem',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    ButtonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
    },
    Button: {
        padding: '15px 40px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '50px',
        border: 'none',
        backgroundColor: '#00274d',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    ButtonHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
    },
};

function Home() {
    const [isTutorButtonHovered, setIsTutorButtonHovered] = useState(false);
    const [isStudentButtonHovered, setIsStudentButtonHovered] = useState(false);
    const [isSignInHovered, setIsSignInHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    return (
        <div style={styles.App}>
            <header style={styles.AppHeader}>
                <div style={styles.AppHeaderContent}>
                    <img src={`/images/logo.png`} style={styles.AppLogo} alt="logo" />
                    <NavLink
                        to="/sign-in"
                        style={isSignInHovered ? { ...styles.SignInLink, ...styles.SignInLinkHover } : styles.SignInLink}
                        onMouseOver={() => setIsSignInHovered(true)}
                        onMouseOut={() => setIsSignInHovered(false)}
                    >
                        Sign In
                    </NavLink>
                </div>
            </header>
            <main style={styles.AppMain}>
                <section style={styles.AppInfo}>
                    <h1 style={styles.h1}>Welcome to TutorEase</h1>
                    <p style={styles.p}>
                        TutorEase is a Java tutoring platform that helps students of all levels to master Java programming.
                        Whether you're a beginner, intermediate, or advanced learner, our platform offers structured topics
                        tailored to your learning pace.
                    </p>
                </section>

                {/* Horizontally Scrollable Cards */}
                <div style={styles.ScrollableCardContainerWrapper}>
                    <div style={styles.ScrollableCardContainer}>
                        <div
                            style={hoveredCard === 'beginner' ? { ...styles.Card, ...styles.CardHover } : styles.Card}
                            onMouseOver={() => setHoveredCard('beginner')}
                            onMouseOut={() => setHoveredCard(null)}
                        >
                            <h2 style={styles.CardTitle}>Beginner</h2>
                            <p style={styles.CardDescription}>
                                Learn the basics of Java:
                                <ul style={styles.List}>
                                    <li style={styles.ListItem}>Basic syntax and structure</li>
                                    <li style={styles.ListItem}>Variables and data types</li>
                                    <li style={styles.ListItem}>Control statements</li>
                                    <li style={styles.ListItem}>Basic object-oriented concepts</li>
                                </ul>
                            </p>
                        </div>

                        <div
                            style={hoveredCard === 'intermediate' ? { ...styles.Card, ...styles.CardHover } : styles.Card}
                            onMouseOver={() => setHoveredCard('intermediate')}
                            onMouseOut={() => setHoveredCard(null)}
                        >
                            <h2 style={styles.CardTitle}>Intermediate</h2>
                            <p style={styles.CardDescription}>
                                Expand your Java knowledge:
                                <ul style={styles.List}>
                                    <li style={styles.ListItem}>Advanced OOP concepts</li>
                                    <li style={styles.ListItem}>Exception handling</li>
                                    <li style={styles.ListItem}>Collections framework</li>
                                    <li style={styles.ListItem}>File I/O</li>
                                </ul>
                            </p>
                        </div>

                        <div
                            style={hoveredCard === 'advanced' ? { ...styles.Card, ...styles.CardHover } : styles.Card}
                            onMouseOver={() => setHoveredCard('advanced')}
                            onMouseOut={() => setHoveredCard(null)}
                        >
                            <h2 style={styles.CardTitle}>Advanced</h2>
                            <p style={styles.CardDescription}>
                                Master Java with advanced topics:
                                <ul style={styles.List}>
                                    <li style={styles.ListItem}>Multi-threading</li>
                                    <li style={styles.ListItem}>Generics</li>
                                    <li style={styles.ListItem}>JDBC and databases</li>
                                    <li style={styles.ListItem}>Design patterns</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>

                <section style={styles.AppCta}>
                    <h2 style={styles.h2}>Join us now</h2>
                    <div style={styles.ButtonGroup}>
                        <button
                            style={isTutorButtonHovered ? { ...styles.Button, ...styles.ButtonHover } : styles.Button}
                            onMouseOver={() => setIsTutorButtonHovered(true)}
                            onMouseOut={() => setIsTutorButtonHovered(false)}
                            onClick={() => navigate('/tutor-registration')}
                        >
                            Tutor
                        </button>
                        <button
                            style={isStudentButtonHovered ? { ...styles.Button, ...styles.ButtonHover } : styles.Button}
                            onMouseOver={() => setIsStudentButtonHovered(true)}
                            onMouseOut={() => setIsStudentButtonHovered(false)}
                            onClick={() => navigate('/student-registration')}
                        >
                            Student
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;

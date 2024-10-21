import React, { useEffect, useState } from 'react';
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
    SlideShowContainer: {
        position: 'relative',
        maxWidth: '1200px',
        margin: '20px auto',
        overflow: 'hidden',
    },
    Slide: {
        display: 'none',
        transition: 'opacity 0.5s ease-in-out',
    },
    SlideVisible: {
        display: 'block',
        opacity: 1,
    },
    Card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px',
        width: '100%',
        maxWidth: '800px',
        textAlign: 'left',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    CardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
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
        paddingLeft: '20px',
    },
    ListItem: {
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
    UppercaseText: {
        color: '#00274d',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '20px 0',
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

const slides = [
    {
        title: 'Beginner',
        description: 'Learn the basics of Java.',
        content: [
            'Basic syntax and structure',
            'Variables and data types',
            'Control statements',
            'Basic object-oriented concepts',
        ],
    },
    {
        title: 'Intermediate',
        description: 'Expand your Java knowledge.',
        content: [
            'Advanced OOP concepts',
            'Exception handling',
            'Collections framework',
            'File I/O',
        ],
    },
    {
        title: 'Advanced',
        description: 'Master Java with advanced topics.',
        content: [
            'Multi-threading',
            'Generics',
            'JDBC and databases',
            'Design patterns',
        ],
    },
];

function Home() {
    const [isTutorButtonHovered, setIsTutorButtonHovered] = useState(false);
    const [isStudentButtonHovered, setIsStudentButtonHovered] = useState(false);
    const [isSignInHovered, setIsSignInHovered] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

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

                <div style={styles.UppercaseText}>THESE ARE SOME OF THE TOPICS WE COVER</div>

                <div style={styles.SlideShowContainer}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.Slide,
                                ...(currentSlide === index ? styles.SlideVisible : {}),
                            }}
                        >
                            <div
                                style={{
                                    ...styles.Card,
                                    ...(hoveredCard === index ? styles.CardHover : {}),
                                }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <h2 style={styles.CardTitle}>{slide.title}</h2>
                                <p style={styles.CardDescription}>{slide.description}</p>
                                <ul style={styles.List}>
                                    {slide.content.map((item, idx) => (
                                        <li key={idx} style={styles.ListItem}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;

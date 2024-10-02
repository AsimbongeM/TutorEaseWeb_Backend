import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllTutors } from "../services/TutorServices.js";

const styles = {
    App: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        textAlign: 'center',
        background: '#e6f2ff',
        overflowY: 'auto',
    },
    AppHeader: {
        backgroundColor: '#00274d',
        color: 'white',
        padding: '20px',
        borderBottom: '5px solid #ffcc00',
    },
    AppHeaderContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    AppLogo: {
        height: '50px',
    },
    SignInLink: {
        color: '#ffcc00',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '24px',
    },
    AppMain: {
        padding: '40px 20px',
        flexGrow: 1,
    },
    AppInfo: {
        margin: '20px 0',
    },
    h1: {
        color: '#00274d',
        fontSize: '2.5rem',
        marginBottom: '10px',
    },
    p: {
        color: '#333',
        fontSize: '1.2rem',
        lineHeight: '1.5',
    },
    Divider: {
        borderBottom: '2px solid #ccc',
        margin: '30px 0',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    TutorCards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '40px',
    },
    TutorCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        width: '250px',
        textAlign: 'left',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
    },
    TutorImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    ButtonGroup: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px',
    },
    Button: {
        padding: '8px 16px',
        backgroundColor: '#00274d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    ButtonHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
    },
    AppCta: {
        padding: '20px 0',
        borderTop: '2px solid #00274d',
        marginTop: '20px',
        backgroundColor: '#f7f7f7',
    },
    h2: {
        color: '#00274d',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    CtaButtonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    TutorButton: {
        padding: '15px 30px',
        cursor: 'pointer',
        border: 'none',
        fontSize: '24px',
        fontWeight: 'bold',
        borderRadius: '50px',
        backgroundColor: '#00274d',
        color: 'white',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    TutorButtonHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
    },
};

function Home() {
    const [tutors, setTutors] = useState([]);
    const [isTutorButtonHovered, setIsTutorButtonHovered] = useState(false);
    const [isStudentButtonHovered, setIsStudentButtonHovered] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await getAllTutors();
                setTutors(response.data);
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };

        fetchTutors();
    }, []);

    const handleBookClick = () => {
        navigate('/sign-in');
    };

    const handleLikeClick = (tutorId) => {
        console.log(`Liked tutor with ID: ${tutorId}`);
    };

    return (
        <div style={styles.App}>
            <header style={styles.AppHeader}>
                <div style={styles.AppHeaderContent}>
                    <img src={`/images/logo.png`} style={styles.AppLogo} alt="logo" />
                    <NavLink to="/sign-in" style={styles.SignInLink}>Sign In</NavLink>
                </div>
            </header>

            <main style={styles.AppMain}>
                <section style={styles.AppInfo}>
                    <h1 style={styles.h1}>Welcome to TutorEase</h1>
                    <p style={styles.p}>
                        TutorEase is a platform designed to help students learn Java programming efficiently.
                        Our platform offers a wide range of resources and personalized tutoring to enhance your skills.
                    </p>
                </section>

                <div style={styles.Divider}></div>

                <section>
                    <h2 style={styles.h2}>Available Tutors</h2>
                    <div style={styles.TutorCards}>
                        {tutors.map(tutor => (
                            <div style={styles.TutorCard} key={tutor.email}>
                                {tutor.profilePicture && (
                                    <img
                                        src={`data:image/jpeg;base64,${tutor.profilePicture}`}
                                        alt={`${tutor.firstName} ${tutor.lastName}`}
                                        style={styles.TutorImage}
                                    />
                                )}
                                <h2>{tutor.firstName} {tutor.lastName}</h2>
                                <p><strong>Skills:</strong> {tutor.skills}</p>
                                <p><strong>Experience:</strong> {tutor.experience} years</p>
                                <div style={styles.ButtonGroup}>
                                    <button
                                        style={hoveredButton === `book-${tutor.email}` ? {...styles.Button, ...styles.ButtonHover} : styles.Button}
                                        onMouseOver={() => setHoveredButton(`book-${tutor.email}`)}
                                        onMouseOut={() => setHoveredButton(null)}
                                        onClick={handleBookClick}
                                    >
                                        Book
                                    </button>
                                    <button
                                        style={hoveredButton === `like-${tutor.email}` ? {...styles.Button, ...styles.ButtonHover} : styles.Button}
                                        onMouseOver={() => setHoveredButton(`like-${tutor.email}`)}
                                        onMouseOut={() => setHoveredButton(null)}
                                        onClick={() => handleLikeClick(tutor.email)}
                                    >
                                        Like
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer style={styles.AppCta}>
                <h2 style={styles.h2}>Join us now</h2>
                <div style={styles.CtaButtonGroup}>
                    <button
                        style={isTutorButtonHovered ? {...styles.TutorButton, ...styles.TutorButtonHover} : styles.TutorButton}
                        onMouseOver={() => setIsTutorButtonHovered(true)}
                        onMouseOut={() => setIsTutorButtonHovered(false)}
                        onClick={() => navigate('/tutor-registration')}
                    >
                        Tutor
                    </button>
                    <button
                        style={isStudentButtonHovered ? {...styles.TutorButton, ...styles.TutorButtonHover} : styles.TutorButton}
                        onMouseOver={() => setIsStudentButtonHovered(true)}
                        onMouseOut={() => setIsStudentButtonHovered(false)}
                        onClick={() => navigate('/student-registration')}
                    >
                        Student
                    </button>
                </div>
            </footer>
        </div>
    );
}

export default Home;

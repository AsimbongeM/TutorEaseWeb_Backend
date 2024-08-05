import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

const styles = {
    App: {
        textAlign: 'center',
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
    },
    SignInLinkHover: {
        color: 'white',
    },
    AppMain: {
        padding: '40px 20px',
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
    AppCta: {
        margin: '40px 0',
    },
    h2: {
        color: '#00274d',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    ButtonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    TutorButton: {
        padding: '15px 30px',
        fontSize: '1rem',
        cursor: 'pointer',
        border: 'none',
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
    const [isTutorButtonHovered, setIsTutorButtonHovered] = useState(false);
    const [isStudentButtonHovered, setIsStudentButtonHovered] = useState(false);

    return (
        <div style={styles.App}>
            <header style={styles.AppHeader}>
                <div style={styles.AppHeaderContent}>
                    <img src={`/images/logo.png`} style={styles.AppLogo} alt="logo"/>
                    <NavLink
                        to="/signin"
                        style={styles.SignInLink}
                        onMouseOver={(e) => e.currentTarget.style.color = styles.SignInLinkHover.color}
                        onMouseOut={(e) => e.currentTarget.style.color = styles.SignInLink.color}
                    >
                        Sign In
                    </NavLink>
                </div>
            </header>
            <main style={styles.AppMain}>
                <section style={styles.AppInfo}>
                    <h1 style={styles.h1}>Welcome to TutorEase</h1>
                    <p style={styles.p}>
                        TutorEase is a desktop application designed to help students learn Java programming efficiently.
                        Whether you are a beginner or an advanced learner, our platform offers a wide range of resources
                        and personalized tutoring to enhance your coding skills.
                    </p>
                </section>
                <section style={styles.AppCta}>
                    <h2 style={styles.h2}>Join us now</h2>
                    <div style={styles.ButtonGroup}>
                        <button
                            style={isTutorButtonHovered ? {...styles.TutorButton, ...styles.TutorButtonHover} : styles.TutorButton}
                            onMouseOver={() => setIsTutorButtonHovered(true)}
                            onMouseOut={() => setIsTutorButtonHovered(false)}
                        >
                            Tutor
                        </button>
                        <button
                            style={isStudentButtonHovered ? {...styles.TutorButton, ...styles.TutorButtonHover} : styles.TutorButton}
                            onMouseOver={() => setIsStudentButtonHovered(true)}
                            onMouseOut={() => setIsStudentButtonHovered(false)}
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

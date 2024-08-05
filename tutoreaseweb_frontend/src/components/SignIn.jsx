import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

const styles = {
    SignIn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
    },
    SignInMain: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    SignInHeader: {
        marginBottom: '20px',
    },
    SignInLogo: {
        height: '50px',
    },
    SignInForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
    },
    SignInInput: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    ForgotPasswordLink: {
        alignSelf: 'flex-end',
        color: '#007BFF',
        textDecoration: 'none',
        fontSize: '0.9rem',
    },
    ForgotPasswordLinkHover: {
        textDecoration: 'underline',
        color: '#0a108c',
    },
    SignInButton: {
        padding: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '50px',
        backgroundColor: '#00274d',
        color: 'white',
        transition: 'background-color 0.3s, transform 0.3s'
    },
    SignInButtonHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
    },
    JoinUsLink: {
        marginTop: '20px',
        color: '#00274d',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    JoinUsLinkHover: {
        textDecoration: 'underline',
    },
};

function SignIn() {
    const [isSignInButtonHovered, setIsSignInButtonHovered] = useState(false);
    const [isForgotPasswordLinkHovered, setIsForgotPasswordLinkHovered] = useState(false);
    const [isJoinUsLinkHovered, setIsJoinUsLinkHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={styles.SignIn}>
            <div style={styles.SignInMain}>
                <header style={styles.SignInHeader}>
                    <img src={`/images/logo.png`} style={styles.SignInLogo} alt="logo"/>
                </header>
                <form style={styles.SignInForm}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={styles.SignInInput}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.SignInInput}
                    />
                    <NavLink
                        to="/forgot-password"
                        style={isForgotPasswordLinkHovered ? {...styles.ForgotPasswordLink, ...styles.ForgotPasswordLinkHover} : styles.ForgotPasswordLink}
                        onMouseOver={() => setIsForgotPasswordLinkHovered(true)}
                        onMouseOut={() => setIsForgotPasswordLinkHovered(false)}
                    >
                        Forgot password?
                    </NavLink>
                    <button
                        type="submit"
                        style={isSignInButtonHovered ? {...styles.SignInButton, ...styles.SignInButtonHover} : styles.SignInButton}
                        onMouseOver={() => setIsSignInButtonHovered(true)}
                        onMouseOut={() => setIsSignInButtonHovered(false)}
                        onClick={() => navigate('/tutorprofile')}
                    >
                        Sign In
                    </button>
                </form>
                <NavLink
                    to="/"
                    style={isJoinUsLinkHovered ? {...styles.JoinUsLink, ...styles.JoinUsLinkHover} : styles.JoinUsLink}
                    onMouseOver={() => setIsJoinUsLinkHovered(true)}
                    onMouseOut={() => setIsJoinUsLinkHovered(false)}
                >
                    Join us
                </NavLink>
            </div>
        </div>
    );
}

export default SignIn;

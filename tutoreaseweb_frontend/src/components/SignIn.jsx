import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {auth} from "../services/AuthServices.js";
import {tutorSignIn} from "../services/TutorServices.js";
import {AuthContext} from "./AuthContext.jsx";
import {studentSignIn} from "../services/StudentService.js";

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
        background: 'linear-gradient(#57adeb, rgb(182, 208, 226))',
        borderRadius: '10px',
    },
    SignInHeader: {
        marginBottom: '20px',
    },
    SignInLogo: {
        maxWidth: '120px',
        height: 'auto',
        borderRadius: '50%'
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
        color: '#00274d',
        textDecoration: 'none',
        fontSize: '0.9rem',
    },
    ForgotPasswordLinkHover: {
        textDecoration: 'underline',
        color: '#0a108c',
        cursor: 'pointer'
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignInButtonHovered, setIsSignInButtonHovered] = useState(false);
    const [isForgotPasswordLinkHovered, setIsForgotPasswordLinkHovered] = useState(false);
    const [isJoinUsLinkHovered, setIsJoinUsLinkHovered] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);


    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            // tutor sign-in
            const tutorResponse = await tutorSignIn(email, password);
            if (tutorResponse.status === 200 && tutorResponse.data) {
                setAuth({ ...tutorResponse.data, role: 'tutor' });
                setError('');
                navigate('/dashboard');
                return;
            }

            // student sign-in
            const studentResponse = await studentSignIn(email, password);
            if (studentResponse.status === 200 && studentResponse.data) {
                setAuth({ ...studentResponse.data, role: 'student' });
                setError('');
                navigate('/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            setError('Invalid email or password');
        }
    };



    const handleForgotPasswordClick = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        navigate('/forgot-password'); // Programmatically navigate
    };
    return (
        <div style={styles.SignIn}>
            <div style={styles.SignInMain}>
                <header style={styles.SignInHeader}>
                    <img src={`/images/logo.png`} style={styles.SignInLogo} alt="logo"/>
                </header>
                <form style={styles.SignInForm} onSubmit={handleSignIn}>
                    <input
                        type="text"
                        placeholder="Email"
                        style={styles.SignInInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.SignInInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a
                        style={isForgotPasswordLinkHovered ? {...styles.ForgotPasswordLink, ...styles.ForgotPasswordLinkHover} : styles.ForgotPasswordLink}
                        onMouseOver={() => setIsForgotPasswordLinkHovered(true)}
                        onMouseOut={() => setIsForgotPasswordLinkHovered(false)}
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot password?
                    </a>
                    <button
                        type="submit"
                        style={isSignInButtonHovered ? {...styles.SignInButton, ...styles.SignInButtonHover} : styles.SignInButton}
                        onMouseOver={() => setIsSignInButtonHovered(true)}
                        onMouseOut={() => setIsSignInButtonHovered(false)}

                    >
                        Sign In
                    </button>
                </form>
                {error && <p style={{ color: 'red' }} className="text-center">{error}</p>}
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

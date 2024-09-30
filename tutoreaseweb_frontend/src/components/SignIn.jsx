import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {signInAdmin} from "../services/AdminServices.js";
import {tutorSignIn} from "../services/TutorServices.js";
import {studentSignIn} from "../services/StudentService.js";

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
    },
    main: {
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
    header: {
        marginBottom: '20px',
    },
    logo: {
        maxWidth: '120px',
        height: 'auto',
        borderRadius: '50%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        position: 'relative',
    },
    toggleIcon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#666',
    },
    forgotPasswordLink: {
        alignSelf: 'flex-end',
        color: '#00274d',
        textDecoration: 'none',
        fontSize: '0.9rem',
    },
    button: {
        padding: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '50px',
        backgroundColor: '#00274d',
        color: 'white',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    buttonHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
};

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSignInButtonHovered, setIsSignInButtonHovered] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        const signInMethods = [
            { method: signInAdmin, role: 'admin', redirect: '/Admin-dashboard' },
            { method: tutorSignIn, role: 'tutor', redirect: '/content' },
            { method: studentSignIn, role: 'student', redirect: '/content' },
        ];

        for (const { method, role, redirect } of signInMethods) {
            try {
                const response = await method(email, password);
                if (response.status === 200 && response.data) {
                    setAuth({ ...response.data, role });
                    navigate(redirect);
                    return;
                }
            } catch {
                // Ignore errors for non-matching roles
            }
        }

        setError('Invalid email or password');
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
    };

    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <header style={styles.header}>
                    <img src={`/images/logo.png`} style={styles.logo} alt="logo" />
                </header>
                <form style={styles.form} onSubmit={handleSignIn}>
                    <input
                        type="text"
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div style={{ position: 'relative' }}>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            style={styles.toggleIcon}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <a
                        style={styles.forgotPasswordLink}
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot password?
                    </a>
                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            ...(isSignInButtonHovered ? styles.buttonHover : {}),
                        }}
                        onMouseOver={() => setIsSignInButtonHovered(true)}
                        onMouseOut={() => setIsSignInButtonHovered(false)}
                    >
                        Sign In
                    </button>
                </form>
                {error && <p style={styles.errorText}>{error}</p>}
                <div className="text-center mt-3">
                    <p>
                        Don’t have an Account? <NavLink to="/">Join us here</NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;

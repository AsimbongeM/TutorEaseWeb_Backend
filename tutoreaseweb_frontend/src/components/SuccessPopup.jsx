import React from 'react';
import {useNavigate} from 'react-router-dom';

const SuccessPopup = ({firstName, lastName, email, onClose}) => {
    const navigate = useNavigate();

    const handleOkClick = () => {
        onClose(); // Close the popup
        navigate('/sign-in'); // Navigate to the sign-in page
    };

    return (
        <div className="popup-overlay" style={styles.overlay}>
            <div className="popup-content" style={styles.content}>
                <h3 style={styles.heading}>Registration Successful!</h3>
                <p style={styles.text}>Welcome, <strong>{firstName} {lastName}</strong>!</p>
                <p style={styles.text}>Your email: <strong>{email}</strong></p>
                <button onClick={handleOkClick} style={styles.button}>OK</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly lighter overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        opacity: 0.9, // Added slight opacity
        transition: 'opacity 0.3s ease' // Smooth transition
    },
    content: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Added shadow for depth
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
        transition: 'transform 0.3s ease-in-out', // Smooth entry effect
        transform: 'scale(1)'
    },
    heading: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '15px'
    },
    text: {
        color: '#555',
        fontSize: '16px',
        margin: '10px 0'
    },
    button: {
        backgroundColor: '#00274d',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        marginTop: '20px'
    }
};

export default SuccessPopup;

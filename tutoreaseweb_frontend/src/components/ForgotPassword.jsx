import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#6d9ccb',
        fontFamily: "'Roboto', sans-serif",
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '3px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: 'none',
        fontSize: '1rem',
        borderRadius: '50px',
        backgroundColor: '#00274d',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    buttonHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
    },
    buttonActive: {
        backgroundColor: '#002f6c',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    otpTimer: {
        textAlign: 'center',
        margin: '10px 0',
    }
};

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpTimer, setOtpTimer] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        let timerInterval;
        if (otpTimer) {
            timerInterval = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown <= 0) {
                        clearInterval(timerInterval);
                        setOtpTimer(false);
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [otpTimer]);

    const sendOTP = () => {
        // Code to send OTP
        setOtpSent(true);
        setOtpTimer(true);
        setCountdown(59);
    };

    const verifyOTP = () => {
        // Code to verify OTP
        if (otp) {
            setOtpVerified(true);
            setOtpTimer(false);
        }
    };

    const resetPassword = () => {
        // Code to reset password
        if (newPassword === confirmPassword) {
            // Password reset logic here
        } else {
            alert("Passwords do not match.");
        }
    };

    const backToSignIn = () => {
        // Redirect to sign in page
        navigate('/sign-in');
    };

    return (
        <div style={styles.container}>
            <h2>Forgot Password</h2>
            {!otpSent ? (
                <>
                    <input
                        type="text"
                        placeholder="Email or Phone Number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <button
                        onClick={sendOTP}
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00274d'}>
                        Send OTP
                    </button>
                </>
            ) : !otpVerified ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={styles.input}
                    />
                    <button
                        onClick={verifyOTP}
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00274d'}>
                        Verify OTP
                    </button>
                    {otpTimer && (
                        <div style={styles.otpTimer}>
                            We have sent you an OTP. Please check your email or phone.<br />
                            Time remaining: {countdown} seconds
                        </div>
                    )}
                    <button
                        onClick={() => setOtpSent(false)}
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00274d'}>
                        Back
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button
                        onClick={resetPassword}
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00274d'}>
                        Reset Password
                    </button>
                </>
            )}
            <button
                onClick={backToSignIn}
                style={styles.button}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00274d'}>
                Back to Sign In
            </button>
        </div>
    );
}

export default ForgotPassword;

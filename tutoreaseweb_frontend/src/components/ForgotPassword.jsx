import React, { useState } from 'react';

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
        borderRadius: '3px',
        backgroundColor: '#00274d',
        color: '#fff',
        cursor: 'pointer',
    },
    otpTimer: {
        display: 'none',
        textAlign: 'center',
    },
    buttonHover: {
        backgroundColor: '#00274d',
    },
};

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpTimer, setOtpTimer] = useState(false);
    const [countdown, setCountdown] = useState(59);

    const sendOTP = () => {
        // Code to send OTP
        setOtpTimer(true);
        setCountdown(59);
        startTimer();
    };

    const startTimer = () => {
        const timerInterval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 0) {
                    clearInterval(timerInterval);
                    setOtpTimer(false);
                    return 59;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const resendOTP = () => {
        // Code to resend OTP
        setCountdown(59);
        startTimer();
    };

    const resetPassword = () => {
        // Code to reset password
    };

    const backToSignIn = () => {
        // Redirect to sign in page
    };

    return (
        <div style={styles.container}>
            <h2>Forgot Password</h2>
            <input
                type="text"
                id="email"
                placeholder="Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={sendOTP} style={styles.button}>Send OTP</button>
            {otpTimer && (
                <div style={styles.otpTimer}>
                    We have sent you an OTP. Please check your email or phone.<br />
                    Time remaining: <span id="timer">{countdown}</span> seconds
                </div>
            )}
            {otpTimer && (
                <>
                    <input
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={resendOTP} style={styles.button}>Resend OTP</button>
                    <button onClick={resetPassword} style={styles.button}>Reset Password</button>
                </>
            )}
            <button onClick={backToSignIn} style={styles.button}>Back to Sign In</button>
        </div>
    );
}

export default ForgotPassword;

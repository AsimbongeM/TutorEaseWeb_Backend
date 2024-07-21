import React from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
    return (
        <div className="SignIn">
            <div className="SignIn-main">
                <header className="SignIn-header">
                    <img src={`..public/images/logo.png`} className="SignIn-logo" alt="logo" />
                </header>
                <form className="SignIn-form">
                    <input type="text" placeholder="Username" className="SignIn-input" />
                    <input type="password" placeholder="Password" className="SignIn-input" />
                    <Link to="/forgot-password" className="Forgot-password-link">Forgot password?</Link>
                    <button type="submit" className="SignIn-button">Sign In</button>
                </form>
                <Link to="/" className="Join-us-link">Join us</Link>
            </div>
        </div>
    );
}

export default SignIn;

import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing_Signin.css';

function LandingPage() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="App-header-content">
                    <img src={`public/logo.png`} className="App-logo" alt="logo" />
                    <Link to="/signin" className="Sign-in-link">Sign In</Link>
                </div>
            </header>
            <main className="App-main">
                <section className="App-info">
                    <h1>Welcome to TotorEase</h1>
                    <p>
                        TotorEase is a desktop application designed to help students learn Java programming efficiently.
                        Whether you are a beginner or an advanced learner, our platform offers a wide range of resources
                        and personalized tutoring to enhance your coding skills.
                    </p>
                </section>
                <section className="App-cta">
                    <h2>Join us now</h2>
                    <div className="Button-group">
                        <button className="Tutor-button">Tutor</button>
                        <button className="Student-button">Student</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default LandingPage;

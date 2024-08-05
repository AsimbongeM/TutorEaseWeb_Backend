import React from 'react';
import "../styles/Registration.css";

const StudentRegistration = () => {
    return (
        <div className="registrationContent">
            <div className="logoContainer">
                <img src="/images/logo.png" alt="Logo" className="logo"/>
            </div>
            <h2 className="formTitle">Student Registration</h2>
            <form className="registrationForm">
                <div className="formGroup">
                    <label htmlFor="name" className="label">Name:</label>
                    <input type="text" id="name" name="name" required className="input" />
                </div>
                <div className="formGroup">
                    <label htmlFor="surname" className="label">Surname:</label>
                    <input type="text" id="surname" name="surname" required className="input" />
                </div>
                <div className="formGroup">
                    <label htmlFor="email" className="label">Email address or username:</label>
                    <input type="email" id="email" name="email" required className="input" />
                </div>
                <div className="formGroup">
                    <label htmlFor="cell" className="label">Cell number:</label>
                    <input type="tel" id="cell" name="cell" required className="input" />
                </div>
                <div className="formGroup">
                    <label htmlFor="age" className="label">Age:</label>
                    <input type="number" id="age" name="age" required className="input" />
                </div>
                <div className="formGroup">
                    <label htmlFor="skill-level" className="label">Skill level:</label>
                    <select id="skill-level" name="skill-level" required className="select">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div className="formGroup">
                    <label htmlFor="password" className="label">Password:</label>
                    <input type="password" id="password" name="password" required className="input" />
                </div>
                <div className="formGroup">
                    <label htmlFor="confirm-password" className="label">Confirm password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required className="input" />
                </div>
                <div className="btnContainer">
                    <button type="submit" className="btn">Register</button>
                </div>
            </form>
        </div>
    );
};

export default StudentRegistration;

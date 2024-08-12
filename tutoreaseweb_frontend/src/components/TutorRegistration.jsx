import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createTutor, getTutorById } from "../services/TutorServices.js";

const TutorRegistration = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [cellNumber, setCellNumber] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#e6f2ff';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleSignUp = (e) => {
        e.preventDefault();
        if (validateForm()) {
            getTutorById(email)
                .then((response) => {
                    if (response.data) {
                        setErrors({ email: 'Email is already registered' });
                    } else {
                        const tutor = { firstName, lastName, email, password, age, cellNumber, skills, experience, approvalStatus: 'PENDING' };
                        return createTutor(tutor);
                    }
                })
                .then((response) => {
                    if (response) {
                        console.log(response.data);
                        navigate("/sign-in");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setErrors({ ...errors, apiError: 'An error occurred during registration. Please try again.' });
                });
        }
    };

    const validateForm = () => {
        const errorsCopy = {};
        let valid = true;

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }
        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }
        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        if (!password.trim()) {
            errorsCopy.password = 'Password is required';
            valid = false;
        } else if (password.length < 8) {
            errorsCopy.password = 'Password must be at least 8 characters long';
            valid = false;
        } else if (!/[A-Z]/.test(password)) {
            errorsCopy.password = 'Password must contain at least one uppercase letter';
            valid = false;
        } else if (!/[a-z]/.test(password)) {
            errorsCopy.password = 'Password must contain at least one lowercase letter';
            valid = false;
        } else if (!/[0-9]/.test(password)) {
            errorsCopy.password = 'Password must contain at least one number';
            valid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errorsCopy.password = 'Password must contain at least one special character';
            valid = false;
        }
        if (password !== confirmPassword) {
            errorsCopy.confirmPassword = 'Passwords do not match';
            valid = false;
        }
        if (!age.trim()) {
            errorsCopy.age = 'Age is required';
            valid = false;
        } else if (!/^\d+$/.test(age) || parseInt(age, 10) < 18) {
            errorsCopy.age = 'Age must be a number and at least 18 years old';
            valid = false;
        }
        if (!cellNumber.trim()) {
            errorsCopy.cellNumber = 'Cell Number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(cellNumber)) {
            errorsCopy.cellNumber = 'Cell Number must be exactly 10 digits';
            valid = false;
        }
        if (!skills.trim()) {
            errorsCopy.skills = 'Skill is required';
            valid = false;
        }
        if (!experience.trim()) {
            errorsCopy.experience = 'Experience is required';
            valid = false;
        } else if (!/^\d+$/.test(experience) || parseInt(experience, 10) < 0) {
            errorsCopy.experience = 'Experience must be a number and not less than 0';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="container my-5" style={{ maxWidth: '500px', background: '#e6f2ff' }}>
            <div className="text-center mb-4">
                <img src="/images/logo.png" alt="Logo" style={{ maxWidth: '120px', borderRadius: '50%', border: '2px solid #fff' }} />
            </div>
            <h2 className="text-center mb-4" style={{ color: 'black' }}>Tutor Registration</h2>
            <form className="p-4 rounded shadow-sm" style={{ background: 'linear-gradient(#57adeb, rgb(182, 208, 226))' }} onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label" style={{ fontWeight: 'bold' }}>First Name:</label>
                    <input type="text" id="firstName" name="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label" style={{ fontWeight: 'bold' }}>Last Name:</label>
                    <input type="text" id="lastName" name="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>Email address:</label>
                    <input type="email" id="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cellNumber" className="form-label" style={{ fontWeight: 'bold' }}>Cell number:</label>
                    <input type="tel" id="cellNumber" name="cellNumber" className="form-control" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />
                    {errors.cellNumber && <div className="text-danger">{errors.cellNumber}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label" style={{ fontWeight: 'bold' }}>Age:</label>
                    <input type="number" id="age" name="age" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                    {errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ fontWeight: 'bold' }}>Password:</label>
                    <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label" style={{ fontWeight: 'bold' }}>Confirm password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="skills" className="form-label" style={{ fontWeight: 'bold' }}>Skill level:</label>
                    <select id="skills" name="skills" className="form-select" value={skills} onChange={(e) => setSkills(e.target.value)}>
                        <option value="">Select Skill Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                    {errors.skills && <div className="text-danger">{errors.skills}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label" style={{ fontWeight: 'bold' }}>Experience:</label>
                    <input type="number" id="experience" name="experience" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} />
                    {errors.experience && <div className="text-danger">{errors.experience}</div>}
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            backgroundColor: isHovered ? '#ffcc00' : '#00274d',
                            color: isHovered ? '#00274d' : '#fff',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            transition: 'background-color 0.3s, color 0.3s'
                        }}
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TutorRegistration;

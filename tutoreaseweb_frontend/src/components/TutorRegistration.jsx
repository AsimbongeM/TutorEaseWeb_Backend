import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createTutor, getTutorById} from '../services/TutorServices.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

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
    const [apiError, setApiError] = useState('');
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
                        setApiError('');
                    } else {
                        // Format cell number for storage
                        const formattedCellNumber = cellNumber.startsWith('+27')
                            ? cellNumber
                            : `+27${cellNumber.replace(/\D/g, '')}`;

                        // Ensure it has the correct length
                        const trimmedCellNumber = formattedCellNumber.length === 12
                            ? formattedCellNumber
                            : `+27${formattedCellNumber.slice(-9)}`;

                        const tutor = {
                            firstName,
                            lastName,
                            email,
                            password,
                            age,
                            cellNumber: trimmedCellNumber,
                            skills,
                            experience,
                            approvalStatus: 'PENDING'
                        };
                        return createTutor(tutor);
                    }
                })
                .then((response) => {
                    if (response) {
                        console.log(response.data);
                        navigate('/sign-in');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setApiError('An error occurred during registration. Please try again.');
                });
        }
    };


    const validateForm = () => {
        const errorsCopy = {};
        let valid = true;

        // Validate firstName
        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        } else if (/[^a-zA-Z]/.test(firstName)) {
            errorsCopy.firstName = 'First Name must not contain numbers or special characters';
            valid = false;
        } else if (firstName.length > 20) {
            errorsCopy.firstName = 'First Name must not be more than 20 characters long';
            valid = false;
        }

        // Validate lastName
        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        } else if (/[^a-zA-Z]/.test(lastName)) {
            errorsCopy.lastName = 'Last Name must not contain numbers or special characters';
            valid = false;
        } else if (lastName.length > 20) {
            errorsCopy.lastName = 'Last Name must not be more than 20 characters long';
            valid = false;
        }

        // Validate email
        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        // Validate password
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

        // Validate confirmPassword
        if (password !== confirmPassword) {
            errorsCopy.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        // Validate age
        if (!age.trim()) {
            errorsCopy.age = 'Age is required';
            valid = false;
        } else if (!/^\d+$/.test(age) || parseInt(age, 10) < 18) {
            errorsCopy.age = 'Age must be a number and at least 18 years old';
            valid = false;
        }

        // Validate cellNumber
        if (!cellNumber.trim()) {
            errorsCopy.cellNumber = 'Cell Number is required';
            valid = false;
        } else {
            const normalizedNumber = cellNumber.replace(/\D/g, '');
            if (!/^27\d{9}$/.test(normalizedNumber)) {
                errorsCopy.cellNumber = 'Cell Number must be a South African number with 9 digits';
                valid = false;
            }
        }

        // Validate skills
        if (!skills.trim()) {
            errorsCopy.skills = 'Skill is required';
            valid = false;
        }

        // Validate experience
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

    const handleChange = (setter, field) => (e) => {
        setter(e.target.value);
        setErrors((prevErrors) => {
            const {[field]: _, ...rest} = prevErrors;
            return rest;
        });
    };

    const handlePhoneChange = (value, countryData, e, formattedValue) => {
        if (countryData.dialCode === '27') { // Ensure the country code is South Africa
            const normalizedNumber = formattedValue.replace(/\D/g, ''); // Remove non-digit characters
            setCellNumber(normalizedNumber);
            setErrors(prevErrors => ({...prevErrors, cellNumber: ''}));
        } else {
            setCellNumber('');
            setErrors(prevErrors => ({...prevErrors, cellNumber: 'Only South African numbers are accepted.'}));
        }
    };

    const isFieldValid = (field) => {
        switch (field) {
            case 'firstName':
                return !!firstName.trim() && !errors.firstName;
            case 'lastName':
                return !!lastName.trim() && !errors.lastName;
            case 'email':
                return !!email.trim() && !errors.email;
            case 'password':
                return !!password.trim() && !errors.password;
            case 'confirmPassword':
                return password && confirmPassword && password === confirmPassword;
            case 'age':
                return !!age.trim() && !errors.age;
            case 'cellNumber':
                return !!cellNumber.trim() && !errors.cellNumber;
            case 'skills':
                return !!skills.trim() && !errors.skills;
            case 'experience':
                return !!experience.trim() && !errors.experience;
            default:
                return false;
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: '500px', background: '#e6f2ff' }}>
            <div className="text-center mb-4">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    style={{maxWidth: '120px', borderRadius: '50%', border: '2px solid #fff'}}
                />
            </div>
            <h2 className="text-center mb-4" style={{ color: 'black' }}>Tutor Registration</h2>
            <form
                className="p-4 rounded shadow-sm"
                style={{background: 'linear-gradient(#57adeb, rgb(182, 225, 248))'}}
                onSubmit={handleSignUp}
            >
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label" style={{ fontWeight: 'bold' }}>First Name:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={handleChange(setFirstName, 'firstName')}
                        />
                        {isFieldValid('firstName') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('firstName') && errors.firstName &&
                        <div className="text-danger">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label" style={{ fontWeight: 'bold' }}>Last Name:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={handleChange(setLastName, 'lastName')}
                        />
                        {isFieldValid('lastName') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('lastName') && errors.lastName &&
                        <div className="text-danger">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>Email address:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={handleChange(setEmail, 'email')}
                        />
                        {isFieldValid('email') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('email') && errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cellNumber" className="form-label" style={{ fontWeight: 'bold' }}>Cell number:</label>
                    <div className="d-flex align-items-center">
                        <PhoneInput
                            country="za"
                            id="cellNumber"
                            name="cellNumber"
                            className="form-control"
                            value={cellNumber}
                            onChange={handlePhoneChange}
                            inputProps={{required: true, autoFocus: true}}
                        />
                        {isFieldValid('cellNumber') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('cellNumber') && errors.cellNumber &&
                        <div className="text-danger">{errors.cellNumber}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label" style={{ fontWeight: 'bold' }}>Age:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            id="age"
                            name="age"
                            className="form-control"
                            value={age}
                            onChange={handleChange(setAge, 'age')}
                        />
                        {isFieldValid('age') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('age') && errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ fontWeight: 'bold' }}>Password:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={handleChange(setPassword, 'password')}
                        />
                        {isFieldValid('password') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('password') && errors.password &&
                        <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label" style={{ fontWeight: 'bold' }}>Confirm password:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={handleChange(setConfirmPassword, 'confirmPassword')}
                        />
                        {password && confirmPassword && password === confirmPassword &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('confirmPassword') && errors.confirmPassword &&
                        <div className="text-danger">{errors.confirmPassword}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="skills" className="form-label" style={{ fontWeight: 'bold' }}>Skill level:</label>
                    <div className="d-flex align-items-center">
                        <select
                            id="skills"
                            name="skills"
                            className="form-select"
                            value={skills}
                            onChange={handleChange(setSkills, 'skills')}
                        >
                            <option value="">Select Skill Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        {isFieldValid('skills') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('skills') && errors.skills && <div className="text-danger">{errors.skills}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label" style={{ fontWeight: 'bold' }}>Experience:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            className="form-control"
                            value={experience}
                            onChange={handleChange(setExperience, 'experience')}
                        />
                        {isFieldValid('experience') &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {!isFieldValid('experience') && errors.experience &&
                        <div className="text-danger">{errors.experience}</div>}
                </div>
                {apiError && <div className="text-danger mb-3">{apiError}</div>}
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

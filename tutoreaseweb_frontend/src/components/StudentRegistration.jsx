import React, {useEffect, useState} from 'react';
import {createStudent, getStudentById} from "../services/StudentService.js";
import {useNavigate} from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

const StudentRegistration = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [cellNumber, setCellNumber] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#e6f2ff';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await getStudentById(email);
                if (response.data) {
                    setErrors({email: 'Email is already registered'});
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

                    const student = {
                        firstName,
                        lastName,
                        email,
                        password,
                        age,
                        cellNumber: trimmedCellNumber,
                        skillLevel
                    };
                    await createStudent(student);
                    navigate("/sign-in");
                }
            } catch (error) {
                console.error(error);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    apiError: 'An error occurred during registration. Please try again.'
                }));
            }
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

        // Validate skillLevel
        if (!skillLevel.trim()) {
            errorsCopy.skillLevel = 'Skill level is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    const handleFieldChange = (field, setter) => (e) => {
        setter(e.target.value);
        setErrors(prevErrors => ({...prevErrors, [field]: ''}));
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

    return (
        <div className="container my-5" style={{ maxWidth: '500px', background: '#e6f2ff' }}>
            <div className="text-center mb-4">
                <img src="/images/logo.png" alt="Logo" style={{ maxWidth: '120px', borderRadius: '50%', border: '2px solid #fff' }} />
            </div>
            <h2 className="text-center mb-4" style={{ color: 'black' }}>Student Registration</h2>
            <form className="p-4 rounded shadow-sm" style={{background: 'linear-gradient(#57adeb, rgb(182, 208, 226))'}}
                  onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label" style={{ fontWeight: 'bold' }}>First Name:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={handleFieldChange('firstName', setFirstName)}
                        />
                        {firstName && !errors.firstName &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
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
                            onChange={handleFieldChange('lastName', setLastName)}
                        />
                        {lastName && !errors.lastName &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{fontWeight: 'bold'}}>Email:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={handleFieldChange('email', setEmail)}
                        />
                        {email && !errors.email &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
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
                        {cellNumber && !errors.cellNumber &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.cellNumber && <div className="text-danger">{errors.cellNumber}</div>}
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
                            onChange={handleFieldChange('age', setAge)}
                        />
                        {age && !errors.age &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.age && <div className="text-danger">{errors.age}</div>}
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
                            onChange={handleFieldChange('password', setPassword)}
                        />
                        {password && !errors.password &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
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
                            onChange={handleFieldChange('confirmPassword', setConfirmPassword)}
                        />
                        {confirmPassword && !errors.confirmPassword &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="skillLevel" className="form-label" style={{ fontWeight: 'bold' }}>Skill level:</label>
                    <div className="d-flex align-items-center">
                        <select
                            id="skillLevel"
                            name="skillLevel"
                            className="form-select"
                            value={skillLevel}
                            onChange={handleFieldChange('skillLevel', setSkillLevel)}
                        >
                            <option value="">Select Skill Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        {skillLevel && !errors.skillLevel &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.skillLevel && <div className="text-danger">{errors.skillLevel}</div>}
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

export default StudentRegistration;

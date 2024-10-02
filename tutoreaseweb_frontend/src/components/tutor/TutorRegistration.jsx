import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {createTutor, getTutorById} from '../../services/TutorServices.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faEye, faEyeSlash, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import SuccessPopup from "../SuccessPopup.jsx";

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
    const [passwordConstraints, setPasswordConstraints] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [registeredUser, setRegisteredUser] = useState({});

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
                const response = await getTutorById(email);
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
                        await createTutor(tutor);
                        setRegisteredUser({firstName, lastName, email});
                        // setSuccessMessage(`Registration successful! Welcome, ${firstName} ${lastName}. Your email is ${email}.`);
                        setIsPopupVisible(true);
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

    const handlePopupClose = () => {
        setIsPopupVisible(false); // Hide the popup
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
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorsCopy.email = 'Invalid email format';
            valid = false;
        }

        // Validate password
        if (!password.trim()) {
            errorsCopy.password = 'Password is required';
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

    const handleFieldChange = (field, setter) => (e) => {
        setter(e.target.value);
        if (field === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                setErrors(prevErrors => ({...prevErrors, email: 'Invalid email format'}));
            } else {
                setErrors(prevErrors => ({...prevErrors, email: ''}));
            }
        }
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

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
        setErrors(prevErrors => ({...prevErrors, password: '', confirmPassword: ''}));
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword === password) {
            setErrors(prevErrors => ({...prevErrors, confirmPassword: ''}));
        } else {
            setErrors(prevErrors => ({...prevErrors, confirmPassword: 'Passwords do not match'}));
        }
    };

    const validatePassword = (password) => {
        const constraints = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        setPasswordConstraints(constraints);
        if (Object.values(constraints).every(Boolean) && confirmPassword === password) {
            setErrors(prevErrors => ({...prevErrors, password: '', confirmPassword: ''}));
        }
    };


    return (
        <div className="container my-5" style={{maxWidth: '500px', background: '#e6f2ff'}}>
            {isPopupVisible && (
                <SuccessPopup
                    firstName={registeredUser.firstName}
                    lastName={registeredUser.lastName}
                    email={registeredUser.email}
                    onClose={handlePopupClose}
                />
            )}
            <div className="text-center mb-4">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    style={{maxWidth: '120px', borderRadius: '50%', border: '2px solid #fff'}}
                />
            </div>
            <h2 className="text-center mb-4" style={{color: 'black'}}>Tutor Registration</h2>
            <form
                className="p-4 rounded shadow-sm"
                style={{background: 'linear-gradient(#57adeb, rgb(182, 225, 248))'}}
                onSubmit={handleSignUp}
            >
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label" style={{fontWeight: 'bold'}}>First Name:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={handleFieldChange('firstName', setFirstName)}
                            placeholder="Enter your first name"
                        />
                        {firstName && !errors.firstName &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label" style={{fontWeight: 'bold'}}>Last Name:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={handleFieldChange('lastName', setLastName)}
                            placeholder="Enter your last name"
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
                            placeholder="Enter your email"
                        />
                        {email && !errors.email &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cellNumber" className="form-label" style={{fontWeight: 'bold'}}>Cell number:</label>
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
                    <label htmlFor="age" className="form-label" style={{fontWeight: 'bold'}}>Age:</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            id="age"
                            name="age"
                            className="form-control"
                            value={age}
                            min="10"
                            onChange={handleFieldChange('age', setAge)}
                            placeholder="Enter your age"
                        />
                        {age && !errors.age &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{fontWeight: 'bold'}}>Password:</label>
                    <div className="d-flex align-items-center position-relative">
                        <div className="position-relative flex-grow-1">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className="form-control custom-width"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                                style={{paddingRight: '40px'}}
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    zIndex: 1
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {/* Container for check icon outside of input */}
                        {password && !errors.password &&
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{color: 'green', marginLeft: '10px', zIndex: 1}}
                            />
                        }
                    </div>
                    <div className="mt-2">
                        {password && (
                            <div>
                                <div style={{marginBottom: '5px'}}>
                                    <FontAwesomeIcon
                                        icon={passwordConstraints.length ? faCheckCircle : faTimesCircle}
                                        style={{color: passwordConstraints.length ? 'green' : 'red'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>Minimum 8 characters</span>
                                </div>
                                <div style={{marginBottom: '5px'}}>
                                    <FontAwesomeIcon
                                        icon={passwordConstraints.uppercase ? faCheckCircle : faTimesCircle}
                                        style={{color: passwordConstraints.uppercase ? 'green' : 'red'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>At least one uppercase letter</span>
                                </div>
                                <div style={{marginBottom: '5px'}}>
                                    <FontAwesomeIcon
                                        icon={passwordConstraints.lowercase ? faCheckCircle : faTimesCircle}
                                        style={{color: passwordConstraints.lowercase ? 'green' : 'red'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>At least one lowercase letter</span>
                                </div>
                                <div style={{marginBottom: '5px'}}>
                                    <FontAwesomeIcon
                                        icon={passwordConstraints.number ? faCheckCircle : faTimesCircle}
                                        style={{color: passwordConstraints.number ? 'green' : 'red'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>At least one number</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={passwordConstraints.special ? faCheckCircle : faTimesCircle}
                                        style={{color: passwordConstraints.special ? 'green' : 'red'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>At least one special character (!@#$%^&*)</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label" style={{fontWeight: 'bold'}}>Confirm
                        password:</label>
                    <div className="d-flex align-items-center position-relative">
                        <div className="position-relative flex-grow-1">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm-password"
                                name="confirm-password"
                                className="form-control custom-width"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm your password"
                                style={{paddingRight: '40px'}}
                            />
                            <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    zIndex: 1
                                }}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </div>
                        {confirmPassword && !errors.confirmPassword &&
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{color: 'green', marginLeft: '10px', zIndex: 1}}
                            />
                        }
                    </div>
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                </div>


                <div className="mb-3">
                    <label htmlFor="skills" className="form-label" style={{fontWeight: 'bold'}}>Skill level:</label>
                    <div className="d-flex align-items-center">
                        <select
                            id="skills"
                            name="skills"
                            className="form-select"
                            value={skills}
                            onChange={handleFieldChange('skills', setSkills)}
                        >
                            <option value="">Select Skill Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        {skills && !errors.skills &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.skills && <div className="text-danger">{errors.skills}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="experience" className="form-label" style={{fontWeight: 'bold'}}>Experience
                        (years):</label>
                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            className="form-control"
                            value={experience}
                            min="1"
                            onChange={handleFieldChange('experience', setExperience)}
                            placeholder="Enter your experience in years"
                        />
                        {experience && !errors.experience &&
                            <FontAwesomeIcon icon={faCheckCircle} style={{color: 'green', marginLeft: '10px'}}/>}
                    </div>
                    {errors.experience &&
                        <div className="text-danger">{errors.experience}</div>}
                </div>
                {apiError && <div className="text-danger mb-3">{apiError}</div>}
                {successMessage && <div className="text-success mb-3">{successMessage}</div>}
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
                <div className="text-center mt-3">
                    <p>Already registered? <NavLink to="/sign-in">Sign in here</NavLink></p>
                </div>
            </form>

        </div>
    );
};

export default TutorRegistration;

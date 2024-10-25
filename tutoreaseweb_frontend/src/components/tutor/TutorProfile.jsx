import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteTutorById, getTutorById, getTutorImageUrl, updateTutor} from "../../services/TutorServices.js";
import {AuthContext} from "../AuthContext.jsx";

const TutorProfile = () => {
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [errors, setErrors] = useState('');
    const errorTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);

    useEffect(() => {
        document.body.style.backgroundColor = '#e6f2ff';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        if (auth && auth.email) {
            getTutorById(auth.email)
                .then((response) => {
                    const tutorData = response.data;
                    const imageUrl = getTutorImageUrl(tutorData.email);
                    setTutor({...tutorData, imageUrl});
                    setProfilePreview(imageUrl); // Set initial preview
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error retrieving tutor data:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [auth]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                setProfilePicture(file);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfilePreview(reader.result);
                };
                reader.readAsDataURL(file);
                setErrors(''); // Clear any existing error message
            } else {
                setErrors('Please select a JPEG or PNG image.');
                setProfilePicture(null);
                setProfilePreview(null); // Clear the preview
                e.target.value = ''; // Clear the file input

                // Clear any existing timeout
                if (errorTimeoutRef.current) {
                    clearTimeout(errorTimeoutRef.current);
                }

                // Set a new timeout to clear the error message after 3 seconds
                errorTimeoutRef.current = setTimeout(() => {
                    setErrors('');
                }, 3000); // 3 seconds
            }
        } else {
            setProfilePreview(null); // Clear the preview if no file is selected
        }
    };

    const handleSave = () => {
        const tutorData = {
            email: auth.email,
            firstName: tutor.firstName,
            lastName: tutor.lastName,
            password: tutor.password || '',
            age: tutor.age,
            cellNumber: tutor.cellNumber,
            skills: tutor.skills,
            experience: tutor.experience,
            approvalStatus: tutor.approvalStatus,
            profilePicture // Include the profile picture if it exists
        };

        updateTutor(tutorData)
            .then((response) => {
                setTutor(response.data);
                setIsEditable(false);
                setProfilePicture(null);
                setProfilePreview(getTutorImageUrl(auth.email)); // Reset preview to updated image
            })
            .catch((error) => {
                console.error("Error updating tutor data:", error);
            });
    };

    const handleDelete = () => {
        deleteTutorById(auth.email)
            .then(() => {
                setAuth(null);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error deleting tutor:", error);
            });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!tutor) {
        return <div className="text-center">No tutor data available.</div>;
    }

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center mt-5">
                <div className="text-center">
                    <img
                        src={profilePreview || "/images/logo.png"}
                        alt="Profile Preview"
                        className="rounded-circle mb-3"
                        style={{width: '150px', height: '150px', border: '2px solid #fff'}}
                    />
                </div>
                <form className="w-100 p-4 bg-light shadow rounded" style={{maxWidth: '600px'}}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={tutor.firstName}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setTutor({...tutor, firstName: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={tutor.lastName}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setTutor({...tutor, lastName: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={tutor.age}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setTutor({...tutor, age: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={tutor.email}
                            disabled
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cellNumber" className="form-label">Mobile Number:</label>
                        <input
                            type="tel"
                            id="cellNumber"
                            name="cellNumber"
                            value={tutor.cellNumber}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setTutor({...tutor, cellNumber: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="skills" className="form-label">Skill Level:</label>
                        <select
                            id="skills"
                            name="skills"
                            value={tutor.skills}
                            disabled={!isEditable}
                            className="form-select"
                            onChange={(e) => setTutor({...tutor, skills: e.target.value})}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="experience" className="form-label">Experience:</label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            value={tutor.experience}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setTutor({...tutor, experience: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="approvalStatus" className="form-label">Approval Status:</label>
                        <input
                            type="text"
                            id="approvalStatus"
                            name="approvalStatus"
                            value={tutor.approvalStatus}
                            disabled
                            className="form-control"
                        />
                    </div>

                    {/*/!* Profile Picture Input *!/*/}
                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="profilePicture" className="form-label">Profile Picture:</label>*/}
                    {/*    <input*/}
                    {/*        type="file"*/}
                    {/*        id="profilePicture"*/}
                    {/*        accept="image/*"*/}
                    {/*        onChange={handleFileChange}*/}
                    {/*        className="form-control"*/}
                    {/*        disabled={!isEditable}*/}
                    {/*    />*/}
                    {/*    {errors && <div className="text-danger">{errors}</div>}*/}
                    {/*</div>*/}

                    <div className="d-flex justify-content-between">
                        {isEditable ? (
                            <>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                                <button type="button" className="btn btn-danger"
                                        onClick={() => setIsEditable(false)}>Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn btn-primary"
                                        onClick={() => setIsEditable(true)}>Edit
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TutorProfile;

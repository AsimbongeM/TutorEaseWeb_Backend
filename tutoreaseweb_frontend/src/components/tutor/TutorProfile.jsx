import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import NavBar from "../../navigation/NavBar.jsx";
import {deleteTutorById, getTutorById, updateTutor} from "../../services/TutorServices.js";
import {AuthContext} from "../AuthContext.jsx";

const TutorProfile = () => {
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [isSaveHovered, setIsSaveHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);

    useEffect(() => {
        // Set background color for the body when the component mounts
        document.body.style.backgroundColor = '#e6f2ff';

        // Cleanup the style when the component unmounts
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        if (auth && auth.email) {
            getTutorById(auth.email)
                .then((response) => {
                    setTutor(response.data);
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

    const toggleEdit = () => {
        setIsEditable(prevState => !prevState);
    };

    const handleSave = () => {
        updateTutor(auth.email, tutor)
            .then((response) => {
                setTutor(response.data);
                setIsEditable(false);
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
                    <img src="/images/logo.png" alt="Profile Picture" className="rounded-circle mb-3"
                         style={{width: '120px', height: '120px', border: '2px solid #fff'}}/>
                </div>
                <form className="w-100 p-4 bg-light shadow rounded" style={{maxWidth: '400px'}}>
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

                    {/* Tutor Approval Status */}
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

                    <div className="d-flex justify-content-between">
                        {isEditable ? (
                            <>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleSave}
                                    style={{
                                        backgroundColor: '#00274d',
                                        color: 'white',
                                        border: 'none',
                                        transition: 'all 0.3s ease',
                                        transform: isSaveHovered ? 'scale(1.05)' : 'none',
                                        ...(isSaveHovered ? {backgroundColor: '#ffcc00', color: '#00274d'} : {}),
                                    }}
                                    onMouseEnter={() => setIsSaveHovered(true)}
                                    onMouseLeave={() => setIsSaveHovered(false)}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={toggleEdit}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={toggleEdit}
                                    style={{
                                        backgroundColor: '#00274d',
                                        color: 'white',
                                        border: 'none',
                                        transition: 'all 0.3s ease',
                                        transform: isEditHovered ? 'scale(1.05)' : 'none',
                                        ...(isEditHovered ? {backgroundColor: '#ffcc00', color: '#00274d'} : {}),
                                    }}
                                    onMouseEnter={() => setIsEditHovered(true)}
                                    onMouseLeave={() => setIsEditHovered(false)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete Account
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

import React, {useContext, useEffect, useState} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {AuthContext} from "./AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {deleteStudentById, getStudentById, updateStudent} from "../services/StudentService.js";

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
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
            getStudentById(auth.email)
                .then((response) => {
                    setStudent(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error retrieving student data:", error);
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
        updateStudent(auth.email, student)
            .then((response) => {
                setStudent(response.data);
                setIsEditable(false);
            })
            .catch((error) => {
                console.error("Error updating student data:", error);
            });
    };

    const handleDelete = () => {
        deleteStudentById(auth.email)
            .then(() => {
                setAuth(null);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error deleting student:", error);
            });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!student) {
        return <div className="text-center">No student data available.</div>;
    }

    return (
        <div className="container">
            {/*<NavBar />*/}
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
                            value={student.firstName}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setStudent({...student, firstName: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={student.lastName}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setStudent({...student, lastName: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={student.age}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setStudent({...student, age: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={student.email}
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
                            value={student.cellNumber}
                            disabled={!isEditable}
                            className="form-control"
                            onChange={(e) => setStudent({...student, cellNumber: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="skills" className="form-label">Skill Level:</label>
                        <select
                            id="skills"
                            name="skills"
                            value={student.skills}
                            disabled={!isEditable}
                            className="form-select"
                            onChange={(e) => setStudent({...student, skills: e.target.value})}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
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

export default StudentProfile;

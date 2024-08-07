import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {updateStudent,getStudentById,disableStudentProfile } from "../services/StudentService.js";

const StudentProfile = () => {
    const [student, setStudent] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    useEffect(() => {
        const studentId = localStorage.getItem('studentId');
        if (studentId) {
            getStudentById(studentId)
                .then(response => setStudent(response.data))
                .catch(error => console.error("Failed to fetch student details:", error));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const toggleEdit = () => {
        if (isEditable) {
            updateStudent(student.id, student)
                .then(response => {
                    setStudent(response.data);
                    setIsEditable(false);
                })
                .catch(error => console.error("Failed to update student:", error));
        } else {
            setIsEditable(true);
        }
    };

    const handleDisableProfile = () => {
        disableStudentProfile(student.id)
            .then(response => {
                // Handle profile disabling logic
                console.log("Profile disabled:", response.data);
            })
            .catch(error => console.error("Failed to disable profile:", error));
    };

    return (
        <div style={styles.profileContent}>
            <div style={styles.profilePicture}>
                <img src={student.profilePicture || "/images/logo.png"} alt="Profile Picture" style={styles.profileImage} />
            </div>
            <form style={styles.profileForm}>
                <div style={styles.formGroup}>
                    <label htmlFor="first-name" style={styles.label}>First Name:</label>
                    <input type="text" id="first-name" name="first-name" disabled={!isEditable} style={styles.input}  value={student.firstName || ''} onChange={handleInputChange}/>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="last-name" style={styles.label}>Last Name:</label>
                    <input type="text" id="last-name" name="last-name" disabled={!isEditable} style={styles.input} value={student.lastName || ''} onChange={handleInputChange}  />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="age" style={styles.label}>Age:</label>
                    <input type="number" id="age" name="age" disabled={!isEditable} style={styles.input} value={student.age || ''} onChange={handleInputChange} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="gender" style={styles.label}>Gender:</label>
                    <select id="gender" name="gender" disabled={!isEditable} style={styles.select} value={student.gender || ''} onChange={handleInputChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address:</label>
                    <input type="email" id="email" name="email" disabled={!isEditable} style={styles.input}  value={student.email || ''} onChange={handleInputChange} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="mobile" style={styles.label}>Mobile Number:</label>
                    <input type="tel" id="mobile" name="mobile" disabled={!isEditable} style={styles.input} value={student.mobile || ''} onChange={handleInputChange}/>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="skill-level" style={styles.label}>Level:</label>
                    <select id="skill-level" name="skill-level" disabled={!isEditable} style={styles.select} value={student.skillLevel || ''} onChange={handleInputChange}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                {/*<div style={styles.formGroup}>*/}
                {/*    <label htmlFor="skill" style={styles.label}>Skill:</label>*/}
                {/*    <input type="text" id="skill" name="skill" disabled={!isEditable} style={styles.input} />*/}
                {/*</div>*/}
                {/*<div style={styles.formGroup}>*/}
                {/*    <label htmlFor="experience" style={styles.label}>Experience:</label>*/}
                {/*    <input type="text" id="experience" name="experience" disabled={!isEditable} style={styles.input} />*/}
                {/*</div>*/}
                <div style={styles.btnContainer}>
                    <button type="button" style={isButtonHovered ? {...styles.btn, ...styles.btnHover} : styles.btn}
                            onMouseOver={() => setIsButtonHovered(true)}
                            onMouseOut={() => setIsButtonHovered(false)} onClick={toggleEdit}>
                        {isEditable ? 'Save' : 'Edit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    profileContent: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        background: '#e6f2ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    profilePicture: {
        textAlign: 'center',
        marginTop: '20px'
    },
    profileImage: {
        width: '120px',
        height: '120px',
        borderRadius: '100%',
        border: '2px solid #fff',
        marginBottom: '20px'
    },
    profileForm: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(#57adeb, rgb(182, 208, 226))',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        textAlign: 'left'
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: '10px'
    },
    input: {
        flex: 2,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    select: {
        flex: 2,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    btnContainer: {
        textAlign: 'center'
    },
    btn: {
        backgroundColor: '#00274d',
        color: '#fff',
        border: 'none',
        padding: '15px 30px',
        cursor: 'pointer',
        borderRadius: '50px'
    },
    btnHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
    }
};

export default StudentProfile;

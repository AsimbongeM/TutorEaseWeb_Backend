import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import NavBar from "../navigation/NavBar.jsx";
// import StudentProfile from "./components/StudentProfile.jsx";
const TutorProfile = () => {
    const [isEditable, setIsEditable] = useState(false);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div style={styles.container}>
            <NavBar />
            <div style={styles.profileContent}>
                <div style={styles.profilePicture}>
                    <img src="person.jpg" alt="Profile Picture" style={styles.profileImage} />
                </div>
                <form style={styles.profileForm}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>Name:</label>
                        <input type="text" id="name" name="name" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="age" style={styles.label}>Age:</label>
                        <input type="number" id="age" name="age" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="gender" style={styles.label}>Gender:</label>
                        <select id="gender" name="gender" disabled={!isEditable} style={styles.select}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email Address:</label>
                        <input type="email" id="email" name="email" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="mobile" style={styles.label}>Mobile Number:</label>
                        <input type="tel" id="mobile" name="mobile" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="qualification" style={styles.label}>Qualification:</label>
                        <input type="text" id="qualification" name="qualification" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="experience" style={styles.label}>Experience:</label>
                        <input type="text" id="experience" name="experience" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="subjects" style={styles.label}>Subjects:</label>
                        <input type="text" id="subjects" name="subjects" disabled={!isEditable} style={styles.input} />
                    </div>
                    <div style={styles.btnContainer}>
                        <button type="button" style={styles.btn} onClick={toggleEdit}>
                            {isEditable ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
    },
    profileContent: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        background: '#e6f2ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    profilePicture: {
        textAlign: 'center',
        marginTop: '20px'
    },
    profileImage: {
        width: '150px',
        height: '150px',
        borderRadius: '100%',
        border: '2px solid #fff'
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
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    btnHover: {
        backgroundColor: '#0056b3'
    }
};

export default TutorProfile;

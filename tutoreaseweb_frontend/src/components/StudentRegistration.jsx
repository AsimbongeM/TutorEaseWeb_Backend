import React from 'react';

const styles = {
    registrationContent: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        background: '#e6f2ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    logo: {
        maxWidth: '120px',
        height: 'auto',
        borderRadius: '50%',
        border: '2px solid #fff',
    },
    formTitle: {
        margin: '20px 0',
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'black',
    },
    registrationForm: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(#57adeb, rgb(182, 208, 226))',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        textAlign: 'left',
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: '10px',
    },
    input: {
        flex: 2,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    select: {
        flex: 2,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    fileInput: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#fff',
        color: '#00337f',
    },
    btnContainer: {
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#00274d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '50px',
    },
    btnHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
    },
};

const StudentRegistration = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div style={styles.registrationContent}>
            <div style={styles.logoContainer}>
                <img src="/images/logo.png" alt="Logo" style={styles.logo} />
            </div>
            <h2 style={styles.formTitle}>Student Registration</h2>
            <form style={styles.registrationForm}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input type="text" id="name" name="name" required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="surname" style={styles.label}>Surname:</label>
                    <input type="text" id="surname" name="surname" required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email address or username:</label>
                    <input type="email" id="email" name="email" required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="cell" style={styles.label}>Cell number:</label>
                    <input type="tel" id="cell" name="cell" required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="age" style={styles.label}>Age:</label>
                    <input type="number" id="age" name="age" required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="skill-level" style={styles.label}>Skill level:</label>
                    <select id="skill-level" name="skill-level" required style={styles.select}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="profile-upload" style={styles.label}>Profile Picture:</label>
                    <input type="file" id="profile-upload" name="profile-upload" required style={styles.fileInput} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password:</label>
                    <input type="password" id="password" name="password" required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="confirm-password" style={styles.label}>Confirm password:</label>
                    <input type="password" id="confirm-password" name="confirm-password" required style={styles.input} />
                </div>
                <div style={styles.btnContainer}>
                    <button
                        type="submit"
                        style={isHovered ? { ...styles.btn, ...styles.btnHover } : styles.btn}
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

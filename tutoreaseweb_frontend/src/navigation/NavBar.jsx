import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';

function NavBar() {
    return (
        <Nav defaultActiveKey="/home" className="flex-column" style={styles.nav}>
            <NavLink to="/tutorprofile" style={styles.link}>Tutor Profile</NavLink>
            <NavLink  to="/student_dashboard" style={styles.link}>Student Dashboard</NavLink>
        </Nav>
    );
}

const styles = {
    nav: {
        background: 'linear-gradient(#57adeb, rgb(182, 208, 226))',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '20px',
    },
    link: {
        color: '#fff',
        padding: '10px 15px',
        textDecoration: 'none',
        borderRadius: '5px',
    },
    linkHover: {
        background: '#0056b3',
    }
};

export default NavBar;

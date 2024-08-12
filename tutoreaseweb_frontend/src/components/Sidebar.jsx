import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext.jsx";

const styles = {
    reset: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    header: {
        background: '#00274d',
        color: '#fff',
        textAlign: 'center',
        padding: '15px 10px',
        position: 'fixed',
        width: 'calc(100% - 250px)', // Adjust width considering sidebar
        left: '250px', // Adjusted for sidebar width
        top: 0,
        zIndex: 1000,
        fontSize: '24px',
        fontWeight: 'bold',
    },
    sidebar: {
        width: '250px',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#007bff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#ffffff',
        zIndex: 999,
        overflowY: 'auto', // Scroll if sidebar content overflows
    },
    sidebarHeading: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '30px',
        marginBottom: '20px',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    link: {
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        textDecoration: 'none',
        borderRadius: '4px',
        marginBottom: '0.5rem',
        fontSize: '20px',
        transition: 'background-color 0.3s',
    },
    linkActive: {
        backgroundColor: '#00274d',
    },
    linkHover: {
        backgroundColor: '#ffcc00',
        color: '#00274d',
        fontWeight: 'bold',
    },
    signOutButton: {
        width: '60%',
        background: '#00274d',
        color: '#fff',
        border: 'none',
        fontWeight: 'bold',
        padding: '10px',
        textAlign: 'left',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s',
    },
    signOutButtonHover: {
        background: '#ffcc00',
        color: '#00274d',
        transform: 'scale(1.05)',
    },
};

function Sidebar() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignOutButtonHovered, setIsSignOutButtonHovered] = useState(false);

    // Determine the correct profile link based on the user role
    const profileLink = auth.role === 'tutor' ? '/tutor-profile' : '/student-profile';
    const profileText = auth.role === 'tutor' ? 'Tutor Profile' : 'Student Profile';
    const getActiveLinkStyle = (path) => location.pathname === path ? styles.linkActive : {};

    return (
        <div style={styles.reset}>
            <header style={styles.header}>
                <h1>TutorEase</h1>
            </header>
            <div style={styles.sidebar}>
                <div>
                    <div style={styles.sidebarHeading}>
                        <i className='bi bi-speedometer me-2'></i>
                        Dashboard
                    </div>
                    <Link
                        to={profileLink}
                        style={{ ...styles.link, ...getActiveLinkStyle(profileLink) }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-person me-2'></i>
                        {profileText}
                    </Link>
                    <Link
                        to='/content'
                        style={{ ...styles.link, ...getActiveLinkStyle('/content') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-table me-2'></i>
                        Content
                    </Link>
                    <Link
                        to='/resources'
                        style={{ ...styles.link, ...getActiveLinkStyle('/resources') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-grid me-2'></i>
                        Resources
                    </Link>
                    <Link
                        to='/announcements'
                        style={{ ...styles.link, ...getActiveLinkStyle('/announcements') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-megaphone me-2'></i>
                        Announcements
                    </Link>

                    {/* Conditionally render the Schedule or Book Session link */}
                    {auth.role === 'tutor' && (
                        <Link
                            to='/schedule'
                            style={{ ...styles.link, ...getActiveLinkStyle('/schedule') }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <i className='bi bi-calendar me-2'></i>
                            Schedule
                        </Link>
                    )}
                    {auth.role === 'student' && (
                        <Link
                            to='/book-session'
                            style={{ ...styles.link, ...getActiveLinkStyle('/book-session') }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <i className='bi bi-calendar-check me-2'></i>
                            Book Session
                        </Link>
                    )}

                    <Link
                        to='/calendar'
                        style={{ ...styles.link, ...getActiveLinkStyle('/calendar') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-calendar me-2'></i>
                        Calendar
                    </Link>
                </div>
                <div>
                    <hr className='text-secondary' />
                    <button
                        style={isSignOutButtonHovered ? { ...styles.signOutButton, ...styles.signOutButtonHover } : styles.signOutButton}
                        onMouseOver={() => setIsSignOutButtonHovered(true)}
                        onMouseOut={() => setIsSignOutButtonHovered(false)}
                        onClick={() => navigate('/home')}
                    >
                        <i className='bi bi-box-arrow-right me-2'></i>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

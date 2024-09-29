import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext.jsx";
import { getAdminById } from '../services/AdminServices.js';

const styles = {
    // Styles for Admin Sidebar
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

function AdminSidebar() {
    const { auth } = useContext(AuthContext);
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignOutButtonHovered, setIsSignOutButtonHovered] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await getAdminById(auth.email);
                setAdminData(response.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };

        if (auth.role === 'admin' && auth.email) {
            fetchAdminData();
        }
    }, [auth.email, auth.role]);

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
                        to='/admin-dashboard'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin-dashboard') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-person me-2'></i>
                        {adminData ? `Welcome: ${adminData.firstName}` : 'Loading...'}
                    </Link>
                    <Link
                        to='/admin/manage-applications'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/manage-applications') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-tools me-2'></i>
                        Manage Tutor Applications
                    </Link>
                    <Link
                        to='/admin/view-students'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/view-students') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-people me-2'></i>
                        All Students
                    </Link>
                    <Link
                        to='/admin/view-tutors'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/view-tutors') }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-graph-up me-2'></i>
                        All Tutors
                    </Link>
                </div>
                <div>
                    <hr className='text-secondary' />
                    <button
                        style={isSignOutButtonHovered ? { ...styles.signOutButton, ...styles.signOutButtonHover } : styles.signOutButton}
                        onMouseOver={() => setIsSignOutButtonHovered(true)}
                        onMouseOut={() => setIsSignOutButtonHovered(false)}
                        onClick={() => navigate('/sign-in')}
                    >
                        <i className='bi bi-box-arrow-right me-2'></i>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;

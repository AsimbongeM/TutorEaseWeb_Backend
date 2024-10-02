import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../AuthContext.jsx";
import { getAdminById } from '../../../services/AdminServices.js';
import { getUnreadNotifications } from '../../../services/NotificationService.js';
import { getAllTutors } from '../../../services/TutorServices.js'; // Import the function to fetch all tutors

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
        width: 'calc(100% - 250px)', 
        left: '250px', 
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
        overflowY: 'auto',
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
    notificationBadge: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '0.2em 0.5em',
        marginLeft: '0.5em',
        fontSize: '0.8em',
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    errorMessage: {
        color: 'red',
        margin: '10px 0',
    },
    signOutButton: {
        backgroundColor: '#dc3545', // Bootstrap danger color
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutButtonHover: {
        backgroundColor: '#c82333', // Darker shade of danger color
        transform: 'scale(1.05)', // Slightly enlarge on hover
    },
};

function AdminSidebar() {
    const { auth } = useContext(AuthContext);
    const [adminData, setAdminData] = useState(null);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
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
                setErrorMessage("Failed to load admin data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchUnreadNotifications = async () => {
            try {
                const notifications = await getUnreadNotifications(); 
                setUnreadNotificationsCount(notifications.data.length); 
            } catch (error) {
                console.error("Error fetching unread notifications:", error);
            }
        };
        

        const fetchPendingApplicationsCount = async () => {
            try {
                const tutorsResponse = await getAllTutors(); 
                const tutors = tutorsResponse.data || [];  
                const pendingCount = tutors.filter(tutor => tutor.approvalStatus === 'PENDING').length; 
                setPendingApplicationsCount(pendingCount);
            } catch (error) {
                console.error("Error fetching tutors:", error);
            }
        };

        if (auth.role === 'admin' && auth.email) {
            fetchUnreadNotifications();
            fetchAdminData();
            fetchPendingApplicationsCount();
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
                        aria-label="Admin Dashboard"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-person me-2'></i>
                        {isLoading ? 'Loading...' : `Welcome: ${adminData ? adminData.firstName : 'N/A'}`}
                    </Link>
                    <Link
                        to='/admin/manage-applications'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/manage-applications') }}
                        aria-label="Manage Tutor Applications"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-tools me-2'></i>
                        Manage Tutor Applications
                        {pendingApplicationsCount > 0 && (
                            <span style={styles.notificationBadge}>{pendingApplicationsCount}</span>
                        )}
                    </Link>
                    <Link
                        to='/admin/manage-vouchers' 
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/manage-vouchers') }}
                        aria-label="Manage Vouchers"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-card-checklist me-2'></i>
                         Manage Vouchers
                    </Link>

                    <Link
                        to='/admin/view-students'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/view-students') }}
                        aria-label="View All Students"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-people me-2'></i>
                        All Students
                    </Link>
                    <Link
                        to='/admin/view-tutors'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/view-tutors') }}
                        aria-label="View All Tutors"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-graph-up me-2'></i>
                        All Tutors
                    </Link>
                    <Link
                        to='/admin/admin-notifications'
                        style={{ ...styles.link, ...getActiveLinkStyle('/admin/admin-notifications') }}
                        aria-label="Admin Notifications"
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                        <i className='bi bi-bell me-2'></i>
                        Notifications
                        {unreadNotificationsCount > 0 && (<span style={styles.notificationBadge}>{unreadNotificationsCount}</span>)} 
                    </Link>
                    {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>} {/* Display error message if any */}
                </div>
                <div>
                    <hr className='text-secondary' />
                    <button
                        style={isSignOutButtonHovered ? { ...styles.signOutButton, ...styles.signOutButtonHover } : styles.signOutButton}
                        onMouseOver={() => setIsSignOutButtonHovered(true)}
                        onMouseOut={() => setIsSignOutButtonHovered(false)}
                        onClick={() => {
                            // Implement sign out logic here
                            navigate('/sign-in');
                        }}
                        aria-label="Sign Out"
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

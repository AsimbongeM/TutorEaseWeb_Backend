import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
// Helper function to generate a unique session ID
const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
const StudentDashboard = () => {
    const [activeSection, setActiveSection] = useState('content-section'); // Set 'content-section' as the default section
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [resources, setResources] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [profile, setProfile] = useState({ name: 'Student Name', email: 'student@example.com', courses: ['Java'] });
    const [assignments, setAssignments] = useState([{ title: 'Assignment 1', dueDate: '2024-08-10', status: 'Pending' }]);
    const [grades, setGrades] = useState([{ course: 'Java', grade: 'A' }]);
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [isSignOutButtonHovered, setIsSignOutButtonHovered] = useState(false);
    const [sessionId, setSessionId] = useState(() => {
        const savedSessionId = localStorage.getItem('sessionId');
        return savedSessionId || generateSessionId();
    });

    useEffect(() => {
        localStorage.setItem('sessionId', sessionId);
    }, [sessionId]);


    const showSection = (sectionId) => {
        setActiveSection(sectionId);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBooking = () => {
        if (selectedSlot) {
            alert(`You have booked a session on ${selectedSlot.day} at ${selectedSlot.time}`);
            setSelectedSlot(null);
        } else {
            alert('Please select a slot to book.');
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { sender: 'Student', text: newMessage }]);
            setNewMessage('');
        }
    };

    const handleReceiveMessage = (text) => {
        setMessages([...messages, { sender: 'Tutor', text }]);
    };

    useEffect(() => {
        // Mock data for announcements and resources
        setAnnouncements([
            { title: 'Welcome to TutorEase', content: 'Make sure to check your Java course schedule and upcoming exercises.' },
            { title: 'Important Notice: Class Updates', content: 'There will be a guest lecture on Wednesday. Attendance is mandatory.' }
        ]);

        setResources([
            { title: 'Java Basics', description: 'Introduction to Java programming.' },
            { title: 'Advanced Java', description: 'Deep dive into Java for advanced topics.' }
        ]);

        setReminders([
            { day: 'Monday', time: '10:00 AM', course: 'Java', message: 'Upcoming class session' },
            { day: 'Wednesday', time: '2:00 PM', course: 'Java', message: 'Guest lecture reminder' }
        ]);
    }, []);

    const slots = [
        { day: 'Monday', time: '10:00 AM' },
        { day: 'Wednesday', time: '2:00 PM' },
        { day: 'Friday', time: '9:00 AM' },
    ];

    const styles = {
        reset: {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        body: {
            fontFamily: 'Arial, sans-serif',
        },
        container: {
            display: 'flex',
            height: '100vh',
            overflow: 'auto', // Updated to allow scrolling
        },
        sidebar: {
            width: '200px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
        },
        sidebarButton: {
            background: 'none',
            border: 'none',
            color: '#fff',
            textAlign: 'left',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '10px',
        },
        sidebarButtonActive: {
            backgroundColor: '#444',
        },
        contentArea: {
            marginTop: '60px',
            flex: 1,
            background: '#e6f2ff',
            // background: 'linear-gradient(#57adeb, rgb(182, 208, 226))',
            padding: '20px',
            overflowY: 'auto',
            overflowX: 'auto', // Updated to allow horizontal scrolling
        },
        header: {
            // backgroundColor: 'hsl(211, 42%, 58%)',
            backgroundColor: '#00274d',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
            position: 'fixed',
            width: 'calc(100% - 200px)',
            left: '200px',
            top: 0,
        },
        mainSection: {
            display: 'none',
        },
        mainSectionActive: {
            display: 'block',
        },
        announcement: {
            backgroundColor: '#f2f2f2',
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        thTd: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        th: {
            backgroundColor: '#e6f2ff',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: 'hsl(211, 42%, 58%)',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        chatBox: {
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '20px',
        },
        chatMessages: {
            maxHeight: '200px',
            overflowY: 'scroll',
            marginBottom: '10px',
        },
        chatInput: {
            width: 'calc(100% - 22px)',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        chatButton: {
            padding: '10px 20px',
            backgroundColor: 'hsl(211, 42%, 58%)',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        signOutButton: {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#00274d',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s'
        },
        signOutButtonHover: {
            backgroundColor: '#ffcc00',
            color: '#00274d',
            transform: 'scale(1.05)',
        },
    };

    return (
        <div id="simple-student-page" style={styles.reset}>
            <header style={styles.header}>
                <h1>TutorEase</h1>
            </header>

            <div style={styles.container}>
                <aside style={styles.sidebar}>
                    <button
                        style={{...styles.sidebarButton, ...(activeSection === 'profile-section' ? styles.sidebarButtonActive : {})}}
                        onClick={() => navigate('/student_profile')}
                    >
                        Profile
                    </button>
                    <button
                        style={{...styles.sidebarButton, ...(activeSection === 'content-section' ? styles.sidebarButtonActive : {})}}
                        onClick={() => showSection('content-section')}
                    >
                        Content
                    </button>
                    <button
                        style={{...styles.sidebarButton, ...(activeSection === 'resource-section' ? styles.sidebarButtonActive : {})}}
                        onClick={() => showSection('resource-section')}
                    >
                        Resources
                    </button>
                    <button
                        style={{...styles.sidebarButton, ...(activeSection === 'schedule-section' ? styles.sidebarButtonActive : {})}}
                        onClick={() => showSection('schedule-section')}
                    >
                        Schedule
                    </button>
                    <button
                        style={{...styles.sidebarButton, ...(activeSection === 'announcements-section' ? styles.sidebarButtonActive : {})}}
                        onClick={() => showSection('announcements-section')}
                    >
                        Announcements
                    </button>
                    <button
                        style={{...styles.sidebarButton, ...(activeSection === 'chat-section' ? styles.sidebarButtonActive : {})}}
                        onClick={() => showSection('chat-section')}
                    >
                        Chat
                    </button>
                </aside>

                <main style={styles.contentArea}>
                    <section
                        id="profile-section"
                        style={activeSection === 'profile-section' ? {...styles.mainSection, ...styles.mainSectionActive} : styles.mainSection}
                    >
                        <h2>Profile</h2>
                        <ul>
                            {profile.courses.map((course, index) => (
                                <li key={index}>{course}</li>
                            ))}
                        </ul>
                    </section>

                    <section
                        id="content-section"
                        style={activeSection === 'content-section' ? { ...styles.mainSection, ...styles.mainSectionActive } : styles.mainSection}
                    >
                        <h2>Course Content</h2>
                        {/*<img src="tutor_profile.jpg" alt="Tutor" />*/}
                        {/*<p>John Doe</p>*/}
                        {/*<p>Tutor</p>*/}
                        <section id="collaboration-section">
                            <h3>Class Collaboration</h3>
                            <NavLink to={`/class_session/${sessionId}`}>Join Session</NavLink>
                        </section>
                    </section>

                    <section
                        id="resource-section"
                        style={activeSection === 'resource-section' ? { ...styles.mainSection, ...styles.mainSectionActive } : styles.mainSection}
                    >
                        <h2>Resources</h2>
                        <ul>
                            {resources.map((resource, index) => (
                                <li key={index}>{resource.title}: {resource.description}</li>
                            ))}
                        </ul>
                    </section>

                    <section
                        id="schedule-section"
                        style={activeSection === 'schedule-section' ? { ...styles.mainSection, ...styles.mainSectionActive } : styles.mainSection}
                    >
                        <h2>My Schedule</h2>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={{ ...styles.thTd, ...styles.th }}>Day</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Time</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Course</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {slots.map((slot, index) => (
                                <tr key={index}>
                                    <td style={styles.thTd}>{slot.day}</td>
                                    <td style={styles.thTd}>{slot.time}</td>
                                    <td style={styles.thTd}>Java</td>
                                    <td style={styles.thTd}>
                                        <button style={styles.button} onClick={() => handleSlotSelect(slot)}>Book Slot</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {selectedSlot && (
                            <div>
                                <h3>Selected Slot: {selectedSlot.day} at {selectedSlot.time}</h3>
                                <button style={styles.button} onClick={handleBooking}>Confirm Booking</button>
                            </div>
                        )}
                    </section>

                    <section
                        id="announcements-section"
                        style={activeSection === 'announcements-section' ? { ...styles.mainSection, ...styles.mainSectionActive } : styles.mainSection}
                    >
                        <h2>Announcements</h2>
                        {announcements.map((announcement, index) => (
                            <div className="announcement" style={styles.announcement} key={index}>
                                <h3>{announcement.title}</h3>
                                <p>{announcement.content}</p>
                            </div>
                        ))}
                    </section>

                    <section
                        id="chat-section"
                        style={activeSection === 'chat-section' ? { ...styles.mainSection, ...styles.mainSectionActive } : styles.mainSection}
                    >
                        <h2>Chat with Tutor</h2>
                        <div style={styles.chatBox}>
                            <div style={styles.chatMessages}>
                                {messages.map((message, index) => (
                                    <div key={index}>
                                        <strong>{message.sender}:</strong> {message.text}
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                style={styles.chatInput}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button style={styles.chatButton} onClick={handleSendMessage}>Send</button>
                        </div>
                    </section>
                </main>
            </div>

            {/* Sign Out Button */}
            <button style={isSignOutButtonHovered ? {...styles.signOutButton, ...styles.signOutButtonHover} : styles.signOutButton}
                    onMouseOver={() => setIsSignOutButtonHovered(true)}
                    onMouseOut={() => setIsSignOutButtonHovered(false)}
                    onClick={() => navigate('/home')}>
                Sign Out</button>
        </div>
    );
};

export default StudentDashboard;

import React, { useState, useEffect } from 'react';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import './App.css'; // Add your CSS here

const TutorEase = () => {
    const [activeSection, setActiveSection] = useState('content');
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const calendarContainer = document.getElementById('calendar');
        new Pikaday({
            field: document.createElement('input'),
            container: calendarContainer,
            format: 'YYYY-MM-DD',
            onSelect: function(date) {
                console.log(date.toDateString());
            }
        });

        const handleClickOutside = (event) => {
            if (!calendarContainer.contains(event.target)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSidebarButtonClick = (section) => {
        setActiveSection(section);
    };

    const handleCalendarButtonClick = (e) => {
        e.stopPropagation();
        setShowCalendar(!showCalendar);
    };

    return (
        <div id="simple-tutor-page">
            <header className="header">
                <h1>TutorEase</h1>
            </header>

            <div className="container">
                <aside className="sidebar">
                    <button
                        className={`sidebar-button ${activeSection === 'profile' ? 'sidebar-button-active' : ''}`}
                        onClick={() => handleSidebarButtonClick('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`sidebar-button ${activeSection === 'content' ? 'sidebar-button-active' : ''}`}
                        onClick={() => handleSidebarButtonClick('content')}
                    >
                        Content
                    </button>
                    <button
                        className={`sidebar-button ${activeSection === 'resources' ? 'sidebar-button-active' : ''}`}
                        onClick={() => handleSidebarButtonClick('resources')}
                    >
                        Resources
                    </button>
                    <button
                        className={`sidebar-button ${activeSection === 'schedule' ? 'sidebar-button-active' : ''}`}
                        onClick={() => handleSidebarButtonClick('schedule')}
                    >
                        Schedule
                    </button>
                    <button
                        className={`sidebar-button ${activeSection === 'announcements' ? 'sidebar-button-active' : ''}`}
                        onClick={() => handleSidebarButtonClick('announcements')}
                    >
                        Announcements
                    </button>
                    <button
                        className={`sidebar-button`}
                        onClick={handleCalendarButtonClick}
                    >
                        Calendar
                    </button>
                    <div id="calendar" style={{ display: showCalendar ? 'block' : 'none' }}></div>
                </aside>

                <main className="content-area">
                    {activeSection === 'profile' && (
                        <section id="profile-section" className="main-section main-section-active">
                            <h2>Profile</h2>
                            <p>Name: Tutor Name</p>
                            <p>Email: tutor@example.com</p>
                            <p>Courses: Java</p>
                        </section>
                    )}
                    {activeSection === 'content' && (
                        <section id="content-section" className="main-section main-section-active">
                            <h2>Course Content</h2>
                            <p>Manage your course content here.</p>
                        </section>
                    )}
                    {activeSection === 'resources' && (
                        <section id="resource-section" className="main-section main-section-active">
                            <h2>Resources</h2>
                            <div className="announcement">
                                <h3>Java Basics</h3>
                                <p>Introduction to Java programming.</p>
                            </div>
                            <div className="announcement">
                                <h3>Advanced Java</h3>
                                <p>Deep dive into Java for advanced topics.</p>
                            </div>
                        </section>
                    )}
                    {activeSection === 'schedule' && (
                        <section id="schedule-section" className="main-section main-section-active">
                            <h2>Schedule</h2>
                            <div>
                                <h3>Select a Slot</h3>
                                <div>
                                    <input type="radio" id="slot-0" name="slot" value="Monday at 10:00 AM" />
                                    <label htmlFor="slot-0">Monday at 10:00 AM</label>
                                </div>
                                <div>
                                    <input type="radio" id="slot-1" name="slot" value="Wednesday at 2:00 PM" />
                                    <label htmlFor="slot-1">Wednesday at 2:00 PM</label>
                                </div>
                                <div>
                                    <input type="radio" id="slot-2" name="slot" value="Friday at 9:00 AM" />
                                    <label htmlFor="slot-2">Friday at 9:00 AM</label>
                                </div>
                            </div>
                            <button className="button" id="book-slot-button">Book Slot</button>
                        </section>
                    )}
                    {activeSection === 'announcements' && (
                        <section id="announcements-section" className="main-section main-section-active">
                            <h2>Announcements</h2>
                            <div className="announcement">
                                <h3>Welcome to TutorEase</h3>
                                <p>Make sure to check your Java course schedule and upcoming exercises.</p>
                            </div>
                            <div className="announcement">
                                <h3>Important Notice: Class Updates</h3>
                                <p>There will be a guest lecture on Wednesday. Attendance is mandatory.</p>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            <button
                className="sign-out-button"
                id="sign-out-button"
                onMouseOver={(e) => e.currentTarget.classList.add('sign-out-button-hover')}
                onMouseOut={(e) => e.currentTarget.classList.remove('sign-out-button-hover')}
            >
                Sign Out
            </button>
        </div>
    );
};

export default TutorEase;

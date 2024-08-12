// import React, { useState } from 'react';
// import {NavLink, useNavigate} from 'react-router-dom';
//
// const App = () => {
//     const [activeSection, setActiveSection] = useState('content-section');
//     const [calendarVisible, setCalendarVisible] = useState(false);
//
//     const handleSidebarClick = (section) => {
//         setActiveSection(section);
//     };
//
//     const handleSignOutHover = (event, hover) => {
//         event.target.style.backgroundColor = hover ? '#ffcc00' : '#00274d';
//         event.target.style.color = hover ? '#00274d' : '#fff';
//         event.target.style.transform = hover ? 'scale(1.05)' : 'scale(1)';
//     };
//
//     const toggleCalendar = () => {
//         setCalendarVisible(!calendarVisible);
//     };
//
//     return (
//         <div id="simple-tutor-page">
//             <header
//                 style={{
//                     backgroundColor: '#00274d',
//                     color: '#fff',
//                     textAlign: 'center',
//                     padding: '10px',
//                     position: 'fixed',
//                     width: 'calc(100% - 200px)',
//                     left: '200px',
//                     top: 0,
//                 }}
//             >
//                 <h1>TutorEase</h1>
//             </header>
//
//             <div
//                 style={{
//                     display: 'flex',
//                     height: '100vh',
//                     overflow: 'auto',
//                 }}
//             >
//                 <aside
//                     style={{
//                         width: '200px',
//                         backgroundColor: '#007bff',
//                         color: '#fff',
//                         padding: '20px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                     }}
//                 >
//                     <button
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#fff',
//                             textAlign: 'left',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             fontSize: '16px',
//                             marginBottom: '10px',
//                         }}
//                         onClick={() => handleSidebarClick('profile-section')}
//                     >
//                         Profile
//                     </button>
//                     <button
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#fff',
//                             textAlign: 'left',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             fontSize: '16px',
//                             marginBottom: '10px',
//                             backgroundColor: activeSection === 'content-section' ? '#444' : 'none',
//                         }}
//                         onClick={() => handleSidebarClick('content-section')}
//                     >
//                         Content
//                     </button>
//                     <button
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#fff',
//                             textAlign: 'left',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             fontSize: '16px',
//                             marginBottom: '10px',
//                         }}
//                         onClick={() => handleSidebarClick('resource-section')}
//                     >
//                         Resources
//                     </button>
//                     <button
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#fff',
//                             textAlign: 'left',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             fontSize: '16px',
//                             marginBottom: '10px',
//                         }}
//                         onClick={() => handleSidebarClick('schedule-section')}
//                     >
//                         Schedule
//                     </button>
//                     <button
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#fff',
//                             textAlign: 'left',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             fontSize: '16px',
//                             marginBottom: '10px',
//                         }}
//                         onClick={() => handleSidebarClick('announcements-section')}
//                     >
//                         Announcements
//                     </button>
//                     <button
//                         style={{
//                             background: 'none',
//                             border: 'none',
//                             color: '#fff',
//                             textAlign: 'left',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             fontSize: '16px',
//                             marginBottom: '10px',
//                         }}
//                         onClick={toggleCalendar}
//                     >
//                         Calendar
//                     </button>
//                     <div
//                         id="calendar"
//                         style={{
//                             display: calendarVisible ? 'block' : 'none',
//                             position: 'absolute',
//                             top: '70px',
//                             right: '20px',
//                             zIndex: 1000,
//                         }}
//                     />
//                 </aside>
//
//                 <main
//                     style={{
//                         marginTop: '60px',
//                         flex: 1,
//                         background: '#e6f2ff',
//                         padding: '20px',
//                         overflowY: 'auto',
//                         overflowX: 'auto',
//                     }}
//                 >
//                     <section
//                         id="profile-section"
//                         style={{
//                             display: activeSection === 'profile-section' ? 'block' : 'none',
//                         }}
//                     >
//                         <h2>Profile</h2>
//                         <p>Name: Tutor Name</p>
//                         <p>Email: tutor@example.com</p>
//                         <p>Courses: Java</p>
//                     </section>
//
//                     <section
//                         id="content-section"
//                         style={{
//                             display: activeSection === 'content-section' ? 'block' : 'none',
//                         }}
//                     >
//                         <h2>Course Content</h2>
//                         <p>Manage your course content here.</p>
//                     </section>
//
//                     <section
//                         id="resource-section"
//                         style={{
//                             display: activeSection === 'resource-section' ? 'block' : 'none',
//                         }}
//                     >
//                         <h2>Resources</h2>
//                         <div
//                             style={{
//                                 backgroundColor: '#f2f2f2',
//                                 border: '1px solid #ccc',
//                                 padding: '10px',
//                                 marginBottom: '10px',
//                             }}
//                         >
//                             <h3>Java Basics</h3>
//                             <p>Introduction to Java programming.</p>
//                         </div>
//                         <div
//                             style={{
//                                 backgroundColor: '#f2f2f2',
//                                 border: '1px solid #ccc',
//                                 padding: '10px',
//                                 marginBottom: '10px',
//                             }}
//                         >
//                             <h3>Advanced Java</h3>
//                             <p>Deep dive into Java for advanced topics.</p>
//                         </div>
//                     </section>
//
//                     <section
//                         id="schedule-section"
//                         style={{
//                             display: activeSection === 'schedule-section' ? 'block' : 'none',
//                         }}
//                     >
//                         <h2>Schedule</h2>
//                         <div>
//                             <h3>Select a Slot</h3>
//                             <div>
//                                 <input type="radio" id="slot-0" name="slot" value="Monday at 10:00 AM" />
//                                 <label htmlFor="slot-0">Monday at 10:00 AM</label>
//                             </div>
//                             <div>
//                                 <input type="radio" id="slot-1" name="slot" value="Wednesday at 2:00 PM" />
//                                 <label htmlFor="slot-1">Wednesday at 2:00 PM</label>
//                             </div>
//                             <div>
//                                 <input type="radio" id="slot-2" name="slot" value="Friday at 9:00 AM" />
//                                 <label htmlFor="slot-2">Friday at 9:00 AM</label>
//                             </div>
//                         </div>
//                         <button
//                             style={{
//                                 padding: '10px 20px',
//                                 backgroundColor: 'hsl(211, 42%, 58%)',
//                                 color: '#fff',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             Book Slot
//                         </button>
//                     </section>
//
//                     <section
//                         id="announcements-section"
//                         style={{
//                             display: activeSection === 'announcements-section' ? 'block' : 'none',
//                         }}
//                     >
//                         <h2>Announcements</h2>
//                         <div
//                             style={{
//                                 backgroundColor: '#f2f2f2',
//                                 border: '1px solid #ccc',
//                                 padding: '10px',
//                                 marginBottom: '10px',
//                             }}
//                         >
//                             <h3>Welcome to TutorEase</h3>
//                             <p>Make sure to check your Java course schedule and upcoming exercises.</p>
//                         </div>
//                         <div
//                             style={{
//                                 backgroundColor: '#f2f2f2',
//                                 border: '1px solid #ccc',
//                                 padding: '10px',
//                                 marginBottom: '10px',
//                             }}
//                         >
//                             <h3>Important Notice: Class Updates</h3>
//                             <p>There will be a guest lecture on Wednesday. Attendance is mandatory.</p>
//                         </div>
//                     </section>
//                 </main>
//             </div>
//
//             <button
//                 id="sign-out-button"
//                 style={{
//                     position: 'fixed',
//                     bottom: '20px',
//                     left: '20px',
//                     padding: '10px 20px',
//                     backgroundColor: '#00274d',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '50px',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.3s, transform 0.3s',
//                 }}
//                 onMouseOver={(e) => handleSignOutHover(e, true)}
//                 onMouseOut={(e) => handleSignOutHover(e, false)}
//             >
//                 Sign Out
//             </button>
//         </div>
//     );
// };
//
// export default App;

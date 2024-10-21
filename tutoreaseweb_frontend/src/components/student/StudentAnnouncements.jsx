import React, {useState, useEffect, useContext} from 'react';
import {fetchAllAnnouncements} from "../../services/AnnouncementsServices.js";
import { AuthContext } from "../AuthContext.jsx";

function StudentAnnouncements() {
    const { auth } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async (email) => {
        try {
            const response = await fetchAllAnnouncements(email);
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    useEffect(() => {
        if (auth && auth.email) {
            fetchAnnouncements(auth.email);
        }
    }, [auth]);

    return (
        <section className="container mt-4">
            <h2 className="mb-4 text-primary text-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                Tutor Announcements
            </h2>
            {announcements.length > 0 ? (
                <div className="list-group">
                    {announcements.map((text) => (
                        <div key={text.id} className="list-group-item" style={{ backgroundColor: '#f8f9fa', borderColor: '#00274d' }}>
                            <div style={{ color: 'black' }}>
                                {text.text || 'No content available'}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-secondary text-center" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    No announcements available at the moment.
                </p>
            )}
        </section>
    );
}

export default StudentAnnouncements;

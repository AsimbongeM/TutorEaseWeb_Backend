import React, {useState, useEffect, useContext} from 'react';
import {fetchAllAnnouncements} from "../../services/AnnouncementsServices.js";
import { AuthContext } from "../AuthContext.jsx";

// Ensure this service fetches all announcements

function StudentAnnouncements() {
    const { auth } = useContext(AuthContext);
    const [announcements, setAnnouncements] = useState([]);

    // Move the fetchAnnouncements function above the useEffect hook
    const fetchAnnouncements = async (email) => {
        try {
            console.log("Before fetch announcements:");

            const response = await fetchAllAnnouncements(email);
            console.log("announcements:", response);
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
            <h2 className="mb-4">Available Announcements</h2>
            {announcements.length > 0 ? (
                <div className="list-group">
                    {announcements.map((text) => (
                        <div key={text.id} className="list-group-item">
                            <div>
                                {text.text || 'No content available'}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No announcements available at the moment.</p>
            )}
        </section>
    );
}

export default StudentAnnouncements;

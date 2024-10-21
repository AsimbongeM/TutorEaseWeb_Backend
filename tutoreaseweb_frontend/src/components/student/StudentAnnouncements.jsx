import React, { useState, useEffect, useContext } from 'react';
import { fetchAllAnnouncements } from "../../services/AnnouncementsServices.js";
import { AuthContext } from "../AuthContext.jsx";

function StudentAnnouncements() {
    const { auth } = useContext(AuthContext);  // Assume this provides auth data
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);  // Add a loading state
    const [error, setError] = useState(null);     // Add an error state

    useEffect(() => {
        if (auth) {
            const fetchAnnouncements = async () => {
                try {
                    console.log("Before fetching announcements");
                    const response = await fetchAllAnnouncements();  // Await the data from the service
                    console.log("announcements:", response.data);  // Log the fetched announcements
                    setAnnouncements(response.data);  // Set the fetched announcements to state
                    setLoading(false);  // Stop loading after data is fetched
                } catch (error) {
                    console.error("Error fetching announcements:", error);
                    setError('Failed to load announcements.');
                    setLoading(false);  // Stop loading on error
                }
            };

            fetchAnnouncements();  // Call the async function
        }
    }, [auth]);

    // Loading and error handling
    if (loading) {
        return <p>Loading announcements...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="container mt-4">
            <h2 className="mb-4">Available Announcements</h2>
            {announcements.length > 0 ? (
                <div className="list-group">
                    {announcements.map((text) => (
                        <div key={text.id} className="list-group-item">
                            <div>{text.text || 'No content available'}</div>
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

import axios from 'axios';

const ANNOUNCEMENTS_API_URL = 'http://localhost:8080/tutoreaseweb/announcements';

// Create a new announcement
export const postAnnouncement = async (announcement, tutorEmail) => {
    await axios.post(`${ANNOUNCEMENTS_API_URL}/create`, { announcement, tutorEmail });
};

// Fetch announcements for a specific tutor
export const fetchAnnouncements = async (tutorEmail) => {
    return await axios.get(`${ANNOUNCEMENTS_API_URL}`, { params: { tutorEmail } });
};

// Update an existing announcement
export const updateAnnouncement = async (id, announcement) => {
    await axios.put(`${ANNOUNCEMENTS_API_URL}/update/${id}`, { announcement });
};

// Delete an announcement
export const deleteAnnouncement = async (id) => {
    await axios.delete(`${ANNOUNCEMENTS_API_URL}/delete/${id}`);
};

import axios from 'axios';

const ANNOUNCEMENTS_API_URL = 'http://localhost:8080/tutoreaseweb/announcements';

// Create a new announcement
export const postAnnouncement = async (announcementText, tutorEmail) => {
    await axios.post(`${ANNOUNCEMENTS_API_URL}/create`, {
        text: announcementText,
        tutor: { email: tutorEmail }
    });
};

// Fetch announcements for a specific tutor
export const fetchAnnouncements = async (tutorEmail) => {
    return await axios.get(`${ANNOUNCEMENTS_API_URL}/getAnnouncementsByTutorEmail`, {
        tutor: { email: tutorEmail }
    });
};

// Update an existing announcement
export const updateAnnouncement = async (id, announcementText) => {
    await axios.put(`${ANNOUNCEMENTS_API_URL}/update/${id}`, {
        text: announcementText
    });
};

// Delete an announcement
export const deleteAnnouncement = async (id) => {
    await axios.delete(`${ANNOUNCEMENTS_API_URL}/delete/${id}`);
};

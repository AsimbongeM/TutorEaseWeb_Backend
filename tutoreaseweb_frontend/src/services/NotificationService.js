import axios from 'axios';

const BASE_URL = 'http://localhost:8080/tutoreaseweb/notifications';

// Create a new notification
export const createNotification = async (message) => {
    try {
        const response = await axios.post(`${BASE_URL}`, { message });
        return response.data;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

// Fetch all notifications
// export const getAllNotifications = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/all`);
//         const resData = response.data;
//         return resData;
//     } catch (error) {
//         console.error('Error fetching notifications:', error);
//         throw error;
//     }
// };


export const getAllNotifications = () => {
    return axios.get(`${BASE_URL}/all`);
};

export const markAsRead = (id) => {
    return axios.put(`${BASE_URL}/mark-as-read/${id}`);
};
export const getUnreadNotifications = (id) => {
    return axios.get(`${BASE_URL}/unread`);
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

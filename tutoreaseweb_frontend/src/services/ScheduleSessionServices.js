// ScheduleSessionServices.js
import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/scheduleSession";
// const TOPICS_API_URL = "http://localhost:8080/tutoreaseweb/topics";

// Create a new session
export const createSession = async (session) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, session);
        return response.data;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

// Get all sessions
export const getAllSessions = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/getAll`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
    }
};

// Get a single session by ID
export const getSessionById = async (id) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching session by ID:', error);
        throw error;
    }
};

// Update a session by ID
export const updateSession = async (id, session) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${id}`, session);
        return response.data;
    } catch (error) {
        console.error('Error updating session:', error);
        throw error;
    }
};

// Delete a session by ID
export const deleteSession = async (id) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${id}`);
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/*Topic services*/
// export const getAllTopics = async () => {
//     try {
//         const response = await axios.get(`${TOPICS_API_URL}/getAll`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching topics:', error);
//         throw error;
//     }
// };

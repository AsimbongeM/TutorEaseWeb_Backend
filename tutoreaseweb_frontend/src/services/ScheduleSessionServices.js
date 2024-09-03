import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/scheduleSession";

// Create a new session
export const createSession = async (session) => {
    try {
        // Ensure session has a valid tutor
        if (session.tutor && !session.tutor.email) {
            throw new Error('Tutor email is required');
        }
        const response = await axios.post(`${REST_API_BASE_URL}/create`, session);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.error('Error creating session: Invalid tutor or other data.', error.response.data);
        } else {
            console.error('Error creating session:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
};


// Get sessions for a specific tutor
export const getSessionsByTutorEmail = async (tutorEmail) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/getSessionsByEmail`, { params: { tutorEmail } });
        console.log('API Response:', response.data); // Check API response
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions:', error.response ? error.response.data : error.message);
        throw error;
    }
};



// Update a session by ID
export const updateSession = async (id, session) => {
    try {
        // Ensure session has a valid tutor
        if (session.tutor && !session.tutor.email) {
            throw new Error('Tutor email is required');
        }
        const response = await axios.put(`${REST_API_BASE_URL}/update/${id}`, session);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.error('Error updating session: Invalid tutor or other data.', error.response.data);
        } else if (error.response && error.response.status === 404) {
            console.error('Error updating session: Session not found.', error.response.data);
        } else {
            console.error('Error updating session:', error.response ? error.response.data : error.message);
        }
        throw error;
    }
};

// Delete a session by ID
export const deleteSession = async (id) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${id}`);
    } catch (error) {
        console.error('Error deleting session:', error.response ? error.response.data : error.message);
        throw error;
    }
};

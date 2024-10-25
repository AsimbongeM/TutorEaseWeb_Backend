import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/booksession";

// Create a new booking session
export const createBookSession = async (sessionData) => {
    try {
        console.log("data being sent: " + JSON.stringify(sessionData, null, 2))
        const response = await axios.post(`${REST_API_BASE_URL}/create`, sessionData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating the session:', error);
        throw error;
    }
};
export const createABookSession = async (sessionData) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, sessionData);
        return response.data; // or handle response as needed
    } catch (error) {
        console.error("Error creating booking session:", error);
        throw error; // Rethrow or handle the error appropriately
    }
};


// Update an existing booking session by ID
export const updateBookSession = async (sessionId, sessionData) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${sessionId}`, sessionData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating the session:', error);
        throw error;
    }
};

// Get (Read) a booking session by ID
export const getBookSession = async (sessionId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${sessionId}`);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching the session:', error);
        throw error;
    }
};

// Get all booking sessions
export const getAllBookSessions = async () => {
    try {
        return  await axios.get(`${REST_API_BASE_URL}/getAll`);

    } catch (error) {
        console.error('Error fetching all sessions:', error);
        throw error;
    }
};

// Delete a booking session by ID
export const deleteBookSession = async (sessionId) => {
    try {
        const response = await axios.delete(`${REST_API_BASE_URL}/delete/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting the session:', error);
        throw error;
    }
};

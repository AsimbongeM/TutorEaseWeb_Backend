import axios from "axios";

const TOPICS_API_URL = "http://localhost:8080/tutoreaseweb/topics";

// Get all topics
export const getAllTopics = async () => {
    try {
        const response = await axios.get(`${TOPICS_API_URL}/getAll`);
        return response.data; // Ensure this includes the topic level
    } catch (error) {
        console.error('Error fetching topics:', error.response ? error.response.data : error.message);
        throw error;
    }
};

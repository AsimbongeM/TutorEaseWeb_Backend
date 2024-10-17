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
export const createTopic = async (topicData) => {
    try {
        const response = await axios.post(`${TOPICS_API_URL}/create`, topicData);
        return response.data; // The created topic
    } catch (error) {
        console.error('Error creating topic:', error.response ? error.response.data : error.message);
        throw error;
    }
};
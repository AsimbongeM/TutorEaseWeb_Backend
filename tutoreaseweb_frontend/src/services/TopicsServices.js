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
// Update an existing topic
export const updateTopic = async (topicId, topicData) => {
    try {
        const response = await axios.put(`${TOPICS_API_URL}/update`, { id: topicId, ...topicData });
        return response.data; // The updated topic
    } catch (error) {
        console.error('Error updating topic:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// Delete a topic by ID
export const deleteTopic = async (topicId) => {
    try {
        await axios.delete(`${TOPICS_API_URL}/delete/${topicId}`);
    } catch (error) {
        console.error('Error deleting topic:', error.response ? error.response.data : error.message);
        throw error;
    }
};
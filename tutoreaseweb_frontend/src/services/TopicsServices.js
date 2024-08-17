import axios from "axios";


const TOPICS_API_URL = "http://localhost:8080/tutoreaseweb/topics";

export const getAllTopics=()=> axios.get(`${TOPICS_API_URL}/getAll`);
// Fetch all topic levels
export const getTopicLevels = () => axios.get(`${TOPICS_API_URL}/topic_level`);
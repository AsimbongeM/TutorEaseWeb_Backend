import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/authentication";
export const auth = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });
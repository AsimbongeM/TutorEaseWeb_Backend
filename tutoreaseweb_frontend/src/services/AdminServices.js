import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/admin";

export const getAdminById = (email) =>
    axios.get(`${REST_API_BASE_URL}/read/${email}`);


export const signInAdmin = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });
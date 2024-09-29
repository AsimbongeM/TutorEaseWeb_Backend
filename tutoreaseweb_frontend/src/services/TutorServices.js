import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/tutor";

export const getTutorById = (email) =>
    axios.get(`${REST_API_BASE_URL}/read/${email}`);

export const createTutor = (tutor) =>
    axios.post(`${REST_API_BASE_URL}/create`, tutor);

export const deleteTutorById = (email) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${email}`);

export const updateTutor = (email, tutor) =>
    axios.put(`${REST_API_BASE_URL}/update/${email}`, tutor);

export const tutorSignIn = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });
// function to fetch all tutors
export const getAllTutors = () =>
    axios.get(`${REST_API_BASE_URL}/getAll`);
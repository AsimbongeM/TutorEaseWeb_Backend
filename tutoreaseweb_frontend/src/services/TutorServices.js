import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/tutor";

export const getTutorById = (email) =>
    axios.get(`${REST_API_BASE_URL}/read/${email}`);

export const createTutor = (tutorData) => {
    const formData = new FormData();
    Object.keys(tutorData).forEach(key => {
        formData.append(key, tutorData[key]);
    });
    return axios.post(`${REST_API_BASE_URL}/createTutor`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
};

export const updateTutor = (tutorData) => {
    const formData = new FormData();
    Object.keys(tutorData).forEach(key => {
        formData.append(key, tutorData[key]);
    });
    return axios.put(`${REST_API_BASE_URL}/updateTutor`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
};

export const deleteTutorById = (email) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${email}`);

export const tutorSignIn = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });
// function to fetch all tutors
export const getAllTutors = () =>
    axios.get(`${REST_API_BASE_URL}/getAll`);

// Function to fetch all approved tutors
export const getApprovedTutors = () =>
    axios.get(`${REST_API_BASE_URL}/approved-tutors`);
export const updateTutor1 = (email, tutor) =>
    axios.put(`${REST_API_BASE_URL}/update/${email}`, tutor);
export const getTutorImageUrl = (email) => `${REST_API_BASE_URL}/profilePicture/${email}`;
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/student";

export const getStudentById = (id) =>
    axios.get(`${REST_API_BASE_URL}/read/${id}`);
export const createStudent = (student) =>
    axios.post(`${REST_API_BASE_URL}/create`, student);
export const deleteStudentById = (id) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${id}`);
export const disableStudentProfile = (id) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${id}`);
export const updateStudent = (id, student) =>
    axios.put(`${REST_API_BASE_URL}/update/${id}`, student);
export const signIn = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });
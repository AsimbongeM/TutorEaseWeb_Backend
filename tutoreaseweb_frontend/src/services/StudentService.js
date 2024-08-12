import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/tutoreaseweb/student";

export const getStudentById = (email) =>
    axios.get(`${REST_API_BASE_URL}/read/${email}`);

export const createStudent = (student) =>
    axios.post(`${REST_API_BASE_URL}/create`, student);

export const deleteStudentById = (email) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${email}`);

export const updateStudent = (email, student) =>
    axios.put(`${REST_API_BASE_URL}/update/${email}`, student);

export const studentSignIn = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });
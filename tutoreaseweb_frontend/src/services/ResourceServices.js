import axios from 'axios';

const FILE_API_URL = 'http://localhost:8080/tutoreaseweb/resource';

export const uploadFile = async (file, type, tutorEmail) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('tutorEmail', tutorEmail);

    await axios.post(`${FILE_API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const fetchFiles = async (tutorEmail) => {
    return await axios.get(FILE_API_URL, { params: { tutorEmail } });
};

export const deleteFile = async (id) => {
    await axios.delete(`${FILE_API_URL}/delete/${id}`);
};

export const updateFile = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.put(`${FILE_API_URL}/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

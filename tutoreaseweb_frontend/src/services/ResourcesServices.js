import axios from 'axios';

const FILE_API_URL = 'http://localhost:8080/tutoreaseweb/resources';

// Function to upload a file
export const uploadFile = async (file, type, tutorEmail) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('tutorEmail', tutorEmail);

    try {
        await axios.post(`${FILE_API_URL}/upload`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // Re-throw error to be handled by the calling code
    }
};

// Function to fetch files
export const fetchFiles = async (tutorEmail) => {
    try {
        const response = await axios.get(FILE_API_URL, {params: {tutorEmail}});
        return response.data; // Return data from response
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error; // Re-throw error to be handled by the calling code
    }
};

// Function to delete a file
export const deleteFile = async (id) => {
    try {
        await axios.delete(`${FILE_API_URL}/delete/${id}`);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error; // Re-throw error to be handled by the calling code
    }
};

// Function to update a file
export const updateFile = async (id, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        await axios.put(`${FILE_API_URL}/update/${id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    } catch (error) {
        console.error('Error updating file:', error);
        throw error; // Re-throw error to be handled by the calling code
    }
};

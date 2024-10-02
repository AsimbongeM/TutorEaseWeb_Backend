import axios from "axios";
const BASE_URL = "http://localhost:8080/tutoreaseweb/voucher";


    // Create a new voucher
    export const createVoucher = async (code) => {
        try {
            const response = await axios.post(BASE_URL, null, {
                params: { code },
            });
            return response.data; // Return the created voucher
        } catch (error) {
            console.error("Error creating voucher:", error);
            throw error; // Rethrow the error for further handling
        }
    };

    // Get a voucher by ID
    export const getVoucherById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data; // Return the found voucher
        } catch (error) {
            console.error("Error fetching voucher by ID:", error);
            throw error; // Rethrow the error for further handling
        }
    };

    // Get a voucher by code
    export const getVoucherByCode = async (code) => {
        try {
            const response = await axios.get(`${BASE_URL}/code/${code}`);
            return response.data; // Return the found voucher
        } catch (error) {
            console.error("Error fetching voucher by code:", error);
            throw error; // Rethrow the error for further handling
        }
    };

    // Get all vouchers
    export const getAllVouchers = async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data; // Return the list of vouchers
        } catch (error) {
            console.error("Error fetching all vouchers:", error);
            throw error; // Rethrow the error for further handling
        }
    };

    // Redeem a voucher by code
    export const redeemVoucher = async (code) => {
        try {
            const response = await axios.post(`${BASE_URL}/redeem`, null, {
                params: { code },
            });
            return response.data; // Return the redeemed voucher
        } catch (error) {
            console.error("Error redeeming voucher:", error);
            throw error; // Rethrow the error for further handling
        }
    };

    // Delete a voucher by ID
    export const deleteVoucher = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true; // Return true to indicate successful deletion
        } catch (error) {
            console.error("Error deleting voucher:", error);
            throw error; // Rethrow the error for further handling
        }
    };
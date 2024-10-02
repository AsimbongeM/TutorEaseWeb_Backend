import React, { useState, useEffect } from 'react';
import '../styles/AdminVoucher.css';
import {
    createVoucher,
    deleteVoucher,
    getAllVouchers,
} from '../../../services/VoucherServices.js'; // Import the voucher services

const AdminVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch all vouchers on component mount
    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const fetchedVouchers = await getAllVouchers();
                setVouchers(fetchedVouchers); // Set the fetched vouchers
            } catch (error) {
                console.error('Error fetching vouchers:', error);
                setErrorMessage('Failed to load vouchers. Please try again.');
            }
        };

        fetchVouchers();
    }, []);

    // Function to generate a random 10-digit voucher code
    const generateVoucherCode = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generate 10-digit code
    };

    // Handle creating a voucher (using generated code)
    const handleCreateVoucher = async (e) => {
        e.preventDefault();
        const generatedCode = generateVoucherCode(); // Generate the voucher code
        try {
            const newVoucher = await createVoucher(generatedCode); // Pass the generated code to the service
            setVouchers((prev) => [...prev, newVoucher]); 
            setSuccessMessage(`Voucher created successfully with code: ${generatedCode}`);
        } catch (error) {
            console.error('Error creating voucher:', error);
            setErrorMessage('Failed to create voucher. Please try again.');
        }
    };

    // Handle deleting a voucher
    const handleDeleteVoucher = async (id) => {
        try {
            const isDeleted = await deleteVoucher(id);
            if (isDeleted) {
                setVouchers((prev) => prev.filter((voucher) => voucher.id !== id)); 
                setSuccessMessage('Voucher deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting voucher:', error);
            setErrorMessage('Failed to delete voucher. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Voucher Management</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            
            {/* Button to generate a voucher */}
            <form onSubmit={handleCreateVoucher}>
                <button type="submit">Generate Voucher</button>
            </form>

            <h3>Existing Vouchers</h3>
            <ul>
                {vouchers.map((voucher) => (
                    <li key={voucher.id}>
                        {voucher.code} - Created At: {new Date(voucher.createdAt).toLocaleString()} - Expires 30 days after creattion/redemption!
                        <button onClick={() => handleDeleteVoucher(voucher.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminVoucher;

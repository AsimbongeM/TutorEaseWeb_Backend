import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './adminSidebar.jsx';

function AdminLayout() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AdminSidebar />
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;

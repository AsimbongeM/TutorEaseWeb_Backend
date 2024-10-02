import React, { useEffect, useState } from 'react';
import { getAllNotifications, markAsRead } from '../../../services/NotificationService.js';
import '../styles/AdminNotifications.css';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const response = await getAllNotifications();
               
                // Map the notifications and set isRead based on is_read
                const notificationsData = response.data.map(notification => ({
                    ...notification,
                    isRead: notification.is_read === 0 // Set isRead to true if is_read is 0 (unread)
                }));
                // Sort notifications by createdAt in descending order (newest first)
                notificationsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                setNotifications(notificationsData || []);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id);
            
            // Update the notification in state to reflect it has been marked as read
            setNotifications(prevNotifications => {
                const updatedNotifications = prevNotifications.map(notification =>
                    notification.id === id 
                        ? { ...notification, isRead: false, is_read: 1 } // Update both isRead and is_read
                        : notification
                );
                return updatedNotifications;
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (loading) {
        return <p>Loading notifications...</p>;
    }

    return (
        <div className="admin-notifications">
            <h3>Notifications</h3>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id} className={notification.read ? 'unread' : 'read'}>
                        <p>{notification.message}</p>
                        <small>{new Date(notification.createdAt).toLocaleString()}</small>
                        {/* Show the button only if read is true (which means it's unread) */}
                        {!notification.read && (
                            <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminNotifications;

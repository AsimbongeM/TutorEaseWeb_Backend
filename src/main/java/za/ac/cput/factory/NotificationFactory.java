package za.ac.cput.factory;

import za.ac.cput.domain.Notification;

public class NotificationFactory {

    // Factory method to create a notification with a message and mark it as unread by default
    public static Notification createNotification(String message) {
        return new Notification.Builder()
                .setMessage(message)
                .setIsRead(false)
                .build();
    }

    // Factory method to create a notification with a custom read status and time
    public static Notification createCustomNotification(String message, boolean isRead) {
        return new Notification.Builder()
                .setMessage(message)
                .setIsRead(isRead)
                .build();
    }
}

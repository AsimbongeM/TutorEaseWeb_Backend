package za.ac.cput.service;

import za.ac.cput.domain.Notification;

import java.util.List;

public interface INotificationService {
    Notification createNotification(String message);
    List<Notification> getAllNotifications();
    List<Notification> getUnreadNotifications();
    Notification markAsRead(Long notificationId);
}

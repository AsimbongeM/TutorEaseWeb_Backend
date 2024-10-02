package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Notification;
import za.ac.cput.repository.NotificationRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService implements INotificationService {
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification createNotification(String message) {
        Notification notification = new Notification.Builder()
                .setMessage(message)
                .setIsRead(false)
                .setCreatedAt(LocalDateTime.now())
                .build();
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findByIsReadFalse();
    }

    @Override
    public Notification markAsRead(Long notificationId) {
        // Fetch the existing notification
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();

            //create a new instance based on the existing one
            Notification updatedNotification = new Notification.Builder()
                    .copy(notification)
                    .setIsRead(true)
                    .build();

            // Save the updated instance
            return notificationRepository.save(updatedNotification);
        } else {
            throw new IllegalArgumentException("Notification with ID " + notificationId + " not found.");
        }
    }



}


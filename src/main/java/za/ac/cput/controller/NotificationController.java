package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Notification;
import za.ac.cput.service.NotificationService;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notifications")

public class NotificationController {

        private final NotificationService notificationService;

        @Autowired
        public NotificationController(NotificationService notificationService) {
            this.notificationService = notificationService;
        }

        // Create a new notification
        @PostMapping("/create")
        public ResponseEntity<Notification> createNotification(@RequestBody String message) {
            Notification notification = notificationService.createNotification(message);
            return new ResponseEntity<>(notification, HttpStatus.CREATED);
        }

        // Get all notifications
        @GetMapping("/all")
        public ResponseEntity<List<Notification>> getAllNotifications() {
            List<Notification> notifications = notificationService.getAllNotifications();
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        }

        // Get unread notifications
        @GetMapping("/unread")
        public ResponseEntity<List<Notification>> getUnreadNotifications() {
            List<Notification> unreadNotifications = notificationService.getUnreadNotifications();
            return new ResponseEntity<>(unreadNotifications, HttpStatus.OK);
        }

        // Mark a notification as read
        @PutMapping("/mark-as-read/{id}")
        public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
            Notification updatedNotification = notificationService.markAsRead(id);
            return new ResponseEntity<>(updatedNotification, HttpStatus.OK);
        }
    }



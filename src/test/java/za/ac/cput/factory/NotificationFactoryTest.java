package za.ac.cput.factory;

import za.ac.cput.domain.Notification;

public class NotificationFactoryTest {

    public static void main(String[] args) {
        // Creating a regular notification
        Notification notification1 = NotificationFactory.createNotification("New tutor application submitted.");
        System.out.println(notification1);

        // Creating a custom notification
        Notification notification3 = NotificationFactory.createCustomNotification("Reminder: Approve pending tutors.", true);
        System.out.println(notification3);
    }
}

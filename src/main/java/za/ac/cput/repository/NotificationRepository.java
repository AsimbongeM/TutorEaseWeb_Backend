package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    //query to find unread notifications
    List<Notification> findByIsReadFalse();
}

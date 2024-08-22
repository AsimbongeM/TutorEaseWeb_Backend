package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import za.ac.cput.domain.ScheduleSession;

import java.util.List;

public interface ScheduleSessionRepository extends JpaRepository<ScheduleSession, Long> {


    List<ScheduleSession> findByTutor_Email(String tutorEmail);
}

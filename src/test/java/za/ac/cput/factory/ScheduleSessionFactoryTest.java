package za.ac.cput.factory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.*;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class ScheduleSessionFactoryTest {
    private static Topics topics;
    private static Tutor tutor;

    @BeforeEach
    void setUp() {
        topics = TopicsFactory.buildTopics("Advnced",TopicLevel.BEGINNER, "Variables");
        tutor = TutorFactory.buildTutor("Asimbonge", "Mbende", "asi@gmail.com", 40, "0671234859", "12345", "Java:Advanced", 3, TutorApprovalStatus.APPROVED);
    }

    @Test
    void buildScheduleSession() {
        // Test data
        LocalDate date = LocalDate.of(2024, 7, 21);
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(12, 0);

        // Create a ScheduleSession with valid parameters
        ScheduleSession session = ScheduleSessionFactory.buildScheduleSession(date, startTime, endTime, topics, tutor);
        System.out.println(session);

        // Assert the session is not null and the fields are correctly set
        assertNotNull(session);
        assertEquals(date, session.getDate());
        assertEquals(startTime, session.getStartTime());
        assertEquals(endTime, session.getEndTime());
        assertEquals(topics, session.getTopic());
        assertEquals(tutor, session.getTutor());

        // Test with invalid parameters
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(null, startTime, endTime, topics, tutor);
        });
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(date, null, endTime, topics, tutor);
        });
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(date, startTime, null, topics, tutor);
        });
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(date, startTime, endTime, topics,null);
        });
    }
}

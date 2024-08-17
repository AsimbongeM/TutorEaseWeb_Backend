package za.ac.cput.factory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.domain.TopicLevel;
import za.ac.cput.domain.Topics;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class ScheduleSessionFactoryTest {
    private static Topics topics;

    @BeforeEach
    void setUp() {
        topics = TopicsFactory.buildTopics(TopicLevel.BEGINNER, "Variables");
    }

    @Test
    void buildScheduleSession() {
        // Test data
        LocalDate date = LocalDate.of(2024, 7, 21);
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(12, 0);

        // Create a ScheduleSession with valid parameters
        ScheduleSession session = ScheduleSessionFactory.buildScheduleSession(date, startTime, endTime, topics);
        System.out.println(session);

        // Assert the session is not null and the fields are correctly set
        assertNotNull(session);
        assertEquals(date, session.getDate());
        assertEquals(startTime, session.getStartTime());
        assertEquals(endTime, session.getEndTime());
        assertEquals(topics, session.getTopic());

        // Test with invalid parameters
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(null, startTime, endTime, topics);
        });
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(date, null, endTime, topics);
        });
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(date, startTime, null, topics);
        });
        assertThrows(IllegalArgumentException.class, () -> {
            ScheduleSessionFactory.buildScheduleSession(date, startTime, endTime, null);
        });
    }
}

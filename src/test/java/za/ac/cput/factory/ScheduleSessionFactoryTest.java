package za.ac.cput.factory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.ScheduleSession;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class ScheduleSessionFactoryTest {

    @BeforeEach
    void setUp() {
    }

    @Test
    void buildScheduleSession() {
        // Test data
        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 7, 21);
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(12, 0);
        String topic = "Design patterns";


        ScheduleSession session = ScheduleSessionFactory.buildScheduleSession(id, date, startTime, endTime, topic);


        assertNotNull(session);
        assertEquals(id, session.getId());
        assertEquals(date, session.getDate());
        assertEquals(startTime, session.getStartTime());
        assertEquals(endTime, session.getEndTime());
        assertEquals(topic, session.getTopic());


        assertNull(ScheduleSessionFactory.buildScheduleSession(null, date, startTime, endTime, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession(id, null, startTime, endTime, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession(id, date, null, endTime, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession(id, date, startTime, null, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession(id, date, startTime, endTime, ""));
    }
}

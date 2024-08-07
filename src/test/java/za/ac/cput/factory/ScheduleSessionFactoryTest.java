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
//        Long id = 1L;
        LocalDate date = LocalDate.of(2024, 7, 21);
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(12, 0);
        String topic = "Design patterns";


        ScheduleSession session = ScheduleSessionFactory.buildScheduleSession( date, startTime, endTime, topic);
        System.out.println(session);

        assertNotNull(session);
//        assertEquals(id, session.getId());
        assertEquals(date, session.getDate());
        assertEquals(startTime, session.getStartTime());
        assertEquals(endTime, session.getEndTime());
        assertEquals(topic, session.getTopic());


        assertNotNull(ScheduleSessionFactory.buildScheduleSession( date, startTime, endTime, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession( null, startTime, endTime, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession( date, null, endTime, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession( date, startTime, null, topic));
        assertNull(ScheduleSessionFactory.buildScheduleSession( date, startTime, endTime, ""));

    }
}

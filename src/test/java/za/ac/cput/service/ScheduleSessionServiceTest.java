package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.repository.ScheduleSessionRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class ScheduleSessionServiceTest {

    @Autowired
    private ScheduleSessionService scheduleSessionService;

    private static ScheduleSession session1;
    private static ScheduleSession session2;
    private static Long generatedSessionId1;
    private static Long generatedSessionId2;

    @Order(1)
    @BeforeEach
    void setUp() {
        session1 = new ScheduleSession.Builder()
                .setDate(LocalDate.of(2024, 7, 21))
                .setStartTime(LocalTime.of(10, 0))
                .setEndTime(LocalTime.of(12, 0))
                .setTopic("Design patterns")
                .build();

        session2 = new ScheduleSession.Builder()
                .setDate(LocalDate.of(2024, 7, 22))
                .setStartTime(LocalTime.of(11, 0))
                .setEndTime(LocalTime.of(13, 0))
                .setTopic("Advanced Design patterns")
                .build();

        System.out.println("Setup complete with sessions:");
        System.out.println("Session 1: " + session1);
        System.out.println("Session 2: " + session2);
    }

    @Order(2)
    @Test
    void create() {
        ScheduleSession savedSession1 = scheduleSessionService.create(session1);
        assertNotNull(savedSession1);
        generatedSessionId1 = savedSession1.getId();
        System.out.println("Created Session 1: " + savedSession1);

        ScheduleSession savedSession2 = scheduleSessionService.create(session2);
        assertNotNull(savedSession2);
        generatedSessionId2 = savedSession2.getId();
        System.out.println("Created Session 2: " + savedSession2);
    }

    @Order(3)
    @Test
    void read() {
        ScheduleSession readSession1 = scheduleSessionService.read(generatedSessionId1);
        assertNotNull(readSession1);
        System.out.println("Read Session 1: " + readSession1);

        ScheduleSession readSession2 = scheduleSessionService.read(generatedSessionId2);
        assertNotNull(readSession2);
        System.out.println("Read Session 2: " + readSession2);
    }

    @Order(4)
    @Test
    void update() {
        ScheduleSession sessionToUpdate = scheduleSessionService.read(generatedSessionId2);
        assertNotNull(sessionToUpdate);

        ScheduleSession updatedSession = new ScheduleSession.Builder()
                .copy(sessionToUpdate)
                .setTopic("Updated Design patterns")
                .build();

        ScheduleSession result = scheduleSessionService.update(updatedSession);
        assertNotNull(result);
        assertEquals("Updated Design patterns", result.getTopic());
        System.out.println("Updated Session: " + result);
    }

    @Order(5)
    @Test
    @Disabled
    void delete() {
        scheduleSessionService.delete(generatedSessionId1);
        System.out.println("Successfully deleted session with ID: " + generatedSessionId1);
    }

    @Order(6)
    @Test
    void getAll() {
        List<ScheduleSession> sessions = scheduleSessionService.getAll();
        assertFalse(sessions.isEmpty());
        System.out.println("All sessions: " + sessions);
    }
}
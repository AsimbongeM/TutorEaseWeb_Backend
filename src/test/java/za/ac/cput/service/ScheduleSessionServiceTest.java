package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.*;
import za.ac.cput.factory.TopicsFactory;
import za.ac.cput.repository.ScheduleSessionRepository;
import za.ac.cput.repository.TopicsRepository;
import za.ac.cput.repository.TutorRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class ScheduleSessionServiceTest {

    @Autowired
    private ScheduleSessionService scheduleSessionService;

    @Autowired
    private ScheduleSessionRepository scheduleSessionRepository;

    @Autowired
    private TopicsRepository topicsRepository;

    @Autowired
    private TutorRepository tutorRepository;

    private static ScheduleSession session1;
    private static ScheduleSession session2;
    private static Long generatedSessionId1;
    private static Long generatedSessionId2;

    private static Topics topic1;

    private static Tutor tutor1;
    private static Tutor tutor2;

    @Order(1)
    @BeforeEach
    void setUp() {
        // Clear repositories before each test
        scheduleSessionRepository.deleteAll();
        topicsRepository.deleteAll();

        topic1 = topicsRepository.save(TopicsFactory.buildTopics("Begginner",TopicLevel.BEGINNER, "Design patterns"));
        Topics topic2 = topicsRepository.save(TopicsFactory.buildTopics("Advanced",TopicLevel.INTERMEDIATE, "Advanced Design patterns"));


        tutor1 = tutorRepository.save(new Tutor.Builder()
                .setFirstName("John")
                .setLastName("Doe")
                .setEmail("john.doe@example.com")
                .setAge(35)
                .setCellNumber("1234567890")
                .setPassword("password")
                .setSkills("Java, Spring")
                .setExperience(10)
                .setApprovalStatus(TutorApprovalStatus.APPROVED)
                .build());

        tutor2 = tutorRepository.save(new Tutor.Builder()
                .setFirstName("Jane")
                .setLastName("Doe")
                .setEmail("jane.doe@example.com")
                .setAge(30)
                .setCellNumber("0987654321")
                .setPassword("password")
                .setSkills("Python, Django")
                .setExperience(8)
                .setApprovalStatus(TutorApprovalStatus.PENDING)
                .build());

        session1 = new ScheduleSession.Builder()
                .setDate(LocalDate.of(2024, 7, 21))
                .setStartTime(LocalTime.of(10, 0))
                .setEndTime(LocalTime.of(12, 0))
                .setTopic(topic1)
                .setTutor(tutor1)
                .build();

        session2 = new ScheduleSession.Builder()
                .setDate(LocalDate.of(2024, 7, 22))
                .setStartTime(LocalTime.of(11, 0))
                .setEndTime(LocalTime.of(13, 0))
                .setTopic(topic2)
                .setTutor(tutor2)
                .build();

        session1 = scheduleSessionRepository.save(session1);
        session2 = scheduleSessionRepository.save(session2);

        generatedSessionId1 = session1.getId();
        generatedSessionId2 = session2.getId();

        System.out.println("Setup complete with sessions:");
        System.out.println("Session 1: " + session1);
        System.out.println("Session 2: " + session2);
    }

    @Order(2)
    @Test
    void create() {
        assertNotNull(session1);
        assertNotNull(session2);
        System.out.println("Session 1: " + session1);
        System.out.println("Session 2: " + session2);
    }

    @Order(3)
    @Test
    void read() {
        ScheduleSession readSession1 = scheduleSessionService.read(generatedSessionId1);
        assertNotNull(readSession1);
        assertEquals(tutor1, readSession1.getTutor());
        System.out.println("Read Session 1: " + readSession1);

        ScheduleSession readSession2 = scheduleSessionService.read(generatedSessionId2);
        assertNotNull(readSession2);
        assertEquals(tutor2, readSession2.getTutor());
        System.out.println("Read Session 2: " + readSession2);
    }

    @Order(4)
    @Test
    void update() {
        ScheduleSession sessionToUpdate = scheduleSessionService.read(generatedSessionId2);
        assertNotNull(sessionToUpdate);

        ScheduleSession updatedSession = new ScheduleSession.Builder()
                .copy(sessionToUpdate)
                .setTopic(topic1) // Updated to use a topic
                .setTutor(tutor1)
                .build();

        ScheduleSession result = scheduleSessionService.update(generatedSessionId2, updatedSession);
        assertNotNull(result);
        assertEquals(topic1, result.getTopic());
        assertEquals(tutor1, result.getTutor());
        System.out.println("Updated Session: " + result);
    }

    @Order(5)
    @Test
    @Disabled
    void delete() {
        scheduleSessionService.delete(generatedSessionId1);
        assertFalse(scheduleSessionRepository.findById(generatedSessionId1).isPresent());
        System.out.println("Successfully deleted session with ID: " + generatedSessionId1);
    }

//    @Order(6)
//    @Test
//    void getAll() {
//        List<ScheduleSession> sessions = scheduleSessionService.getAll();
//        assertFalse(sessions.isEmpty());
//        System.out.println("All sessions: " + sessions);
//    }
}

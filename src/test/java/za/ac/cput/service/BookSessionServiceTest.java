package za.ac.cput.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.*;
import za.ac.cput.factory.StudentFactory;
import za.ac.cput.factory.TopicsFactory;
import za.ac.cput.repository.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class BookSessionServiceTest {

    @Autowired
    private BookSessionService bookSessionService;
    @Autowired
    private BookSessionRepository bookSessionRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TopicsRepository topicsRepository;

    private static Long generatedSessionId;
    private static Topics topic1;
    private static Student student;
    private static Tutor tutor;
    private static BookSession bookSession;

    @BeforeEach
    void setUp() {
        tutorRepository.deleteAll();
        studentRepository.deleteAll();
        bookSessionRepository.deleteAll();
        Student existingStudent = studentRepository.findByEmailAndPassword("thando@gmail.com","passwrod");
        if (!(existingStudent ==null)) {
            studentRepository.save(student);

        } else {
            // Handle existing student (e.g., throw an exception or update the student)
            System.out.println(" User exists: " );
        }

        // Create Student
        student = StudentFactory.buildStudent("Thando", "Khoza", 18,
                "drako@gmail.com", "0767475524", "thando7865", "BEGINNER");
        assert student != null;
        studentRepository.save(student);

        // Create Topics
        topic1 = topicsRepository.save(TopicsFactory.buildTopics("BEGINNER", TopicLevel.INTERMEDIATE,"Devon james edition 9"));
        Topics topic2 = topicsRepository.save(TopicsFactory.buildTopics("INTERMEDIATE", TopicLevel.INTERMEDIATE,"Advanced Design patterns"));

        // Check if a Tutor with the same email already exists
        tutor = tutorRepository.findByEmailAndPassword("john.pex@example.com","password");
        if (tutor == null) {
            // Create a new Tutor if it doesn't exist
            tutor = tutorRepository.save(new Tutor.Builder()
                    .setFirstName("John")
                    .setLastName("Doe")
                    .setEmail("john.pex@example.com")
                    .setAge(35)
                    .setCellNumber("1234567890")
                    .setPassword("password")
                    .setSkills("Java, Spring")
                    .setExperience(10)
                    .setApprovalStatus(TutorApprovalStatus.APPROVED)
                    .build());
        }

        // Create BookSession
        bookSession = bookSessionRepository.save(new BookSession.Builder()
                .setStudent(student)
                .setTutor(tutor)
                .build());

        generatedSessionId = bookSession.getBookSessionID();
    }

    @Test
    @Order(1)
    void create() {
        assertNotNull(bookSession);
        System.out.println("BookSession created; " + bookSession);
    }

    @Test
    @Order(2)
    void read() {
        BookSession readSession = bookSessionService.read(generatedSessionId);
        assertNotNull(readSession);
        System.out.println("BookSession read; " + readSession);
    }

    @Test
    @Order(3)
    void update() {
        BookSession sessionToUpdate = bookSessionService.read(generatedSessionId);
        assertNotNull(sessionToUpdate);

        Tutor updatedTutor = tutorRepository.save(new Tutor.Builder()
                .copy(tutor)
                .setFirstName("Updated John")
                .build());

        BookSession updatedSession = new BookSession.Builder()
                .copy(sessionToUpdate)
                .setTutor(updatedTutor)
                .build();

        BookSession savedSession = bookSessionService.update(updatedSession);
        assertNotNull(savedSession);
        assertEquals("Updated John", savedSession.getTutor().getFirstName());
        System.out.println("BookSession updated; " + savedSession);
    }

    @Test
    @Order(4)
    void delete() {
        BookSession sessionToDelete = bookSessionService.read(generatedSessionId);
        assertNotNull(sessionToDelete);

        bookSessionService.delete(sessionToDelete.getBookSessionID());
        BookSession deletedSession = bookSessionService.read(generatedSessionId);
        assertNull(deletedSession);
        System.out.println("BookSession deleted; ID: " + generatedSessionId);
    }

    @Test
    @Order(5)
    void getAll() {
        List<BookSession> bookSessions = bookSessionService.getAll();
        assertFalse(bookSessions.isEmpty());
        System.out.println("All BookSessions: " + bookSessions);
    }
}

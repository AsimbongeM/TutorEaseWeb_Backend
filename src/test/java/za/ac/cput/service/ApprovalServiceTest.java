package za.ac.cput.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import za.ac.cput.domain.ApplicationStatus;
import za.ac.cput.domain.TutorApplication;
import za.ac.cput.repository.TutorApplicationRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

public class ApprovalServiceTest {

    @Autowired
    private ApprovalService approvalService;

    @Autowired
    private TutorApplicationRepository tutorApplicationRepository;

    private TutorApplication tutorApplication;

    @BeforeEach
    void setUp() {
        tutorApplicationRepository.deleteAll();
        tutorApplication = new TutorApplication.Builder()
                .setTutorId(1L)
                .setStatus(ApplicationStatus.PENDING)
                .build();
        tutorApplication = tutorApplicationRepository.save(tutorApplication);
    }

    @Test
    @Order(1)
    void testApproveApplication() {
        TutorApplication approvedApplication = approvalService.approveApplication(tutorApplication.getId());

        assertNotNull(approvedApplication);
        assertEquals(tutorApplication.getId(), approvedApplication.getId());
        assertEquals(ApplicationStatus.APPROVED, approvedApplication.getStatus());
    }

    @Test
    @Order(2)
    void testRejectApplication() {
        TutorApplication rejectedApplication = approvalService.rejectApplication(tutorApplication.getId());

        assertNotNull(rejectedApplication);
        assertEquals(tutorApplication.getId(), rejectedApplication.getId());
        assertEquals(ApplicationStatus.REJECTED, rejectedApplication.getStatus());
    }

    @Test
    @Order(3)
    void testApproveNonExistentApplication() {
        TutorApplication approvedApplication = approvalService.approveApplication(999L);

        assertNull(approvedApplication);
    }

    @Test
    @Order(4)
    void testRejectNonExistentApplication() {
        TutorApplication rejectedApplication = approvalService.rejectApplication(999L);

        assertNull(rejectedApplication);
    }
}

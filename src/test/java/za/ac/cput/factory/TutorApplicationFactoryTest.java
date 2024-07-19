package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.ApplicationStatus;
import za.ac.cput.domain.TutorApplication;

import static org.junit.jupiter.api.Assertions.*;

public class TutorApplicationFactoryTest {
    @Test
    public void buildTutorApplication() {
        TutorApplication tutorApplication = TutorApplicationFactory.buildTutorApplication(1L, ApplicationStatus.PENDING);
        assertNotNull(tutorApplication);
        assertEquals(1L, tutorApplication.getTutorId());
        assertEquals(ApplicationStatus.PENDING, tutorApplication.getStatus());
    }
}

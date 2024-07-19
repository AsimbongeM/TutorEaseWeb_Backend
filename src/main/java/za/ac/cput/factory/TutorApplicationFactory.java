package za.ac.cput.factory;

import za.ac.cput.domain.ApplicationStatus;
import za.ac.cput.domain.TutorApplication;

public class TutorApplicationFactory {
    public static TutorApplication buildTutorApplication(Long tutorId, ApplicationStatus status) {
        return new TutorApplication.Builder()
                .setTutorId(tutorId)
                .setStatus(status)
                .build();
    }
}

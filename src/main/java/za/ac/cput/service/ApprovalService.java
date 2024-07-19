package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.TutorApplication;
import za.ac.cput.domain.ApplicationStatus;
import za.ac.cput.repository.TutorApplicationRepository;

import java.util.Optional;

@Service
public class ApprovalService {

    private final TutorApplicationRepository tutorApplicationRepository;

    @Autowired
    public ApprovalService(TutorApplicationRepository tutorApplicationRepository) {
        this.tutorApplicationRepository = tutorApplicationRepository;
    }

    public TutorApplication approveApplication(Long applicationId) {
        Optional<TutorApplication> optionalTutorApplication = tutorApplicationRepository.findById(applicationId);
        if (optionalTutorApplication.isPresent()) {
            TutorApplication tutorApplication = optionalTutorApplication.get();
            tutorApplication = new TutorApplication.Builder()
                    .setId(tutorApplication.getId())
                    .setTutorId(tutorApplication.getTutorId())
                    .setStatus(ApplicationStatus.APPROVED)
                    .build();
            return tutorApplicationRepository.save(tutorApplication);
        } else {
            // Handle the case where the application is not found
            return null;
        }
    }

    public TutorApplication rejectApplication(Long applicationId) {
        Optional<TutorApplication> optionalTutorApplication = tutorApplicationRepository.findById(applicationId);
        if (optionalTutorApplication.isPresent()) {
            TutorApplication tutorApplication = optionalTutorApplication.get();
            tutorApplication = new TutorApplication.Builder()
                    .setId(tutorApplication.getId())
                    .setTutorId(tutorApplication.getTutorId())
                    .setStatus(ApplicationStatus.REJECTED)
                    .build();
            return tutorApplicationRepository.save(tutorApplication);
        } else {
            // Handle the case where the application is not found
            return null;
        }
    }
}

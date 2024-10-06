package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Tutor;
import za.ac.cput.domain.TutorApprovalStatus;
import za.ac.cput.repository.TutorRepository;

import java.util.List;

@Service
public class TutorService implements ITutorService {
    private final TutorRepository tutorRepository;
    private final NotificationService notificationService;

    @Autowired
    TutorService(TutorRepository tutorRepository, NotificationService notificationService) {
        this.tutorRepository = tutorRepository;
        this.notificationService = notificationService;
    }

    @Override
    public Tutor create(Tutor tutor) {

        Tutor savedTutor = tutorRepository.save(tutor);
        // Create a notification message
        String notificationMessage = String.format("Attention %s %s has registered and needs approval.",
                savedTutor.getFirstName(),
                savedTutor.getLastName());
        // Create a new Notification
        notificationService.createNotification(notificationMessage); // Call the method to create a notification

        // Return the saved tutor
        return savedTutor;
    }

    @Override
    public Tutor read(String email) {
        return this.tutorRepository.findById(email).orElse(null);
    }

    @Override
    public Tutor update(String email,Tutor tutor) {
        Tutor existingTutor= read(email);

        if (existingTutor!=null) {
            Tutor updatedTutor=new Tutor.Builder()
                    .copy(existingTutor)
                    .setFirstName(tutor.getFirstName())
                    .setLastName(tutor.getLastName())
                    .setPassword(tutor.getPassword())
                    .setAge(tutor.getAge())
                    .setCellNumber(tutor.getCellNumber())
                    .setSkills(tutor.getSkills())
                    .setExperience(tutor.getExperience())
                    .setApprovalStatus(tutor.getApprovalStatus())
                    .build();
            return tutorRepository.save(updatedTutor);
        }
        return null;
    }

    @Override
    public void delete(String tutorEmail) {
        tutorRepository.deleteById(tutorEmail);
    }
    // Method to get all approved tutors
    public List<Tutor> getApprovedTutors() {
        return tutorRepository.findByApprovalStatus(TutorApprovalStatus.APPROVED);
    }
    @Override
    public List<Tutor> getAll() {
        return tutorRepository.findAll();
    }
    public Tutor authenticate(String email, String password) {
        return tutorRepository.findByEmailAndPassword(email, password);
    }

}

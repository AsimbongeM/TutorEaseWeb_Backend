package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Tutor;
import za.ac.cput.domain.TutorApprovalStatus;
import za.ac.cput.repository.StudentRepository;
import za.ac.cput.repository.TutorRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TutorService implements ITutorService {
    private final TutorRepository tutorRepository;
    private final StudentRepository studentRepository;
    private final NotificationService notificationService;

    @Autowired
    TutorService(TutorRepository tutorRepository,StudentRepository studentRepository, NotificationService notificationService) {
        this.tutorRepository = tutorRepository;
        this.studentRepository = studentRepository;
        this.notificationService = notificationService;
    }

    public Optional<Tutor> getTutorByEmail(String tutorEmail) {
        return tutorRepository.findById(tutorEmail);
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


    public Tutor createTutor(String firstName, String lastName, String email, String password, int age, String cellNumber, MultipartFile profilePicture, String skills, int experience, TutorApprovalStatus approvalStatus) throws IOException {
        Tutor tutor = new Tutor.Builder()
                .setFirstName(firstName)
                .setLastName(lastName)
                .setAge(age)
                .setEmail(email)
                .setCellNumber(cellNumber)
                .setPassword(password)
                .setProfilePicture(profilePicture != null ? profilePicture.getBytes() : null)
                .setSkills(skills)
                .setExperience(experience)
                .setApprovalStatus(approvalStatus)
                .build();

        Tutor savedTutor = tutorRepository.save(tutor);

        // Create a notification message
        String notificationMessage = String.format("Attention %s %s has registered and needs approval.", savedTutor.getFirstName(), savedTutor.getLastName());
        notificationService.createNotification(notificationMessage);

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

    public Tutor updateTutor(String email, String firstName, String lastName, String password, int age, String cellNumber, MultipartFile profilePicture, String skills, int experience, TutorApprovalStatus approvalStatus) throws IOException {
        Tutor existingTutor = read(email);

        if (existingTutor != null) {
            Tutor updatedTutor = new Tutor.Builder()
                    .copy(existingTutor)
                    .setFirstName(firstName)
                    .setLastName(lastName)
                    .setAge(age)
                    .setEmail(email)
                    .setCellNumber(cellNumber)
                    .setPassword(password)
                    .setProfilePicture(profilePicture != null ? profilePicture.getBytes() : existingTutor.getProfilePicture())
                    .setSkills(skills)
                    .setExperience(experience)
                    .setApprovalStatus(approvalStatus)
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
//    public List<Tutor> getTutorsForStudent(String studentEmail) {
//        Student student = studentRepository.findById(studentEmail)
//                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
//        return tutorRepository.findTutorsBySkillLevel(student.getSkillLevel());
//    }
public Optional<byte[]> getTutorImageByEmail(String tutorEmail) {
    return getTutorByEmail(tutorEmail).map(Tutor::getProfilePicture);
}
}

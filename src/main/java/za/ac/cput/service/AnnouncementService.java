package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Announcement;
import za.ac.cput.domain.Tutor;
import za.ac.cput.repository.AnnouncementRepository;
import za.ac.cput.repository.TutorRepository;

import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private TutorRepository tutorRepository;

    public void createAnnouncement(String announcementText, String tutorEmail) throws Exception {
        Tutor tutor = tutorRepository.findById(tutorEmail)
                .orElseThrow(() -> new Exception("Tutor not found"));

        Announcement announcement = new Announcement.Builder()
                .setText(announcementText)
                .setTutor(tutor)
                .build();

        announcementRepository.save(announcement);
    }

    public List<Announcement> findByTutorEmail(String tutorEmail) {
        return announcementRepository.findByTutorEmail(tutorEmail);
    }

    public void updateAnnouncement(Long id, String announcementText) throws Exception {
        Announcement existingAnnouncement = announcementRepository.findById(id)
                .orElseThrow(() -> new Exception("Announcement not found"));

        Announcement updatedAnnouncement = new Announcement.Builder()
                .copy(existingAnnouncement)
                .setText(announcementText)
                .build();

        announcementRepository.save(updatedAnnouncement);
    }

    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }
}

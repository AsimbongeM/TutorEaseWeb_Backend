package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Announcement;
import za.ac.cput.service.AnnouncementService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/announcements")
public class AnnouncementsController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementsController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createAnnouncement(@RequestBody Announcement request) {
        try {
            announcementService.createAnnouncement(request.getText(), request.getTutor().getEmail());
            return ResponseEntity.ok("Announcement created successfully");
        } catch (Exception e) {
            if (e.getMessage().equals("Tutor not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tutor not found");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating announcement: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<Announcement>> getAnnouncements(@RequestParam String tutorEmail) {
        try {
            List<Announcement> announcements = announcementService.findByTutorEmail(tutorEmail);
            return ResponseEntity.ok(announcements);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAnnouncement(@PathVariable Long id,
                                                     @RequestBody Announcement request) {
        try {
            announcementService.updateAnnouncement(id, request.getText());
            return ResponseEntity.ok("Announcement updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating announcement: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAnnouncement(@PathVariable Long id) {
        try {
            announcementService.deleteAnnouncement(id);
            return ResponseEntity.ok("Announcement deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting announcement: " + e.getMessage());
        }
    }
}

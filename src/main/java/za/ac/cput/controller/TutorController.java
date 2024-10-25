package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import za.ac.cput.domain.Tutor;
import za.ac.cput.domain.TutorApprovalStatus;
import za.ac.cput.service.TutorService;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tutor")
public class TutorController {
    @Autowired
    private TutorService tutorService;

//    @PostMapping("/create")
//    public Tutor create(@RequestBody Tutor tutor) {
//        return tutorService.create(tutor);
//    }

    @PostMapping("/createTutor")
    public ResponseEntity<Tutor> createTutor(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("age") int age,
            @RequestParam("cellNumber") String cellNumber,
            @RequestParam("profilePicture") MultipartFile profilePicture,
            @RequestParam("skills") String skills,
            @RequestParam("experience") int experience,
            @RequestParam("approvalStatus") TutorApprovalStatus approvalStatus) throws IOException {

        Tutor tutor = tutorService.createTutor(firstName, lastName, email, password, age, cellNumber, profilePicture, skills, experience, approvalStatus
        );

        if (tutor == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(tutor);
    }


    @PutMapping("/updateTutor")
    public ResponseEntity<Tutor> updateTutor(
            @RequestParam("email") String email,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("password") String password,
            @RequestParam("age") int age,
            @RequestParam("cellNumber") String cellNumber,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
            @RequestParam("skills") String skills,
            @RequestParam("experience") int experience,
            @RequestParam("approvalStatus") TutorApprovalStatus approvalStatus) throws IOException {

        Tutor tutor = tutorService.updateTutor(email, firstName, lastName, password, age, cellNumber, profilePicture, skills, experience, approvalStatus
        );

        if (tutor == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(tutor);
    }

    @GetMapping("/read/{email}")
    public Tutor read(@PathVariable String email) {
        return tutorService.read(email);
    }

//    @PutMapping("/update/{email}")
//    public Tutor update(@PathVariable String email, @RequestBody Tutor tutor) {
//        return tutorService.update(email, tutor);
//
//    }

    @DeleteMapping("/delete/{email}")
    public void delete(@PathVariable String email) {
        tutorService.delete(email);
    }

    @GetMapping("/getAll")
    public List<Tutor> getAll() {
        return tutorService.getAll();
    }

    @GetMapping("/approved-tutors")
    public ResponseEntity<List<Tutor>> getApprovedTutors() {
        List<Tutor> approvedTutors = tutorService.getApprovedTutors();
        return ResponseEntity.ok(approvedTutors);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Tutor tutor) {
        Tutor authenticatedTutor = tutorService.authenticate(tutor.getEmail(), tutor.getPassword());
        if (authenticatedTutor != null) {
            return ResponseEntity.ok(authenticatedTutor);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @GetMapping("/profilePicture/{email}")
    public ResponseEntity<byte[]> getTutorImage(@PathVariable String email) {
        return tutorService.getTutorImageByEmail(email)
                .map(imageBytes -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                        .body(imageBytes))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

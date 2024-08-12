package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Tutor;
import za.ac.cput.service.TutorService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tutor")
public class TutorController {
    @Autowired
    private TutorService tutorService;

    @PostMapping("/create")
    public Tutor create(@RequestBody Tutor tutor) {
        return tutorService.create(tutor);
    }

    @GetMapping("/read/{email}")
    public Tutor read(@PathVariable String email) {
        return tutorService.read(email);
    }

    @PutMapping("/update/{email}")
    public Tutor update(@PathVariable String email, @RequestBody Tutor tutor) {
        return tutorService.update(email, tutor);
        
    }

    @DeleteMapping("/delete/{email}")
    public void delete(@PathVariable String email) {
        tutorService.delete(email);
    }

    @GetMapping("/getAll")
    public List<Tutor> getAll() {
        return tutorService.getAll();
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
}

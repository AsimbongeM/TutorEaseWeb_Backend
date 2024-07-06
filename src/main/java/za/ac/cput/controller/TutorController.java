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

    @GetMapping("/read/{id}")
    public Tutor read(@PathVariable Long id) {
        return tutorService.read(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Tutor> update(@PathVariable Long id, @RequestBody Tutor tutor) {
        Tutor existingTutor = tutorService.read(id);
        if (existingTutor == null) {
            return ResponseEntity.notFound().build();
        }
        Tutor updatedTutor = new Tutor.Builder().copy(existingTutor)
                .setFirstName(tutor.getFirstName())
                .setLastName(tutor.getLastName())
                .setAge(tutor.getAge())
                .setEmail(tutor.getEmail())
                .setCellNumber(tutor.getCellNumber())
                .setSkills(tutor.getSkills())
                .setExperience(tutor.getExperience())
                .setIdDocument(tutor.getIdDocument())
                .setSarsDocument(tutor.getSarsDocument())
                .setApproved(tutor.isApproved())
                .build();
        updatedTutor = tutorService.update(updatedTutor);
        return ResponseEntity.ok(updatedTutor);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        tutorService.delete(id);
    }

    @GetMapping("/getAll")
    public List<Tutor> getAll() {
        return tutorService.getAll();
    }
}

package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.domain.Tutor;
import za.ac.cput.service.ScheduleSessionService;
import za.ac.cput.service.TutorService;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/scheduleSession")
public class ScheduleSessionController {
    private final ScheduleSessionService scheduleSessionService;
    private final TutorService tutorService;
    @Autowired
    public ScheduleSessionController(ScheduleSessionService scheduleSessionService, TutorService tutorService) {
        this.scheduleSessionService = scheduleSessionService;
        this.tutorService = tutorService;
    }

    @PostMapping("/create")
    public ResponseEntity<ScheduleSession> create(@RequestBody ScheduleSession scheduleSession) {
        if (scheduleSession.getTutor() != null) {
            Optional<Tutor> tutorOpt = Optional.ofNullable(tutorService.read(scheduleSession.getTutor().getEmail()));
            if (tutorOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        System.out.println("Creating session with data: " + scheduleSession); // Debug log
        ScheduleSession createdSession = scheduleSessionService.create(scheduleSession);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSession);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<ScheduleSession> read(@PathVariable Long id) {
        ScheduleSession session = scheduleSessionService.read(id);
        if (session != null) {
            return ResponseEntity.ok(session);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ScheduleSession> update(@PathVariable Long id, @RequestBody ScheduleSession scheduleSession) {
        if (scheduleSession.getTutor() != null) {
            Optional<Tutor> tutorOpt = Optional.ofNullable(tutorService.read(scheduleSession.getTutor().getEmail()));
            if (tutorOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        ScheduleSession updatedSession = scheduleSessionService.update(id, scheduleSession);
        if (updatedSession != null) {
            return ResponseEntity.ok(updatedSession);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (scheduleSessionService.read(id) != null) {
            scheduleSessionService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
//
//    @GetMapping("/getAll")
//    public ResponseEntity<List<ScheduleSession>> getAll() {
//        List<ScheduleSession> sessions = scheduleSessionService.getAll();
//        if (!sessions.isEmpty()) {
//            return ResponseEntity.ok(sessions);
//        } else {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//        }
//    }
@GetMapping("/getAll")
public ResponseEntity<List<ScheduleSession>> getAll(@RequestParam("tutorEmail") String tutorEmail) {
    List<ScheduleSession> sessions = scheduleSessionService.getSessionsByTutorEmail(tutorEmail);
    if (!sessions.isEmpty()) {
        return ResponseEntity.ok(sessions);
    } else {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
}

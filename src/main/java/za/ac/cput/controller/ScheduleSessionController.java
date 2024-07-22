package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.service.ScheduleSessionService;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/scheduleSession")
public class ScheduleSessionController {

    @Autowired
    private ScheduleSessionService scheduleSessionService;

    @PostMapping("/create")
    public ScheduleSession create(@RequestBody ScheduleSession scheduleSession) {
        return scheduleSessionService.create(scheduleSession);
    }

    @GetMapping("/read/{id}")
    public ScheduleSession read(@PathVariable Long id) {
        return scheduleSessionService.read(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ScheduleSession> update(@PathVariable Long id, @RequestBody ScheduleSession scheduleSession) {
        ScheduleSession existingScheduleSession = scheduleSessionService.read(id);
        if (existingScheduleSession == null) {
            return ResponseEntity.notFound().build();
        }
        ScheduleSession updatedScheduleSession = new ScheduleSession.Builder().copy(existingScheduleSession)
                .setDate(scheduleSession.getDate())
                .setStartTime(scheduleSession.getStartTime())
                .setEndTime(scheduleSession.getEndTime())
                .setTopic(scheduleSession.getTopic())
                .build();
        updatedScheduleSession = scheduleSessionService.update(updatedScheduleSession);
        return ResponseEntity.ok(updatedScheduleSession);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        scheduleSessionService.delete(id);
    }

    @GetMapping("/getAll")
    public List<ScheduleSession> getAll() {
        return scheduleSessionService.getAll();
    }
}

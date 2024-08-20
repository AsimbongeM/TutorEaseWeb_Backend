package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.service.ScheduleSessionService;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/scheduleSession")
public class ScheduleSessionController {
    private final ScheduleSessionService scheduleSessionService;
    @Autowired
    public ScheduleSessionController(ScheduleSessionService scheduleSessionService) {
        this.scheduleSessionService = scheduleSessionService;
    }

    @PostMapping("/create")
    public ScheduleSession create(@RequestBody ScheduleSession scheduleSession) {
        System.out.println("Creating session with data: " + scheduleSession); // Debug log
        return scheduleSessionService.create(scheduleSession);
    }

    @GetMapping("/read/{id}")
    public ScheduleSession read(@PathVariable Long id) {
        return scheduleSessionService.read(id);
    }

    @PutMapping("/update/{id}")
    public ScheduleSession update(@PathVariable Long id, @RequestBody ScheduleSession scheduleSession) {
        return scheduleSessionService.update(id, scheduleSession);
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

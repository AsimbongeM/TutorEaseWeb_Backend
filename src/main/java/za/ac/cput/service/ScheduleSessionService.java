package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.repository.ScheduleSessionRepository;

import java.util.List;

@Service
public class ScheduleSessionService implements IScheduleSessionService {

    private final ScheduleSessionRepository scheduleSessionRepository;

    @Autowired
    public ScheduleSessionService(ScheduleSessionRepository scheduleSessionRepository) {
        this.scheduleSessionRepository = scheduleSessionRepository;
    }

    @Override
    public List<ScheduleSession> getAll() {
        return scheduleSessionRepository.findAll();
    }

    @Override
    public ScheduleSession create(ScheduleSession scheduleSession) {
        return scheduleSessionRepository.save(scheduleSession);
    }

    @Override
    public ScheduleSession read(Long id) {
        return this.scheduleSessionRepository.findById(id).orElse(null);
    }

    @Override
    public ScheduleSession update(Long id, ScheduleSession scheduleSession) {
        if (scheduleSessionRepository.existsById(scheduleSession.getId())) {
            return scheduleSessionRepository.save(scheduleSession);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if (scheduleSessionRepository.existsById(id)) {
            scheduleSessionRepository.deleteById(id);
        }
    }
}

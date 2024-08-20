package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.domain.Topics;
import za.ac.cput.repository.ScheduleSessionRepository;
import za.ac.cput.repository.TopicsRepository;

import java.util.List;

@Service
public class ScheduleSessionService implements IScheduleSessionService {

    private final ScheduleSessionRepository scheduleSessionRepository;
    private final TopicsRepository topicsRepository;

    @Autowired
    public ScheduleSessionService(ScheduleSessionRepository scheduleSessionRepository, TopicsRepository topicsRepository) {
        this.scheduleSessionRepository = scheduleSessionRepository;
        this.topicsRepository = topicsRepository;
    }

    @Override
    public List<ScheduleSession> getAll() {
        return scheduleSessionRepository.findAll();
    }

    @Override
    public ScheduleSession create(ScheduleSession scheduleSession) {
        if (scheduleSession.getTopic() == null) {
            throw new IllegalArgumentException("Topic must not be null");
        }

        Topics topic = topicsRepository.findById(scheduleSession.getTopic().getId())
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + scheduleSession.getTopic().getId()));

        ScheduleSession session = new ScheduleSession.Builder()
                .setDate(scheduleSession.getDate())
                .setStartTime(scheduleSession.getStartTime())
                .setEndTime(scheduleSession.getEndTime())
                .setTopic(topic)
                .build();


        return scheduleSessionRepository.save(session);
    }

    @Override
    public ScheduleSession read(Long id) {
        return this.scheduleSessionRepository.findById(id).orElse(null);
    }

    @Override
    public ScheduleSession update(Long id, ScheduleSession scheduleSession) {
        if (!scheduleSessionRepository.existsById(id)) {
            return null;
        }

        if (scheduleSession.getTopic() == null) {
            throw new IllegalArgumentException("Topic must not be null");
        }

        Topics topic = topicsRepository.findById(scheduleSession.getTopic().getId())
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + scheduleSession.getTopic().getId()));

        ScheduleSession updatedSession = new ScheduleSession.Builder()
                .setId(id)
                .setDate(scheduleSession.getDate())
                .setStartTime(scheduleSession.getStartTime())
                .setEndTime(scheduleSession.getEndTime())
                .setTopic(topic)
                .build();

        return scheduleSessionRepository.save(updatedSession);
    }

    @Override
    public void delete(Long id) {
        if (scheduleSessionRepository.existsById(id)) {
            scheduleSessionRepository.deleteById(id);
        }
    }
}

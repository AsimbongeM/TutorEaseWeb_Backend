package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.domain.Topics;
import za.ac.cput.domain.Tutor;
import za.ac.cput.repository.ScheduleSessionRepository;
import za.ac.cput.repository.TopicsRepository;
import za.ac.cput.repository.TutorRepository;

import java.util.List;

@Service
public class ScheduleSessionService implements IScheduleSessionService {

    private final ScheduleSessionRepository scheduleSessionRepository;
    private final TopicsRepository topicsRepository;
    private final TutorRepository tutorRepository;

    @Autowired
    public ScheduleSessionService(ScheduleSessionRepository scheduleSessionRepository, TopicsRepository topicsRepository, TutorRepository tutorRepository) {
        this.scheduleSessionRepository = scheduleSessionRepository;
        this.topicsRepository = topicsRepository;
        this.tutorRepository = tutorRepository;

    }

    @Override
    public List<ScheduleSession> getAll() {
        return scheduleSessionRepository.findAll();
    }

    @Override
    public List<ScheduleSession> getSessionsByTutorEmail(String tutorEmail) {
        return scheduleSessionRepository.findByTutor_Email(tutorEmail);
    }
    @Override
    public ScheduleSession create(ScheduleSession scheduleSession) {
        if (scheduleSession.getTopic() == null || scheduleSession.getTutor() == null) {
            throw new IllegalArgumentException("Topic and Tutor must not be null");
        }

        Topics topic = topicsRepository.findById(scheduleSession.getTopic().getId())
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + scheduleSession.getTopic().getId()));
        Tutor tutor = tutorRepository.findById(scheduleSession.getTutor().getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Tutor not found with email: " + scheduleSession.getTutor().getEmail()));
        ScheduleSession session = new ScheduleSession.Builder()
                .setDate(scheduleSession.getDate())
                .setStartTime(scheduleSession.getStartTime())
                .setEndTime(scheduleSession.getEndTime())
                .setTopic(topic)
                .setTutor(tutor)
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

        if (scheduleSession.getTopic() == null || scheduleSession.getTutor() == null) {
            throw new IllegalArgumentException("Topic and Tutor must not be null");
        }

        Topics topic = topicsRepository.findById(scheduleSession.getTopic().getId())
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + scheduleSession.getTopic().getId()));
        Tutor tutor = tutorRepository.findById(scheduleSession.getTutor().getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Tutor not found with email: " + scheduleSession.getTutor().getEmail()));
        ScheduleSession updatedSession = new ScheduleSession.Builder()
                .setId(id)
                .setDate(scheduleSession.getDate())
                .setStartTime(scheduleSession.getStartTime())
                .setEndTime(scheduleSession.getEndTime())
                .setTopic(topic)
                .setTutor(tutor)
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

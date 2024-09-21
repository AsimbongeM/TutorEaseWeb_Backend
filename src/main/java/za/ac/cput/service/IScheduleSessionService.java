package za.ac.cput.service;

import za.ac.cput.domain.ScheduleSession;

import java.util.List;

public interface IScheduleSessionService extends IService<ScheduleSession, Long> {

//    List<ScheduleSession> getAll();
    List<ScheduleSession> getSessionsByTutorEmail(String tutorEmail);

    ScheduleSession update(Long id,ScheduleSession scheduleSession);
}

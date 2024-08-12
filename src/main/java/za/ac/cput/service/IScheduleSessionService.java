package za.ac.cput.service;

import za.ac.cput.domain.ScheduleSession;

import java.util.List;

public interface IScheduleSessionService extends IService<ScheduleSession, Long> {

    List<ScheduleSession> getAll();

    ScheduleSession update(ScheduleSession scheduleSession);
}

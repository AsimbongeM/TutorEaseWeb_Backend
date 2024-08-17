package za.ac.cput.factory;

import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.domain.Topics;
import za.ac.cput.util.Helper;

import java.time.LocalDate;
import java.time.LocalTime;

public class ScheduleSessionFactory {

    public static ScheduleSession buildScheduleSession( LocalDate date, LocalTime startTime, LocalTime endTime, Topics topic) {
        if ( date == null || startTime == null || endTime == null || topic == null) {
            return null;
        }

        return new ScheduleSession.Builder()
                .setDate(date)
                .setStartTime(startTime)
                .setEndTime(endTime)
                .setTopic(topic)
                .build();
    }
}

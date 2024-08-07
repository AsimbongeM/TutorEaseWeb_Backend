package za.ac.cput.factory;

import za.ac.cput.domain.ScheduleSession;
import za.ac.cput.util.Helper;

import java.time.LocalDate;
import java.time.LocalTime;

public class ScheduleSessionFactory {

    public static ScheduleSession buildScheduleSession( LocalDate date, LocalTime startTime, LocalTime endTime, String topic) {
        if ( date == null || startTime == null || endTime == null || Helper.isNullOrEmpty(topic)) {
            return null;
        }

        return new ScheduleSession.Builder()
//                .setId(id)
                .setDate(date)
                .setStartTime(startTime)
                .setEndTime(endTime)
                .setTopic(topic)
                .build();
    }
}

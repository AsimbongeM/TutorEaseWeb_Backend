package za.ac.cput.factory;

import za.ac.cput.domain.*;

public class BookSessionFactory {
    public static BookSession buildBooksession(ScheduleSession scheduleSession, Topics topic, Tutor tutor, Student student){
        if(scheduleSession==null || topic==null || tutor==null || student==null)
            return null;

        return new BookSession.Builder()
                .setscheduleSession(scheduleSession)
                .setTopic(topic).setTutor(tutor)
                .setStudent(student)
                .build();
    }
}

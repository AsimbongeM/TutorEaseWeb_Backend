package za.ac.cput.factory;

import za.ac.cput.domain.*;

public class BookSessionFactory {
    public static BookSession buildBooksession( Tutor tutor, ScheduleSession   scheduleSession,Student student){
        if( tutor==null || student==null)
            return null;

        return new BookSession.Builder()
                .setTutor(tutor)
                .setScheduleSession(scheduleSession)
                .setStudent(student)
                .build();
    }
}

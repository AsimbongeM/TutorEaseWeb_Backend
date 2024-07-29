package za.ac.cput.factory;

import za.ac.cput.domain.*;

public class BookSessionFactory {
    public static BookSession buildBooksession( Topics topic, Tutor tutor, Student student){
        if( topic==null || tutor==null || student==null)
            return null;

        return new BookSession.Builder()
                .setTopic(topic).setTutor(tutor)
                .setStudent(student)
                .build();
    }
}

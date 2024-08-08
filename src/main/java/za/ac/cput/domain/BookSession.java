package za.ac.cput.domain;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;
/**
 * BookSession.java
 * This is the BookSession class is for the student to choose a tutor
 * @author Sbonga Shweni
 */
@Entity
public class BookSession implements Serializable {
    //Sbonga Shweni
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookSessionID;
    //ScheduleSession id as a foreign key

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "scheduleSession_ID")
    private ScheduleSession scheduleSession;
    //Topic id as a foreign key

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "topic_ID")
    private Topics topic;
    //Tutor id as a foreign key

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "tutor_ID")
    private Tutor tutor;
    //Student id as a foreign key
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_ID")
    private Student student;

    protected BookSession() {}

    private BookSession(BookSession.Builder builder) {
        this.bookSessionID = builder.bookSessionID;
        this.scheduleSession = builder.scheduleSession;
        this.topic = builder.topic;
        this.tutor = builder.tutor;
        this.student = builder.student;
    }

    public Long getBookSessionID() {
        return bookSessionID;
    }

    public ScheduleSession getScheduleSession() {
        return scheduleSession;
    }

    public Topics getTopic() {
        return topic;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public Student getStudent() {
        return student;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookSession that = (BookSession) o;
        return Objects.equals(bookSessionID, that.bookSessionID) && Objects.equals(scheduleSession, that.scheduleSession) && Objects.equals(topic, that.topic) && Objects.equals(tutor, that.tutor) && Objects.equals(student, that.student);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookSessionID, scheduleSession, topic, tutor, student);
    }

    @Override
    public String toString() {
        return "BookSession{" +
                "bookSessionID=" + bookSessionID +
                ", scheduleSession=" + scheduleSession +
                ", topic=" + topic +
                ", tutor=" + tutor +
                ", student=" + student +
                '}';
    }

    public static class Builder {

        private Long bookSessionID;
        //ScheduleSession id as a foreign key
        private ScheduleSession scheduleSession;
        //Topic id as a foreign key
        private Topics topic;
        //Tutor id as a foreign key
        private Tutor tutor;
        //Student id as a foreign key
        private Student student;

        public Builder setBookSessionID(Long bookSessionID) {
            this.bookSessionID = bookSessionID;
            return this;
        }

        public Builder setscheduleSession(ScheduleSession scheduleSession) {
            this.scheduleSession = scheduleSession;
            return this;
        }

        public Builder setTopic(Topics topic) {
            this.topic = topic;
            return this;
        }

        public Builder setTutor(Tutor tutor) {
            this.tutor = tutor;
            return this;
        }

        public Builder setStudent(Student student) {
            this.student = student;
            return this;
        }
        public BookSession.Builder copy(BookSession bookSession) {
            this.bookSessionID = bookSession.bookSessionID;
            this.scheduleSession = bookSession.scheduleSession;
            this.topic = bookSession.topic;
            this.tutor = bookSession.tutor;
            this.student = bookSession.student;
            return this;
        }
        public BookSession build() {return new BookSession(this);}
    }
}

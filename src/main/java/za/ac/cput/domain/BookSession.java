package za.ac.cput.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * BookSession.java
 * This is the BookSession class for the student to choose a tutor
 * @Author Sbonga Shweni
 */
@Entity
public class BookSession implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookSessionID;

    // Tutor id as a foreign key
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "tutor_email",referencedColumnName = "email")
    private Tutor tutor;

    // Student id as a foreign key
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_email",referencedColumnName = "email")
    private Student student;

    //ScheduleSession id as a foreign key
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "scheduleSession_ID",referencedColumnName = "id")
    private ScheduleSession scheduleSession;
    protected BookSession() {}

    private BookSession(BookSession.Builder builder) {
        this.bookSessionID = builder.bookSessionID;
        this.tutor = builder.tutor;
        this.student = builder.student;
        this.scheduleSession = builder.scheduleSession;
    }

    public Long getBookSessionID() {
        return bookSessionID;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public Student getStudent() {
        return student;
    }

    public ScheduleSession getScheduleSession() {
        return scheduleSession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookSession that = (BookSession) o;
        return Objects.equals(bookSessionID, that.bookSessionID) &&
                Objects.equals(tutor, that.tutor) &&
                Objects.equals(scheduleSession, that.scheduleSession) &&
                Objects.equals(student, that.student);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookSessionID,scheduleSession, tutor, student);
    }

    @Override
    public String toString() {
        return "BookSession{" +
                "bookSessionID=" + bookSessionID +
                ", scheduleSession=" + scheduleSession +
                ", tutor=" + tutor +
                ", student=" + student +
                '}';
    }

    public static class Builder {

        private Long bookSessionID;
        private Tutor tutor;
        private Student student;
        private ScheduleSession scheduleSession;

        public Builder setBookSessionID(Long bookSessionID) {
            this.bookSessionID = bookSessionID;
            return this;
        }
        public Builder setScheduleSession (ScheduleSession scheduleSession) {
            this.scheduleSession = scheduleSession;
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
            this.tutor = bookSession.tutor;
            this.student = bookSession.student;
            return this;
        }

        public BookSession build() {
            return new BookSession(this);
        }
    }
}

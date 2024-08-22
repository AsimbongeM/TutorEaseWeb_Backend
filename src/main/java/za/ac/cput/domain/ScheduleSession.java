package za.ac.cput.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Entity
public class ScheduleSession {
    //Okuhle
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    @ManyToOne
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topics topic;
    @ManyToOne
    @JoinColumn(name = "tutor_email", referencedColumnName = "email")
    private Tutor tutor;
    protected ScheduleSession() {
    }

    public ScheduleSession(Builder builder) {

        this.id = builder.id;
        this.date = builder.date;
        this.startTime = builder.startTime;
        this.endTime = builder.endTime;
        this.topic = builder.topic;
        this.tutor = builder.tutor;

    }
    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public Topics getTopic() {
        return topic;
    }
    public Tutor getTutor() {
        return tutor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScheduleSession that = (ScheduleSession) o;
        return Objects.equals(id, that.id) && Objects.equals(date, that.date) && Objects.equals(startTime, that.startTime) && Objects.equals(endTime, that.endTime) && Objects.equals(topic, that.topic)&& Objects.equals(tutor, that.tutor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, startTime, endTime, topic, tutor);
    }

    @Override
    public String toString() {
        return "ScheduleSession{" +
                "id=" + id +
                ", date=" + date +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", topic='" + topic +
                ", tutor=" + tutor +
                '}';
    }
    public static class Builder {
        private Long id;
        private LocalDate date;
        private LocalTime startTime;
        private LocalTime endTime;
        private Topics topic;
        private Tutor tutor;


        public Builder(){

        }

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setDate(LocalDate date) {
            this.date = date;
            return this;
        }

        public Builder setStartTime(LocalTime startTime) {
            this.startTime = startTime;
            return this;
        }

        public Builder setEndTime(LocalTime endTime) {
            this.endTime = endTime;
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
        public Builder copy(ScheduleSession session) {

            this.id = session.id;
            this.date = session.date;
            this.startTime = session.startTime;
            this.endTime = session.endTime;
            this.topic = session.topic;
            this.tutor = session.tutor;
            return this;
        }
        public ScheduleSession build() {
            return new ScheduleSession(this);
        }
    }
}

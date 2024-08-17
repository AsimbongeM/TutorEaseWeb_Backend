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
    @JoinColumn(name = "topic_id")
    private Topics topic;

    protected ScheduleSession() {
    }

    public ScheduleSession(Builder builder) {

        this.id = builder.id;
        this.date = builder.date;
        this.startTime = builder.startTime;
        this.endTime = builder.endTime;
        this.topic = builder.topic;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScheduleSession that = (ScheduleSession) o;
        return Objects.equals(id, that.id) && Objects.equals(date, that.date) && Objects.equals(startTime, that.startTime) && Objects.equals(endTime, that.endTime) && Objects.equals(topic, that.topic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, startTime, endTime, topic);
    }

    @Override
    public String toString() {
        return "ScheduleSession{" +
                "id=" + id +
                ", date=" + date +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", topic='" + topic + '\'' +
                '}';
    }
    public static class Builder {
        private Long id;
        private LocalDate date;
        private LocalTime startTime;
        private LocalTime endTime;
        private Topics topic;

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
        public Builder copy(ScheduleSession session) {

            this.id = session.id;
            this.date = session.date;
            this.startTime = session.startTime;
            this.endTime = session.endTime;
            this.topic = session.topic;
            return this;
        }
        public ScheduleSession build() {
            return new ScheduleSession(this);
        }
    }
}

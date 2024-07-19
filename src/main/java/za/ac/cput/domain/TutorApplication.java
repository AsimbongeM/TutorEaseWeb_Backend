package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class TutorApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long tutorId;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public TutorApplication() {}

    private TutorApplication(Builder builder) {
        this.id = builder.id;
        this.tutorId = builder.tutorId;
        this.status = builder.status;
    }

    public Long getId() {
        return id;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TutorApplication that = (TutorApplication) o;
        return Objects.equals(id, that.id) && Objects.equals(tutorId, that.tutorId) && status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tutorId, status);
    }

    @Override
    public String toString() {
        return "TutorApplication{" +
                "id=" + id +
                ", tutorId=" + tutorId +
                ", status=" + status +
                '}';
    }

    public static class Builder {
        private Long id;
        private Long tutorId;
        private ApplicationStatus status;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setTutorId(Long tutorId) {
            this.tutorId = tutorId;
            return this;
        }

        public Builder setStatus(ApplicationStatus status) {
            this.status = status;
            return this;
        }

        public TutorApplication build() {
            return new TutorApplication(this);
        }
    }
}

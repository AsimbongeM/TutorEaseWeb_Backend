package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text; // Field for announcement text

    @ManyToOne
    @JoinColumn(name = "tutor_email", nullable = false)
    private Tutor tutor;

    // Default constructor
    public Announcement() {
    }

    private Announcement(Builder builder) {
        this.id = builder.id;
        this.text = builder.text;
        this.tutor = builder.tutor;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Announcement that = (Announcement) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(text, that.text) &&
                Objects.equals(tutor, that.tutor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, tutor);
    }

    @Override
    public String toString() {
        return "Announcement{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", tutor=" + tutor +
                '}';
    }

    public static class Builder {
        private Long id;
        private String text;
        private Tutor tutor;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setText(String text) {
            this.text = text;
            return this;
        }

        public Builder setTutor(Tutor tutor) {
            this.tutor = tutor;
            return this;
        }

        public Builder copy(Announcement announcement) {
            this.id = announcement.id;
            this.text = announcement.text;
            this.tutor = announcement.tutor;
            return this;
        }

        public Announcement build() {
            return new Announcement(this);
        }
    }
}

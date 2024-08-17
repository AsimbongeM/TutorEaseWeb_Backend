package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Topics.java
 * This is the Domain class
 * Author: Bukhobenkosi Mbinda 221143017
 * Date: 19/07/24
 */

@Entity
public class Topics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Topic_Level")
    @Enumerated(EnumType.STRING)
    private TopicLevel topicLevel;

    @Column(name = "Topic_Description")
    private String description;

    protected Topics() {
    }

    private Topics(Builder builder) {
        this.id = builder.id;
        this.topicLevel = builder.topicLevel;
        this.description = builder.description;
    }

    public Long getId() {
        return id;
    }

    public TopicLevel getLevel() {
        return topicLevel;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Topics topics = (Topics) o;
        return Objects.equals(id, topics.id) &&
                topicLevel == topics.topicLevel &&
                Objects.equals(description, topics.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, topicLevel, description);
    }

    @Override
    public String toString() {
        return "Topics{" +
                "id=" + id +
                ", level=" + topicLevel +
                ", description='" + description + '\'' +
                '}';
    }

    public static class Builder {
        private Long id;
        private TopicLevel topicLevel;
        private String description;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setLevel(TopicLevel topicLevel) {
            this.topicLevel = topicLevel;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder copy(Topics topics) {
            this.id = topics.id;
            this.topicLevel = topics.topicLevel;
            this.description = topics.description;
            return this;
        }

        public Topics build() {
            return new Topics(this);
        }
    }
}



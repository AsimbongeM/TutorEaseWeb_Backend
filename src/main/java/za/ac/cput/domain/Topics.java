package za.ac.cput.domain;

import jakarta.persistence.*;

import java.util.List;
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

    @Column(name = "Topic_name")
    private String topicName;

    @Column(name = "Topic_Description")
    private String topicDescription;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ScheduleSession> bookings;

    protected Topics() {
    }

    private Topics(Builder builder) {
        this.id = builder.id;
        this.topicLevel = builder.topicLevel;
        this.topicName = builder.topicName;
        this.topicDescription = builder.topicDescription;
    }

    public Long getId() {
        return id;
    }

    public String getTopicName() {
        return topicName;
    }

    public TopicLevel getTopicLevel() {
        return topicLevel;
    }

    public String getTopicDescription() {
        return topicDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Topics topics = (Topics) o;
        return Objects.equals(id, topics.id) &&
                topicLevel == topics.topicLevel &&
                Objects.equals(topicDescription, topics.topicDescription)&&
                 Objects.equals(topicName, topics.topicName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id,topicName, topicLevel, topicDescription);
    }

    @Override
    public String toString() {
        return "Topics{" +
                "id=" + id +
                ", name=" + topicName +
                ", level=" + topicLevel +
                ", description='" + topicDescription + '\'' +
                '}';
    }

    public static class Builder {
        private Long id;
        private String topicName;
        private TopicLevel topicLevel;
        private String topicDescription;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }
        public Builder setTopicName(String topicName) {
            this.topicName = topicName;
            return this;
        }

        public Builder setTopicLevel(TopicLevel topicLevel) {
            this.topicLevel = topicLevel;
            return this;
        }

        public Builder setTopicDescription(String topicDescription) {
            this.topicDescription = topicDescription;
            return this;
        }

        public Builder copy(Topics topics) {
            this.id = topics.id;
            this.topicLevel = topics.topicLevel;
            this.topicName = topics.topicName;
            this.topicDescription = topics.topicDescription;
            return this;
        }

        public Topics build() {
            return new Topics(this);
        }
    }
}



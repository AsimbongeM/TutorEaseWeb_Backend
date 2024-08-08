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

    @Column(name = "Beginner_Topics")
    private String beginnerTopics;

    @Column(name = "Intermediate_Topics")
    private String intermediateTopics;

    @Column(name = "Advanced_Topics")
    private String advancedTopics;

    protected Topics() {
    }

    private Topics(Builder builder) {
        this.id = builder.id;
        this.beginnerTopics = builder.beginnerTopics;
        this.intermediateTopics = builder.intermediateTopics;
        this.advancedTopics = builder.advancedTopics;
    }

    public Long getId() {
        return id;
    }

    public String getBeginnerTopics() {
        return beginnerTopics;
    }

    public String getIntermediateTopics() {
        return intermediateTopics;
    }

    public String getAdvancedTopics() {
        return advancedTopics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Topics topics = (Topics) o;
        return Objects.equals(id, topics.id) &&
                Objects.equals(beginnerTopics, topics.beginnerTopics) &&
                Objects.equals(intermediateTopics, topics.intermediateTopics) &&
                Objects.equals(advancedTopics, topics.advancedTopics);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, beginnerTopics, intermediateTopics, advancedTopics);
    }

    @Override
    public String toString() {
        return "Topics{" +
                "id=" + id +
                ", beginnerTopics='" + beginnerTopics + '\'' +
                ", intermediateTopics='" + intermediateTopics + '\'' +
                ", advancedTopics='" + advancedTopics + '\'' +
                '}';
    }

    public static class Builder {
        private Long id;
        private String beginnerTopics;
        private String intermediateTopics;
        private String advancedTopics;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setBeginnerTopics(String beginnerTopics) {
            this.beginnerTopics = beginnerTopics;
            return this;
        }

        public Builder setIntermediateTopics(String intermediateTopics) {
            this.intermediateTopics = intermediateTopics;
            return this;
        }

        public Builder setAdvancedTopics(String advancedTopics) {
            this.advancedTopics = advancedTopics;
            return this;
        }

        public Builder copy(Topics topics) {
            this.id = topics.id;
            this.beginnerTopics = topics.beginnerTopics;
            this.intermediateTopics = topics.intermediateTopics;
            this.advancedTopics = topics.advancedTopics;
            return this;
        }

        public Topics build() {
            return new Topics(this);
        }
    }
}


package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.TopicLevel;
import za.ac.cput.domain.Topics;

public class TopicsFactoryTest {
    @Test
    void buildTopicsSuccess() {
        Topics beginnerTopic = TopicsFactory.buildTopics(TopicLevel.BEGINNER, "Variables");
        Topics intermediateTopic = TopicsFactory.buildTopics(TopicLevel.INTERMEDIATE, "Interfaces");
        Topics advancedTopic = TopicsFactory.buildTopics(TopicLevel.ADVANCED, "Domain Driven Design");

        System.out.println(beginnerTopic);
        System.out.println(intermediateTopic);
        System.out.println(advancedTopic);
    }
}

package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Topics;

public class TopicsFactoryTest {
    @Test
    void buildTopicsSuccess() {
        Topics topics = TopicsFactory.buildTopics("Variables","interfaces","Domain Driven Design");
        System.out.println(topics);
    }
}

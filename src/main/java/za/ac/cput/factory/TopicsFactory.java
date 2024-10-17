package za.ac.cput.factory;

import za.ac.cput.domain.TopicLevel;
import za.ac.cput.domain.Topics;
import za.ac.cput.util.Helper;

public class TopicsFactory {
    public static Topics buildTopics(String topicName, TopicLevel topicLevel, String topicDescription) {
        if (topicLevel == null || Helper.isNullOrEmpty(topicDescription)) {
            return null;
        }
        return new Topics.Builder()
                .setTopicName(topicName)
                .setTopicLevel(topicLevel)
                .setTopicDescription(topicDescription)
                .build();
    }
}

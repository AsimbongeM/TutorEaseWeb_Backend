package za.ac.cput.factory;

import za.ac.cput.domain.TopicLevel;
import za.ac.cput.domain.Topics;
import za.ac.cput.util.Helper;

public class TopicsFactory {
    public static Topics buildTopics(TopicLevel level, String description) {
        if (level == null || Helper.isNullOrEmpty(description)) {
            return null;
        }
        return new Topics.Builder()
                .setLevel(level)
                .setDescription(description)
                .build();
    }
}

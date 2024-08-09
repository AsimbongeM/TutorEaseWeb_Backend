package za.ac.cput.factory;

import za.ac.cput.domain.Topics;
import za.ac.cput.util.Helper;

public class TopicsFactory {
    public static Topics buildTopics(String beginnerTopics, String intermediateTopics, String advancedTopics){
        if (Helper.isNullOrEmpty(beginnerTopics) || Helper.isNullOrEmpty(intermediateTopics) || Helper.isNullOrEmpty(advancedTopics))
            return null;
       return new Topics.Builder().setBeginnerTopics(beginnerTopics).setIntermediateTopics(intermediateTopics).setAdvancedTopics(advancedTopics).build();
    }
}

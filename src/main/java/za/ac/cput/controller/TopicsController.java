package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.TopicLevel;
import za.ac.cput.domain.Topics;
import za.ac.cput.service.TopicsService;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/topics")
public class TopicsController {
    @Autowired
    private TopicsService topicsService;


    @PostMapping("/create")
    public Topics create(@RequestBody Topics topic) {
        return topicsService.create(topic);
    }
    @GetMapping("/getAll")
    public List<Topics> getAllTopics() {
        return topicsService.getAll();
    }

    @GetMapping("/topic_level")
    public List<TopicLevel> getTopicLevels() {
        return Arrays.asList(TopicLevel.values());
    }

}

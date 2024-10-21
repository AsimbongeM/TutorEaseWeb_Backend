package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/update")
    public ResponseEntity<Topics> update(@RequestBody Topics topic) {
        Topics updatedTopic = topicsService.update(topic);
        if (updatedTopic != null) {
            return ResponseEntity.ok(updatedTopic);
        }
        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        topicsService.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/topic_level")
    public List<TopicLevel> getTopicLevels() {
        return Arrays.asList(TopicLevel.values());
    }

}

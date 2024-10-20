package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.TopicLevel;
import za.ac.cput.domain.Topics;
import za.ac.cput.factory.TopicsFactory;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class TopicsServiceTest {

    @Autowired
    private TopicsService topicsService;
    static Topics topics1;
    static Topics topics2,topics3;
    private static Long generatedTopicId;
    private static Long generatedTopicId2;

    @BeforeEach
    void setUp() {
        topics1 = TopicsFactory.buildTopics("Advanced",TopicLevel.BEGINNER, "Variables");
        topics2 = TopicsFactory.buildTopics("Advnced",TopicLevel.INTERMEDIATE, "Introduction to Java GUI Framework");
        topics3 = TopicsFactory.buildTopics("Advanced",TopicLevel.ADVANCED, "Builder Pattern");
    }

    @Order(1)
    @Test
    void create() {
        Topics savedTopics1 = topicsService.create(topics1);
        assertNotNull(savedTopics1);
        generatedTopicId = savedTopics1.getId();

        Topics savedTopics2 = topicsService.create(topics2);
        assertNotNull(savedTopics2);
        generatedTopicId2 = savedTopics2.getId();
        Topics savedTopics3 = topicsService.create(topics3);
        assertNotNull(savedTopics3);
        generatedTopicId2 = savedTopics3.getId();
    }

    @Order(2)
    @Test
    void read() {
        Topics read1 = topicsService.read(generatedTopicId);
        assertNotNull(read1);
        System.out.println("Read: " + read1);

        Topics read2 = topicsService.read(generatedTopicId2);
        assertNotNull(read2);
        System.out.println("Read: " + read2);
    }

    @Order(3)
    @Test
    @Disabled
    void update() {
        Topics topicsToUpdate = topicsService.read(generatedTopicId);
        assertNotNull(topicsToUpdate);

        Topics newTopics = new Topics.Builder()
                .copy(topicsToUpdate)
                .setTopicDescription("Updated Description")
                .build();

        Topics updatedTopics = topicsService.update(newTopics);
        assertNotNull(updatedTopics);
        System.out.println(updatedTopics);
    }

    @Order(4)
    @Test
    @Disabled
    void delete() {
        topicsService.delete(generatedTopicId);
        System.out.println("Successfully deleted Topics");
    }

    @Order(5)
    @Test
    void getAll() {
        System.out.println(topicsService.getAll());
    }
}

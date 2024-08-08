package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Topics;
import za.ac.cput.factory.TopicsFactory;

import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class TopicsServiceTest {

    @Autowired
    private TopicsService topicsService;
    static Topics topics1;
    static Topics topics2;
    private static Long generatedTopicId;
    private static Long generatedTopicId2;
    @BeforeEach
    void setUp() {
        
        topics1 =  TopicsFactory.buildTopics("Variables","interfaces","Domain Driven Design");
        topics2 =  TopicsFactory.buildTopics("Stacks","client-server","Domain Design");
    }
    @Order(1)
    @Test
    void create() {
        System.out.println("Topics 1:" + topics1.getId());
        Topics savedTopics1 = topicsService.create(topics1);
        System.out.println(savedTopics1);
        assertNotNull(savedTopics1);
        generatedTopicId=savedTopics1.getId();

        System.out.println("Topics 2:" + topics2.getId());
        Topics savedTopics2 = topicsService.create(topics2);
        System.out.println(savedTopics2);
        assertNotNull(savedTopics2);
        generatedTopicId2=savedTopics1.getId();
    }
    @Order(2)
    @Test
    void read() {
        Topics read1 = topicsService.read(generatedTopicId);
        assertNotNull(read1);
        System.out.println("read: " + read1);

        Topics read2 = topicsService.read(generatedTopicId2);
        assertNotNull(read2);
        System.out.println("read: " + read2);
    }
    @Order(3)
    @Test
    void update() {
        Topics topicsToUpdate = topicsService.read(generatedTopicId);
        assertNotNull(topicsToUpdate);
        
        Topics newTopics = new Topics.Builder()
                .copy(topicsToUpdate)
                .setBeginnerTopics("Strings")
                .build();

        Topics updatedTopics = topicsService.update(newTopics);
        assertNotNull(updatedTopics);
        System.out.println(updatedTopics);
    }
    @Order(5)
    @Test
    void delete() {
        topicsService.delete(topics1.getId());
        System.out.println("Successfully deleted Topics");
    }
    @Order(5)
    @Test
    void getAll() { System.out.println(topicsService.getAll());
    }
}
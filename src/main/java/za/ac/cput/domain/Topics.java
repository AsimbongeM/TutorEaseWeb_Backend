package za.ac.cput.domain;

import jakarta.persistence.*;

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

}

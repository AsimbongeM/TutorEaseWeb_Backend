package za.ac.cput.domain;

import jakarta.persistence.*;

@Entity
public class Resources {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    @Column(length = 10000000)
    private byte[] document;
    @Lob
    @Column(length = 10000000)
    private byte[] recordings;

    //Tutor id as a foreign key
}

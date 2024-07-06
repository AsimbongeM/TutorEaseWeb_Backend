package za.ac.cput.domain;

import jakarta.persistence.*;

@Entity
public class Student {
    //Thandolwethu
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private int age;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String cellNumber;
    private String password;

}

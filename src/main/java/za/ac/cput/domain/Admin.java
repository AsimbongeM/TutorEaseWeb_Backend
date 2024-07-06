package za.ac.cput.domain;

import jakarta.persistence.*;

@Entity
public class Admin {
    //Okuhle
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;

}

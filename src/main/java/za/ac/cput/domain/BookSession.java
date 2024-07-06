package za.ac.cput.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BookSession {
    //Sbonga
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //ScheduleSession id as a foreign key
    //Topic id as a foreign key
    //Tutor id as a foreign key
    //Student id as a foreign key
}

package za.ac.cput.factory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import za.ac.cput.domain.SkillLevel;
import za.ac.cput.domain.Student;

import static org.junit.jupiter.api.Assertions.*;

/**
 * StudentFactoryTest.java
 * This is the Factory class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 08 July 2024
 */

class StudentFactoryTest {
    private Student student1;
    private Student student2;
    private Student student3;

    @BeforeEach
    void setUp() {
        byte[] profilePicture = new byte[0];
        student1 = StudentFactory.buildStudent( "Thando", "Khoza", 16, "thando@gmail.com",
                "0727897635", profilePicture,"Thando@05", SkillLevel.BEGINNER);

        student2 = StudentFactory.buildStudent( "Olwethu", "Khoza", 17, "olwethu@yahoo.com",
                "0876543211", profilePicture,"olwethu56",SkillLevel.INTERMEDIATE);

        student3 = student1;
    }

    @Test
    void buildStudent(){
        assertNotNull(student1);
        System.out.println(student1);

        assertNotNull(student2);
        System.out.println(student2);
    }

    @Test
    void buildStudentIdentity(){
        assertSame(student1, student3);
    }
}
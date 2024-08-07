package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.SkillLevel;
import za.ac.cput.domain.Student;
import za.ac.cput.factory.StudentFactory;

import static org.junit.jupiter.api.Assertions.*;

/**
 * StudentServiceTest.java
 * This is the ServiceTest class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 14 July 2024
 */

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class StudentServiceTest {
    @Autowired
    private StudentService studentService;
    static Student student1;
    static Student student2;
    private static Long generatedInsuranceId;
    private static Long generatedInsuranceId2;

    @Order(1)
    @BeforeEach
    void setUp() {
        byte[] profilePicture = new byte[1];
        student1 = StudentFactory.buildStudent( "Thando", "Khoza", 18,
                "thando@gmail.com", "0767475524", profilePicture,"thando7865", SkillLevel.BEGINNER);
        System.out.println(student1);

        student2 = StudentFactory.buildStudent( "Azande", "Sibisi", 19,
                "Azande@Yahoo.com", "0876411245", profilePicture,"aza@31452",SkillLevel.INTERMEDIATE);
        System.out.println(student2);
    }

    @Order(2)
    @Test
    void create() {
        System.out.println("Student 1:" + student1.getId());
        Student savedstudent1 = studentService.create(student1);
        System.out.println(savedstudent1);
        assertNotNull(savedstudent1);
        generatedInsuranceId=savedstudent1.getId();

        System.out.println("Student 2:" + student2.getId());
        Student savedstudent2 = studentService.create(student2);
        System.out.println(savedstudent2);
        assertNotNull(savedstudent2);
        generatedInsuranceId2=savedstudent1.getId();
    }

    @Order(3)
    @Test
    void read() {
        Student read1 = studentService.read(generatedInsuranceId);
        assertNotNull(read1);
        System.out.println("read: " + read1);

        Student read2 = studentService.read(generatedInsuranceId2);
        assertNotNull(read2);
        System.out.println("read: " + read2);
    }

    @Order(4)
    @Test
    void update() {
        Student studentToUpdate = studentService.read(generatedInsuranceId2);
        assertNotNull(studentToUpdate);

        // Build new student object with updated first name and existing ID
        Student newStudent = new Student.Builder()
                .copy(studentToUpdate)
                .setFirstName("Lwazi")
                .build();

        Student updatedStudent = studentService.update(newStudent);
        assertNotNull(updatedStudent);
        System.out.println(updatedStudent);
    }


    @Order(5)
    @Test
    @Disabled
    void delete() {
        studentService.delete(student1.getId());
        System.out.println("Successfully deleted student");
    }

    @Order(6)
    @Test
    void getAll() {
        System.out.println(studentService.getAll());
    }
}
package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
   private static Student student1;
   private static Student student2;
    private static String student1Email;
    private static String student2Email;


    @Order(1)
    @BeforeEach
    void setUp() {

        student1 = StudentFactory.buildStudent( "Thando", "Khoza", 18,
                "thando@gmail.com", "0767475524", "thando7865", "BEGINNER");
        System.out.println(student1);

        student2 = StudentFactory.buildStudent( "Azande", "Sibisi", 19,
                "Azande@Yahoo.com", "0876411245","aza@31452","INTERMEDIATE");
        System.out.println(student2);

        student1Email = student1.getEmail();
        student2Email = student2.getEmail();
    }

    @Order(2)
    @Test
    void create() {
        System.out.println("Creating student 1: " + student1Email);
        Student savedStudent1 = studentService.create(student1);
        System.out.println("Saved student 1: " + savedStudent1);
        assertNotNull(savedStudent1);

        System.out.println("Creating student 2: " + student2Email);
        Student savedStudent2 = studentService.create(student2);
        System.out.println("Saved student 2: " + savedStudent2);
        assertNotNull(savedStudent2);
    }

    @Order(3)
    @Test
    void read() {
        Student read1 = studentService.read(student1Email);
        assertNotNull(read1);
        System.out.println("Read student 1: " + read1);

        Student read2 = studentService.read(student2Email);
        assertNotNull(read2);
        System.out.println("Read student 2: " + read2);
    }

    @Order(4)
    @Test
    void update() {
        // Read the student to update
        Student studentToUpdate = studentService.read(student2Email);
        assertNotNull(studentToUpdate);

        // Build new student object with updated details
        Student updatedStudent = new Student.Builder()
                .copy(studentToUpdate)
                .setFirstName("Lwazi")
                .build();

        // Call the update method
        Student result = studentService.update(student2Email, updatedStudent); // Expecting a Student return type
        assertNotNull(result);
        System.out.println("Updated student: " + result);

        // Optionally, verify the update by reading the student again
        Student updatedStudentData = studentService.read(student2Email);
        assertNotNull(updatedStudentData);
        assertEquals("Lwazi", updatedStudentData.getFirstName());
        System.out.println("Updated student data: " + updatedStudentData);
    }

    @Order(5)
    @Test
    @Disabled
    void delete() {
        studentService.delete(student1Email);
        System.out.println("Successfully deleted student with email: " + student1Email);
    }

    @Order(6)
    @Test
    void getAll() {
        System.out.println("All students: " + studentService.getAll());
    }
}
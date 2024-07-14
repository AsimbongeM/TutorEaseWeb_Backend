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
    static Student student1;
    static Student student2;

    @Order(1)
    @BeforeEach
    void setUp() {
        student1 = StudentFactory.buildStudent(34L, "Thando", "Khoza", 18,
                "thando@gmail.com", "0767475524", "thando7865");
        System.out.println(student1);

        student2 = StudentFactory.buildStudent(54L, "Azande", "Sibisi", 19,
                "Azande@Yahoo.com", "0876411245", "aza@31452");
        System.out.println(student2);
    }

    @Order(2)
    @Test
    void create() {
        System.out.println("Student 1:" + student1.getId());
        Student savedstudent1 = studentService.create(student1);
        System.out.println(savedstudent1);
        assertNotNull(savedstudent1);

        System.out.println("Student 2:" + student2.getId());
        Student savedstudent2 = studentService.create(student2);
        System.out.println(savedstudent2);
        assertNotNull(savedstudent2);
    }

    @Order(3)
    @Test
    void read() {
        Student read1 = studentService.read(student1.getId());
        assertNotNull(read1);
        System.out.println("read: " + read1);

        Student read2 = studentService.read(student2.getId());
        assertNotNull(read2);
        System.out.println("read: " + read2);
    }

    @Order(4)
    @Test
    void update() {
        Student newStudent = new Student.Builder().copy(student2).setFirstName("Lwazi").build();
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
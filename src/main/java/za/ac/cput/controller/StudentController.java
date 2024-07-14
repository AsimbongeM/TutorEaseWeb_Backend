package za.ac.cput.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Student;
import za.ac.cput.service.StudentService;

import java.util.List;

/**
 * StudentController.java
 * This is the Controller class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 08 July 2024
 */


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/student")
public class StudentController  {
    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    public Student create(@RequestBody Student student) {
        return studentService.create(student);
    }

    @GetMapping("/read/{id}")
    public Student read(@PathVariable Long id) {
        return studentService.read(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
        Student existingStudent = studentService.read(id);
        if (existingStudent == null) {
            return ResponseEntity.notFound().build();
        }
        Student updatedStudent = new Student.Builder().copy(existingStudent)
                .setFirstName(student.getFirstName())
                .setLastName(student.getLastName())
                .setAge(student.getAge())
                .setEmail(student.getEmail())
                .setCellNumber(student.getCellNumber())
                .setPassword(student.getPassword())
                .build();
        updatedStudent = studentService.update(updatedStudent);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        studentService.delete(id);
    }

    @GetMapping("/getAll")
    public List<Student> getAll() {
        return studentService.getAll();
    }
}

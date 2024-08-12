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

    @GetMapping("/read/{email}")
    public Student read(@PathVariable String email) {
        return studentService.read(email);
    }

    @PutMapping("/update/{email}")
    public Student update(@PathVariable String email, @RequestBody Student student) {
        return studentService.update(email, student);

    }

    @DeleteMapping("/delete/{email}")
    public void delete(@PathVariable String email) {
        studentService.delete(email);
    }

    @GetMapping("/getAll")
    public List<Student> getAll() {
        return studentService.getAll();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Student student) {
        Student authenticatedStudent = studentService.authenticate(student.getEmail(), student.getPassword());
        if (authenticatedStudent != null) {
            return ResponseEntity.ok(authenticatedStudent);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}

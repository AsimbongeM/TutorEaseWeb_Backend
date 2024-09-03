package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Student;
import za.ac.cput.repository.StudentRepository;

import java.util.List;

/**
 * StudentService.java
 * This is the Service class
 * @author Thandolwethu Zamasiba Khoza (221797289)
 * Date: 08 July 2024
 */

@Service
public class StudentService implements IStudentService{
    private final StudentRepository studentRepository;

    @Autowired
    StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) {
       return studentRepository.save(student);
    }

    @Override
    public Student read(String email) {
        return this.studentRepository.findById(email).orElse(null);
    }

    @Override
    public Student update(String email, Student student) {
        Student existingStudent = read(email);

        if (existingStudent != null) {
            Student updatedStudent = new Student.Builder()
                    .copy(existingStudent)
                    .setFirstName(student.getFirstName())
                    .setLastName(student.getLastName())
                    .setPassword(student.getPassword())
                    .setAge(student.getAge())
                    .setCellNumber(student.getCellNumber())
                    .setSkillLevel(student.getSkillLevel())
                    .build();
            return studentRepository.save(updatedStudent);
        }
        return null;
    }

    @Override
    public void delete(String email) {
        studentRepository.deleteById(email);
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }
    public Student authenticate(String email, String password) {
        return studentRepository.findByEmailAndPassword(email, password);
    }
}

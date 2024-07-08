package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Student;
import za.ac.cput.repository.StudentRepository;
import java.util.List;

@Service
public class StudentService implements IStudentService{
    private StudentRepository studentRepository;

    @Autowired
    StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) {
       return studentRepository.save(student);
    }

    @Override
    public Student read(Long studentId) {
        return this.studentRepository.findById(studentId).orElse(null);
    }

    @Override
    public Student update(Student student) {
        if (studentRepository.existsById(student.getId())) {
            return studentRepository.save(student);
        }
        return null;
    }

    @Override
    public void delete(Long studentId) {
        studentRepository.deleteById(studentId);
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }
}

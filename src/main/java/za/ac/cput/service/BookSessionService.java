package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.BookSession;
import za.ac.cput.domain.Student;
import za.ac.cput.domain.Tutor;
import za.ac.cput.repository.BookSessionRepository;
import za.ac.cput.repository.StudentRepository;
import za.ac.cput.repository.TutorRepository;

import java.util.List;

@Service
public class BookSessionService implements IBookSessionService {

    private final TutorRepository tutorRepository;

    private final StudentRepository studentRepository;
    private final BookSessionRepository bookSessionRepository;

    @Autowired
    BookSessionService(BookSessionRepository bookSessionRepository,
                       StudentRepository studentRepository, TutorRepository tutorRepository) {

        this.tutorRepository = tutorRepository;
        this.studentRepository = studentRepository;
        this.bookSessionRepository = bookSessionRepository;
    }

    @Override
    public BookSession create(BookSession bookSession) {
        // Fetch the related entities
        Tutor tutor = tutorRepository.findById(bookSession.getTutor().getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Tutor not found with email: " + bookSession.getTutor().getEmail()));
        Student student = studentRepository.findById(bookSession.getStudent().getEmail()).orElseThrow(() -> new IllegalArgumentException("Student not found with email: " + bookSession.getStudent().getEmail()));

        BookSession createBookSession = new BookSession.Builder()
                .setTutor(tutor)
                .setStudent(student)
                .build();
        return bookSessionRepository.save(createBookSession);
    }

    @Override
    public BookSession read(Long bookSessionId) {
        return this.bookSessionRepository.findById(bookSessionId).orElse(null);
    }

    @Override
    public BookSession update(BookSession bookSession) {
        if (bookSessionRepository.existsById(bookSession.getBookSessionID())) {
            return bookSessionRepository.save(bookSession);
        }
        return null;
    }

    @Override
    public void delete(Long bookSessionId) {
        bookSessionRepository.deleteById(bookSessionId);
    }

    @Override
    public List<BookSession> getAll() {
        return bookSessionRepository.findAll();
    }
}

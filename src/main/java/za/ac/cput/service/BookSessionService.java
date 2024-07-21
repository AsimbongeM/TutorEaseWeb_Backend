package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.BookSession;
import za.ac.cput.repository.BookSessionRepository;

import java.util.List;

@Service
public class BookSessionService implements IBookSessionService {

    private BookSessionRepository bookSessionRepository;
    @Autowired
    BookSessionService(BookSessionRepository bookSessionRepository) {
        this.bookSessionRepository = bookSessionRepository;
    }

    @Override
    public BookSession create(BookSession bookSession) {
        return bookSessionRepository.save(bookSession);
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
        return List.of();
    }
}

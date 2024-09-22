package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.BookSession;
import za.ac.cput.service.BookSessionService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/booksession")
public class BookSessionController {

    @Autowired
    private BookSessionService bookSessionService;

    @PostMapping("/create")
    public BookSession create(@RequestBody BookSession bookSession) {
        return bookSessionService.create(bookSession);
    }

    @GetMapping("/read/{id}")
    public BookSession read(@PathVariable Long id) {
        return bookSessionService.read(id);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BookSession> update(@PathVariable Long id, @RequestBody BookSession bookSession) {
        BookSession existingBooksession = bookSessionService.read(id);
        if (existingBooksession == null) {
            return ResponseEntity.notFound().build();
        }
        BookSession updatedBookSession = new BookSession.Builder().copy(existingBooksession)
                .setStudent(bookSession.getStudent())
                .setTutor(bookSession.getTutor())
                .build();
        updatedBookSession = bookSessionService.update(updatedBookSession);
        return ResponseEntity.ok(updatedBookSession);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        bookSessionService.delete(id);
    }

    @GetMapping("/getAll")
    public List<BookSession> getAll() {
        return bookSessionService.getAll();
    }
}

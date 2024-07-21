package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.BookSession;

@Repository
public interface BookSessionRepository extends JpaRepository<BookSession,Long> {
}

package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Topics;

@Repository
public interface TopicsRepository extends JpaRepository<Topics,Long> {
}

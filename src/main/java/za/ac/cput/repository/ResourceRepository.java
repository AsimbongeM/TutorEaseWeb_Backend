package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Resource;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource,Long> {
    List<Resource> findByTutorEmail(String tutorEmail);
}
